import { getCurrentScope, onScopeDispose } from 'vue-demi';

export function tryOnScopeDispose(fn: () => void) {
  if (getCurrentScope()) {
    onScopeDispose(fn);
    return true;
  }
  return false;
}
