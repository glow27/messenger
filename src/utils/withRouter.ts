import { UnknownObject } from '../types/common';
import { Block } from './block';
import { appRouter } from './router';


export function withRouter(Component: typeof Block<unknown>) {

  return class extends Component {
    constructor(props: UnknownObject) {
      super({ ...props, router: appRouter });
    }
  }
}


