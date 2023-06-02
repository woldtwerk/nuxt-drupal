<script setup lang="ts">
import type { ZodType, z } from 'zod'
import { useHead } from 'unhead'
import { useDrupal } from '../composables/useDrupal'
import { DrupalNodeSchema } from '../schemas/node'

const props = defineProps<{
  uuid: string
  type: string
  debug?: boolean
  meta?: boolean
  schema?: ZodType
}>()

const { findOne } = useDrupal()
const { data } = await findOne<z.infer<typeof DrupalNodeSchema>>(`node--${props.type}`, props.uuid)
const attributes = props.schema
  ? props.schema.parse(data.attributes)
  : data.attributes

props.meta && 'metatag' in data.attributes && useHead({
  title: data.attributes.title,
  meta: data.attributes.metatag?.filter(tag => tag.tag === 'meta').map(tag => tag.attributes),
  link: data.attributes.metatag?.filter(tag => tag.tag === 'link').map(tag => tag.attributes),
})

</script>

<template>
  <article
    role="article"
    :lang="data.attributes.langcode"
  >
    <slot
      :attributes="attributes"
    />

    <DevOnly v-if="debug">
      <code>
        <pre>
            {{ data }}
          </pre>
      </code>
    </DevOnly>
  </article>
</template>
