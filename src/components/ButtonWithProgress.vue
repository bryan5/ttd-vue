<template>
  <button class="btn btn-primary" :disabled="disabled || apiProgress" @click.prevent="$emit('click-custom-button')">
    <LoadingSpinner v-if="apiProgress" />
    <slot>Button</slot>
  </button>
</template>

<script>
import LoadingSpinner from './LoadingSpinner'

export default {
  components: {
    LoadingSpinner
  },

  emits: [
    'click-custom-button'
  ],

  props: {
    apiProgress: Boolean,
    disabled: Boolean
  },
}
</script>
