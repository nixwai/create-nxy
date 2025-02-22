import type { App, Component, Plugin } from 'vue';

export function withInstall<T extends Component>(comp: T) {
  (comp as T & Plugin).install = (app: App): void => {
    if (comp.name) {
      app.component(comp.name, comp);
    }
  };
  return comp;
}
