import { tryOnScopeDispose } from '@vueuse/core';
import { readonly, ref } from 'vue-demi';

export function useLoad() {
  const loading = ref(false);

  function openLoading() {
    loading.value = true;
  }

  function closeLoading() {
    loading.value = false;
  }

  tryOnScopeDispose(() => {
    closeLoading();
  });

  return {
    loading: readonly(loading),
    openLoading,
    closeLoading,
  };
}

export type UseThrottleControlReturn = ReturnType<typeof useLoad>;
