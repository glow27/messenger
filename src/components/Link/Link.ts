import { CommonProps } from '../../types/common';
import { Block } from '../../utils/block';
import { Router } from '../../utils/router';
import { withRouter } from '../../utils/withRouter';

interface LinkProps extends CommonProps {
  linkText: string;
  href: string;
  router: Router
}

const template = '{{ linkText }}';

class BaseLink extends Block<LinkProps> {
  constructor(props: LinkProps) {
    super({
      ...props,
      events: {
        click: (e: Event) => {
          e.preventDefault()
          this.navigate()
        }
      }
    }, 'a');
  }

  navigate() {
    this.props.router.go(this.props.href);
  }

  render() {
    const { linkText } = this.props;

    return this.compile(template, { linkText });
  }
}

export const Link = withRouter(BaseLink);
