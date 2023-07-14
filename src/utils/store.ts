import { User } from '../api/AuthApi';
import { UnknownObject } from '../types/common';
import { Block } from './block';
import { EventBus } from './eventBus';
import { set } from './helpers';

export interface State {
  user?: User;
}

const storageEvent = {
  updateState: 'update',
};

class Store extends EventBus {
  private state: State = {};

  getState() {
    return this.state;
  }

  set(path: string, value: unknown) {
    set(this.state, path, value);

    this.emit(storageEvent.updateState, this.state);
  }
}

const store = new Store();

export function withStore(mapStateToProps: (state: State) => UnknownObject) {
  return (Component: typeof Block) => {
    return class extends Component {
      constructor(props: UnknownObject, tag?: string) {
        super({ ...props, ...mapStateToProps(store.getState()) }, tag);

        store.on(storageEvent.updateState, () => {
          const propsFromState = mapStateToProps(store.getState());
          this.setProps(propsFromState);
        });
      }
    };
  };
}

export default store;
