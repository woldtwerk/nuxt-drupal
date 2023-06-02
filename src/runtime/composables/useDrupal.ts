import type { DrupalRequestParams, DrupalResponseSingle, DrupalResponseMany, MenuItemAttributes } from "../types"
import { useDrupalClient } from "./useDrupalClient"
import { z } from "zod"
// import { useDrupalEntity } from "./useDrupalEntity"

// interface DrupalClient<T> {
//   find<F = T>(contentType: string, params?: DrupalRequestParams): Promise<DrupalResponse<F>>
//   findOne<F = T>(contentType: string, uuid: string, params?: DrupalRequestParams): Promise<DrupalResponseMany<F>>
//   menu<F = MenuItem>(id: string, params?: DrupalRequestParams): Promise<DrupalResponseMany<F>>
// }

// export const useDrupal = <T>(): DrupalClient<T> => {
//   return {
//     ...useDrupalEntity()
//   }
// }

// export const useDrupal = <T>(): DrupalClient<T> => {
export const useDrupal = () => {
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
  const findOne = <T>(
    contentType: string,
    uuid: string,
    params?: DrupalRequestParams
  ) => {
    return client<DrupalResponseSingle<T>>(`/${contentType}/${uuid}`, { method: 'GET', params })
  }

  const menu = <T = {}>(id: string, params?: DrupalRequestParams): Promise<DrupalResponseMany<MenuItemAttributes & T>> => {
    return client(`/menu_items/${id}`, { method: 'GET', params })
  }

  const view = <T>(id: string): Promise<DrupalResponseMany<T>> => {
    return client(`/views/${id}`, { method: 'GET' })
  }

  return {
    find,
    findOne,
    menu,
    view,
  }
}
