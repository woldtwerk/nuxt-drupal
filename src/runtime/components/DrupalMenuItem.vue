<script setup lang="ts">
import type { MenuItemAttributes, MenuItemIdentifier } from '../types'
import { computed, resolveComponent } from 'vue'

const props = defineProps<{
  type: string
  id: MenuItemIdentifier
  attributes: MenuItemAttributes
}>()

const component = computed(() => {
  return props.attributes.url
    ? resolveComponent('NuxtLink')
    : 'button'
})

const attrs = computed(() => {
  if (component.value === 'button') {
    return {
      type: 'button',
    }
  }
  return {
    to: props.attributes.url,
  }
})
</script>

<template>
  <li>
    <component
      :is="component"
      v-bind="attrs"
    >
      {{ props.attributes.title }}
    </component>
  </li>
</template>
