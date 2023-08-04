import { UnknownObject } from '../types/common';
import { Block } from './block.ts';
import { render } from './renderDom.ts';

type Protection = 'protected' | 'not portected' | 'common'

class RoutePage {
  private _block: Block | null = null;
  private _pathname;
  private _blockClass: typeof Block;
  protected _props;
  private _protection: Protection = 'protected'
  

  constructor(pathname: string, view: typeof Block, props: UnknownObject, protection?: Protection) {
      this._pathname = pathname;
      this._blockClass = view;
      this._block = null;
      this._props = props;
      if (protection) this._protection = protection
  }

  get protection() {
    return this._protection;
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
  private _protectedFallback = '/settings' 
  private _unprotectedFallback = '/signin'
  private _isProtected = false

  constructor(rootQuery: string) {
      if (Router.__instance) {
          return Router.__instance;
      }

      this._rootQuery = rootQuery;

      Router.__instance = this;
  }

  set isProtected(value: boolean) {
    this._isProtected = value
  }

  use(pathname: string, block: typeof Block, props: UnknownObject, protection?: Protection) {
      const route = new RoutePage(pathname, block, {...props, rootQuery: this._rootQuery}, protection);

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

  private _onRoute(pathname: string) {
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

  setProtectedFallback(pathname: string) {
    this._protectedFallback = pathname

    return this
  }

  setUnprotectedFallback(pathname: string) {
    this._unprotectedFallback = pathname

    return this
  }

  private getRoute(pathname: string) {
      
      let route = this.routes.find(route => route.match(pathname));

      if (pathname && !route) route = this.routes.find(route => route.match('/not-found'))

      const routeProtection = route?.protection

      if (!this._isProtected && routeProtection === 'protected') {
        this.go(this._unprotectedFallback)
        return
      }

      if (this._isProtected && routeProtection === 'not portected') {
        this.go(this._protectedFallback)
        return
      }

      return route
  }
}

export const appRouter = new Router('main');

