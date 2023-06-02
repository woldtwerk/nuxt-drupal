export default defineNuxtConfig({
  modules: [
    '../src/module',
    '@nuxt/devtools',
    '@sidebase/nuxt-auth'
  ],
  drupal: {
    url: 'https://d10.localhost',
    devtools: true,
  },
  devtools: {
    enabled: true,
  },
  // devSen
  typescript: {
    includeWorkspace: true
  },
  runtimeConfig: {
    // OAUTH_CLIENT_ID: process.env.OAUTH_CLIENT_ID,
    // OAUTH_CLIENT_SECRET: process.env.OAUTH_CLIENT_SECRET,
    // NEXT_PUBLIC_DRUPAL_BASE_URL: process.env.NEXT_PUBLIC_DRUPAL_BASE_URL,
    // NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    // NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    // NUXT_SECRET: process.env.NUXT_SECRET,
    // AUTH_ORIGIN: process.env.NEXTAUTH_URL,
    // ORIGIN: process.env.NEXTAUTH_URL,
  },
  auth: {
    origin: process.env.ORIGIN,
    enableGlobalAppMiddleware: true,
  },
})
