import { useRuntimeConfig } from "#app"

export const useDrupalUrl = (): string => {
  const config = process.server ? useRuntimeConfig() : useRuntimeConfig().public

  return `${config.drupal.url}${config.drupal.prefix}`
}
