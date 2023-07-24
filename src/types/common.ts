import { State } from '../utils/store';

export type EventCallback = (...args: (UnknownObject | State)[]) => void;

export type UnknownObject = { [key: string]: unknown };

export interface Settings {
  withId?: boolean;
  selectorForEvent?: string;
}

export interface EventsProps {
  [key: string]: (e: Event) => void
}

export type CommonProps = {
  settings?: Settings,
  events?: EventsProps
}

export interface EventBusListeners {
  [key: string]: EventCallback[];
}

export interface BlockMeta {
  tagName: string;
  props: UnknownObject;
}


export function hasSettingsWithId(obj: Settings) {
  return Boolean(obj.withId)
}

export interface RequestPayload<T> {
  data: T;
  isAvatar?: boolean
}

export interface ResponsePayload<T> {
  data?: T
  status: number
}
