<script lang="ts" setup>
import type { ButtonProps } from './button';

defineOptions({ name: 'Btn' });

withDefaults(defineProps<ButtonProps>(), { disabled: false });
</script>

<template>
  <button :disabled="disabled" class="btn">
    <slot />
  </button>
</template>

<style lang="css" scoped>
.btn {
  padding: 8px 16px;
  color: white;
  border-radius: 8px;
}
</style>
