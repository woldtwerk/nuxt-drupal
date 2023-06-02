<script setup lang="ts">
import { z } from 'zod'

const ArticleSchema = DrupalNodeSchema.extend({
  body: z.object({
    value: z.string(),
    format: z.string(),
    processed: z.string(),
    summary: z.string(),
  }),
  field_date: z.array(z.string().datetime({ offset: true }))
})

</script>

<template>
  <div>
    <AuthenticationStatus />
    <DrupalMenu id="main" />
    <DrupalNode
      v-slot="{ attributes }: { attributes: z.infer<typeof ArticleSchema>}"
      type="article"
      uuid="4e5ac4ea-8024-45b4-8220-95abcc5bcf5e"
      :meta="true"
      :debug="false"
      :schema="ArticleSchema"
    >
      <h1>
        {{ attributes.title }}
      </h1>

      {{ attributes.field_date }}

      <div v-html="attributes.body.value" />
    </DrupalNode>
  </div>
</template>
