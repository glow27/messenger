import { Block } from './block.ts';

export function render(query: string, block: unknown) {
  const root = document.querySelector(query);

  if (root) {
    root.innerHTML = '';

    root.append((block as Block).getContent() as Node);
  }
  
  (block as Block).dispatchComponentDidMount();
}
