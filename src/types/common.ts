export type EventCallback = (...args: object[]) => void;

export interface EventBusListeners {
  [key: string]: EventCallback[];
}

export interface BlockMeta {
  tagName: string;
  props: object;
}
