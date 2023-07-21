import Handlebars from 'handlebars';
import { nanoid } from 'nanoid';
import { EventBus } from './eventBus';
import {
  BlockMeta,
  CommonProps,
  Settings,
  UnknownObject,
  hasSettingsWithId,
} from '../types/common';
import { State } from './store';

type ChildrenType = Record<string, Block | Block[]>;

export class Block<P = UnknownObject> {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  };

  private eventBus: () => EventBus;
  private _element: HTMLElement | null = null;
  private _meta: BlockMeta;
  private settings: Settings;
  protected children: ChildrenType;
  protected props: P;
  private _id: string;

  constructor(propsAndChildren: P, tagName = 'div') {
    const { children, props } = this._getChildren(propsAndChildren);

    this.children = children;

    const eventBus = new EventBus();
    this._meta = {
      tagName,
      props,
    };

    this.settings = props.settings || {};
    this._id = '';

    if (this.settings.withId) this._id = nanoid();

    this.props = this._makePropsProxy({ ...props, __id: this._id } as P, this);

    this.eventBus = () => eventBus;

    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  _getChildren(propsAndChildren: Partial<P>) {
    const children: ChildrenType = {};
    const props: UnknownObject = {};

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

  compile(template: string, context: UnknownObject) {
    if (context.settings && hasSettingsWithId(context.settings)) {
      return Handlebars.compile(template)(context);
    }

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

    const fragment = this._createDocumentElement(
      'template'
    ) as HTMLTemplateElement;

    const html = Handlebars.compile(template)(contextAndStubs);

    fragment.innerHTML = html;

    const replaceStub = (block: Block) => {
      const stub = fragment.content.querySelector(`[data-id="${block._id}"]`);

      if (!stub) {
        return;
      }

      stub.replaceWith(block.getContent() as Node);
    }

    Object.values(this.children).forEach((child) => {
      if (Array.isArray(child)) {
        child.forEach((el) => replaceStub(el)
        );
      } else {
        replaceStub(child)
      }
    });

    return fragment.content;
  }

  private _init() {
    this._createResources();

    this.init();

    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  protected init(): void {
    return undefined;
  }

  private _componentDidMount() {
    this.componentDidMount();

    Object.values(this.children).forEach((child) => {
      if (Array.isArray(child)) {
        child.forEach((el) => el.dispatchComponentDidMount());
      } else {
        child.dispatchComponentDidMount();
      }
    });
  }

  protected componentDidMount(/*oldProps?: object*/):void {
    return undefined;
  }

  public dispatchComponentDidMount() {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  private _componentDidUpdate(
    oldProps: UnknownObject | State,
    newProps: UnknownObject | State
  ) {
    const response = this.componentDidUpdate(oldProps, newProps);
    if (response) this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  protected componentDidUpdate(
    oldProps: UnknownObject | State,
    newProps: UnknownObject | State
  ) {
    if (oldProps === newProps) return true
    return true;
  }

  setProps = (nextProps: Partial<P>) => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props as UnknownObject, nextProps);
  };

  get element() {
    return this._element;
  }

  get id() {
    return this._id;
  }

  private _render() {
    const block = this.render();

    this._removeEvents();

    if (this._element) {
      this._element.innerHTML = '';

      this._element.append(block);

      this._addEvents();
    }
  }

  protected render(): DocumentFragment | string {
    return '';
  }

  getContent() {
    return this.element;
  }

  private _addEvents() {
    const { events = {}, settings = {} } = this.props as P & CommonProps;

    if (!settings.selectorForEvent) {
      Object.keys(events).forEach((eventName) => {
        if (this._element)
          this._element.addEventListener(eventName, events[eventName]);
      });
    } else {
      const selectedElement = this._element?.querySelector(
        settings.selectorForEvent
      );

      Object.keys(events).forEach((eventName) => {
        if (selectedElement)
          selectedElement.addEventListener(eventName, events[eventName]);
      });
    }
  }

  private _removeEvents() {
    const { events = {} } = this.props as P & CommonProps;

    Object.keys(events).forEach((eventName) => {
      if (this._element)
        this._element.removeEventListener(eventName, events[eventName]);
    });
  }

  private _createDocumentElement(tagName: string) {
    const element = document.createElement(tagName);

    if (this._id) element.setAttribute('data-id', this._id);

    return element;
  }

  private _makePropsProxy(props: P, current: this): P {
    const proxyProps = new Proxy(props as UnknownObject, {
      get(target: UnknownObject, prop: string) {
       
        
          const value = target[prop];
          return typeof value === 'function' ? value.bind(target) : value;
        
      },
      deleteProperty() {
        throw new Error('No access');
      },
      set(target: UnknownObject, prop, value) {
        if (typeof prop === 'string' && prop.indexOf('_') === 0) {
          throw new Error('No access');
        }
        const oldProps = { ...target };

        if (typeof value === 'function') value.bind(target);
        if (typeof prop === 'string') target[prop] = value;

        current.eventBus().emit(Block.EVENTS.FLOW_CDU, oldProps, target);

        return true;
      },
    });

    return proxyProps as P;
  }

  show() {
    const element = this.getContent();
    if (element) element.style.display = 'block';
  }

  hide() {
    const element = this.getContent();
    if (element) element.style.display = 'none';
  }
}
