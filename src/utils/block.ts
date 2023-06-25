import Handlebars from "handlebars";
import { nanoid } from "nanoid";
import { BlockMeta } from "../types/common";
import { EventBus } from "./eventBus";

export class Block {
  static EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_CDU: "flow:component-did-update",
    FLOW_RENDER: "flow:render",
  };

  eventBus: () => EventBus;
  _element: HTMLElement | null = null;
  _meta: BlockMeta | null = null;
  settings: object;
  children: any;
  props: object;
  _id: string;

  constructor(tagName = "div", propsAndChildren = {}) {
    const { children, props } = this._getChildren(propsAndChildren);

    this.children = children;

    const eventBus = new EventBus();
    this._meta = {
      tagName,
      props,
    };

    this.settings = props.settings || {};
    this._id = "";

    if (this.settings.withId) this._id = nanoid();

    this.props = this._makePropsProxy({ ...props, __id: this._id }, this);

    this.eventBus = () => eventBus;

    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  _getChildren(propsAndChildren) {
    const children = {};
    const props = {};

    Object.entries(propsAndChildren).forEach(([key, value]) => {
      if (value instanceof Block) {
        children[key] = value;
      } else if (
        Array.isArray(value) &&
        value.every((el) => el instanceof Block)
      ) {
        children[key] = value;
      } else {
        props[key] = value;
      }
    });

    return { children, props };
  }

  _registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this._init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  _createResources() {
    const tagName = this._meta && this._meta.tagName;
    if (tagName) this._element = this._createDocumentElement(tagName);
  }

  compile(template, context) {
    if (context.settings?.withId) return Handlebars.compile(template)(context);
    const contextAndStubs = { ...context };

    Object.entries(this.children).forEach(([key, child]) => {
      if (Array.isArray(child)) {
        contextAndStubs[key] = child.map(
          (el) => `<div data-id="${el._id}"></div>`
        );
      } else {
        contextAndStubs[key] = `<div data-id="${child._id}"></div>`;
      }
    });

    const fragment = this._createDocumentElement("template");

    const html = Handlebars.compile(template)(contextAndStubs);

    fragment.innerHTML = html;

    Object.values(this.children).forEach((child) => {
      if (Array.isArray(child)) {
        child.forEach((el) => {
          const stub = fragment.content.querySelector(`[data-id="${el._id}"]`);

          if (!stub) {
            return;
          }

          stub.replaceWith(el.getContent());
        });
      } else {
        const stub = fragment.content.querySelector(`[data-id="${child._id}"]`);

        if (!stub) {
          return;
        }

        // child.getContent()?.append(...Array.from(stub.childNodes));

        stub.replaceWith(child.getContent());
      }
    });

    return fragment.content;
  }

  _init() {
    this._createResources();

    this.init();

    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  init() {}

  _componentDidMount() {
    this.componentDidMount();

    Object.values(this.children).forEach((child) => {
      if (Array.isArray(child)) {
        child.forEach((el) => el.dispatchComponentDidMount());
      } else {
        child.dispatchComponentDidMount();
      }
    });
  }

  // Может переопределять пользователь, необязательно трогать
  componentDidMount(/*oldProps?: object*/) {}

  dispatchComponentDidMount() {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  _componentDidUpdate(/*oldProps: object, newProps: object*/) {
    // const response = this.componentDidUpdate(oldProps, newProps);
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  // Может переопределять пользователь, необязательно трогать
  componentDidUpdate(/*oldProps: object, newProps: object*/) {
    return true;
  }

  setProps = (nextProps: object) => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  };

  get element() {
    return this._element;
  }

  _render() {
    const block = this.render();

    this._removeEvents();

    this._element.innerHTML = "";

    if (this._element) {
      this._element.append(block);

      this._addEvents();
    }
  }

  // Может переопределять пользователь, необязательно трогать
  render() {
    return;
  }

  getContent() {
    return this.element;
  }

  _addEvents() {
    const { events = {}, settings = {} } = this.props;

    if (!settings.selectorForEvent) {
      Object.keys(events).forEach((eventName) => {
        this._element.addEventListener(eventName, events[eventName]);
      });
    } else {
      const selectedElement = this._element?.querySelector(
        settings.selectorForEvent
      );

      Object.keys(events).forEach((eventName) => {
        selectedElement.addEventListener(eventName, events[eventName]);
      });
    }
  }

  _removeEvents() {
    const { events = {} } = this.props;

    Object.keys(events).forEach((eventName) => {
      this._element.removeEventListener(eventName, events[eventName]);
    });
  }

  _makePropsProxy(props: object, current: this) {
    const proxyProps = new Proxy(props, {
      get(target: { [key: string]: unknown }, prop) {
        if (typeof prop === "string" && prop.indexOf("_") === 0) {
          throw new Error("No access");
        }

        if (typeof prop === "string") {
          const value = target[prop];
          return typeof value === "function" ? value.bind(target) : value;
        }
      },
      deleteProperty() {
        throw new Error("No access");
      },
      set(target: { [key: string]: unknown }, prop, value) {
        if (typeof prop === "string" && prop.indexOf("_") === 0) {
          throw new Error("No access");
        }
        const oldProps = { ...target };

        if (typeof value === "function") value.bind(target);
        if (typeof prop === "string") target[prop] = value;

        current.eventBus().emit(Block.EVENTS.FLOW_CDU, oldProps, target);

        return true;
      },
    });

    return proxyProps;
  }

  _createDocumentElement(tagName: string) {
    // Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
    const element = document.createElement(tagName);

    if (this._id) element.setAttribute("data-id", this._id);

    return element;
  }

  show() {
    const element = this.getContent();
    if (element) element.style.display = "block";
  }

  hide() {
    const element = this.getContent();
    if (element) element.style.display = "none";
  }
}
