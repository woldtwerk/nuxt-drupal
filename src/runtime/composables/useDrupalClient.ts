import { useNuxtApp } from '#app'
import { useDrupalUrl } from './useDrupalUrl'

export const useDrupalClient = () => {
  const nuxt = useNuxtApp()
  const baseURL = useDrupalUrl()

  return async <T> (url: string, fetchOptions: Parameters<typeof $fetch>[1] = {}): Promise<T> => {
    const headers: HeadersInit = {}
    const drupalUrl = url.replaceAll('--', '/')

    try {
      return await $fetch<T>(drupalUrl, {
        retry: 0,
        baseURL,
        ...fetchOptions,
        headers: {
          ...headers,
          ...fetchOptions.headers
        }
      })
    } catch (err: any) {
      const e: Error = err.data

      nuxt.hooks.callHook('drupal:error' as any, e)
      throw e
    }
  }
}
