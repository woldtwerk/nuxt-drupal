import { defu } from 'defu'
import { defineNuxtModule, addPlugin, addImportsDir, createResolver, logger, addComponentsDir } from '@nuxt/kit'
import { addCustomTab } from '@nuxt/devtools-kit'
import { joinURL } from 'ufo'
import fs from 'node:fs/promises'

// Module options TypeScript interface definition
export interface ModuleOptions {
  /**
   * Drupal API URL
   * @default process.env.DRUPAL_API_URL
   * @example 'http://drupal.localhost'
   * @type {string}
   */
  url?: string

  /**
  * Drupal Prefix
  * @default '/jsonapi'
  * @type string
  */
  prefix?: string

  /**
   * Add Drupal Admin in Nuxt Devtools
   * @default false
  */
  devtools?: boolean
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: '@woldtwerk/nuxt-drupal',
    configKey: 'drupal'
  },
  // Default configuration options of the Nuxt module
  defaults: {
    url: process.env.DRUPAL_API_URL,
    prefix: '/jsonapi',
    devtools: false
  },
  setup (options, nuxt) {
    nuxt.options.runtimeConfig.public.drupal = defu(nuxt.options.runtimeConfig.public.drupal, options)
    nuxt.options.runtimeConfig.drupal = defu(nuxt.options.runtimeConfig.drupal, options)

    const { resolve } = createResolver(import.meta.url)

    // Transpile runtime
    const runtimeDir = resolve('./runtime')
    nuxt.options.build.transpile.push(runtimeDir)

    // Do not add the extension since the `.ts` will be transpiled to `.mjs` after `npm run prepack`
    addPlugin(resolve(runtimeDir, 'drupal.plugin'))

    addImportsDir(resolve(runtimeDir, 'composables'))
    addImportsDir(resolve(runtimeDir, 'schemas'))

    nuxt.hook("components:dirs", (dirs) => {
      dirs.push({ path: resolve(runtimeDir, 'components'), global: true });
    });

    nuxt.hook('prepare:types', ({ references }) => {
      references.push({ path: resolve(runtimeDir, 'types', 'index.d.ts') })
    })

    const adminUrl = joinURL(nuxt.options.runtimeConfig.public.drupal.url, '/admin/')
    logger.info(`Drupal Admin URL: ${adminUrl}`)

    options.devtools && addCustomTab({
      name: 'drupal',
      title: 'Drupal',
      icon: 'i-logos-drupal-icon',
      view: {
        type: 'iframe',
        src: adminUrl
      }
    })
  }
})
