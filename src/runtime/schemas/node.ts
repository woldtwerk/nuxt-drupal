import { z } from "zod"

export const DrupalMetaTagSchema = z.union([
  z.object({
    tag: z.literal('link'),
    attributes: z.object({
      rel: z.string(),
      href: z.string().url(),
    })
  }),
  z.object({
    tag: z.literal('meta'),
    attributes: z.union([
      z.object({
        name: z.string(),
        content: z.string(),
      }),
      z.object({
        property: z.string(),
        content: z.string(),
      })
    ])
  })
])

export const DrupalRevisionSchema = z.object({
  revision_timestamp: z.string().datetime({ offset: true }),
  revision_log: z.string().or(z.null()),
  revision_translation_affected: z.boolean().or(z.null()),
})

export const DrupalNodeSchema = z.object({
  drupal_internal__nid: z.number(),
  drupal_internal__vid: z.number(),
  langcode: z.string(),
  changed: z.string().datetime({ offset: true }),
  created: z.string().datetime({ offset: true }),
  title: z.string(),
  promote: z.boolean(),
  sticky: z.boolean(),
  default_langcode: z.boolean(),
  metatag: z.array(DrupalMetaTagSchema),
  path: z.object({
    alias: z.string().url(),
    pid: z.number(),
    langcode: z.string(),
  }),
})
