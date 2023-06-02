import { DrupalRequestParams } from "../types"
import { useDrupalClient } from "./useDrupalClient"

export const useDrupalEntity = () => {
  const client = useDrupalClient()

  /**
   * Get a list of {content-type} entries
   *
   * @param  {string} contentType - Content type's name pluralized
   * @param  {DrupalRequestParams} params? - Query parameters
   * @returns Promise<T>
   */
  const find = <T>(contentType: string, params?: DrupalRequestParams): Promise<T> => {
    return client(`/${contentType}`, { method: 'GET', params })
  }

  /**
   * Get a single {content-type} entry
   *
   * @param  {string} contentType - Content type's name pluralized
   * @param  {DrupalRequestParams} params? - Query parameters
   * @returns Promise<T>
   */
  const findOne = <T>(contentType: string, uuid: string, params?: DrupalRequestParams): Promise<T> => {
    return client(`/${contentType}/${uuid}`, { method: 'GET', params })
  }

  return {
    find,
    findOne,
  }
}
