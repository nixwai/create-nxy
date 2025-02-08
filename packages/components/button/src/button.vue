<script lang="ts" setup>
import type { ButtonProps } from './button';

defineOptions({ name: 'Btn' });

withDefaults(defineProps<ButtonProps>(), { disabled: false });
</script>

<template>
  <button :disabled="disabled">
    <slot />
  </button>
</template>
