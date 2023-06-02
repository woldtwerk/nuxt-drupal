<script setup lang="ts">
import { useDrupal } from '../composables/useDrupal'

const { findOne } = useDrupal()

const props = defineProps<{
  uuid: string
  type: string
}>()

const { data } = await findOne(props.type, props.uuid)
const { attributes } = data

</script>

<template>
  <slot
    :attributes="attributes"
    :data="data"
  />
</template>
