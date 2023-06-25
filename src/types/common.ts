export type EventCallback = (...args: UnknownObject[]) => void;

export type UnknownObject = { [key: string]: unknown };

export interface Settings {
  withId?: boolean;
  selectorForEvent?: string;
}

type Events = 'click' | 'blur' | 'focus'

export interface EventsProps {
  [key: Events[number]]: (e: Event) => void
}

export interface CommonProps {
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
