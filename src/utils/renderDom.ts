import { Block } from './block';

export function render(query: string, block: Block) {
  const root = document.querySelector(query);

  if (root) {
    root.innerHTML = '';

    root.append(block.getContent() as Node);
  }
  
  block.dispatchComponentDidMount();
}
