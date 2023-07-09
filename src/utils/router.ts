import { Form } from '../components/AuthForm/Form';
import { UnknownObject } from '../types/common';
import { Block } from './block';
import { render } from './renderDom';

class RoutePage {
  private _block: Block | null = null;
  private _pathname;
  private _blockClass: typeof Block;
  protected _props;
  

  constructor(pathname: string, view: typeof Block, props: UnknownObject) {
      this._pathname = pathname;
      this._blockClass = view;
      this._block = null;
      this._props = props;
  }

  navigate(pathname: string) {
      if (this.match(pathname)) {
          this._pathname = pathname;
          this.render();
      }
  }

  leave() {
      if (this._block) {
          this._block = null;
      }
  }

  match(pathname: string) {
      return pathname === this._pathname;
  }

  render() {
      if (!this._block) {
          this._block = new this._blockClass(this._props);
          render(this._props.rootQuery as string, this._block);
          return;
      }

  }
}

export class Router {
  private static __instance: Router;
  private _rootQuery = '';
  private history = window.history;
  private routes: RoutePage[] = [];
  private _currentRoute: RoutePage | null = null;

  constructor(rootQuery: string) {
      if (Router.__instance) {
          return Router.__instance;
      }

      this._rootQuery = rootQuery;

      Router.__instance = this;
  }

  use(pathname: string, block: typeof Block, props: UnknownObject) {
      const route = new RoutePage(pathname, block, {...props, rootQuery: this._rootQuery});

      this.routes.push(route);

      return this;
  }

  start() {
      window.onpopstate = ((event: PopStateEvent) => {
        const target = event.currentTarget as Window;

          this._onRoute(target.location.pathname);
      });

      this._onRoute(window.location.pathname);
  }

  _onRoute(pathname: string) {
      const route = this.getRoute(pathname);

      if (!route) {
          return;
      }

      if (this._currentRoute && this._currentRoute !== route) {
          this._currentRoute.leave();
      }

      this._currentRoute = route;
      route.render();
  }

  go(pathname: string) {
      this.history.pushState({}, '', pathname);
      this._onRoute(pathname);
  }

  back() {
      this.history.back();
  }

  forward() {
      this.history.forward();
  }

  getRoute(pathname: string) {
      return this.routes.find(route => route.match(pathname));
  }
}

export const appRouter = new Router('main');

