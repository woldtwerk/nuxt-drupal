export interface DrupalRequestParams {
  fields?: Array<string>
  populate?: string | Array<string> | object
  sort?: string | Array<string>
  // pagination?: PaginationByOffset | PaginationByPage
  filters?: Record<string, unknown>
  publicationState?: 'live' | 'preview'
  locale?: string
}

export interface DrupalResponseData<T> {
  id: string
  type: string
  links?: Record<string, unknown>
  attributes: T
  relationships?: Record<string, unknown>
}

export interface DrupalResponseMany<T> {
  jsonapi: {
    version: string
    meta: Record<string, unknown>
  }
  data: DrupalResponseData<T>[],
  links: Record<string, unknown>
}

export interface DrupalResponseSingle<T> {
  jsonapi: {
    version: string
    meta: Record<string, unknown>
  }
  data: DrupalResponseData<T>,
  links: Record<string, unknown>
}

export interface JsonApiResourceWithPath extends JsonApiResource {
  path: PathAlias
}

export interface DrupalNode extends JsonApiResourceWithPath {
  drupal_internal__nid: number
  drupal_internal__vid: number
  changed: string
  created: string
  title: string
  default_langcode: boolean
  langcode?: string
  sticky: boolean
  metatag?: Metatag[]
}

export interface Metatag {
  tag: 'link' | 'meta'
  attributes: Record<string, string>
}

export interface MenuFilter {
  max_depth?: number
  min_depth?: number
  parent?: string
}

/**
 * Drupal JSON:API Menu Item Response
 * @see https://www.drupal.org/project/jsonapi_menu_items
 * @example /jsonapi/menu_items/main
 */
// export interface MenuItemResponse {
//   jsonapi: JsonApi
//   data: MenuItem[]
//   links: JsonApiLinks
// }

/**
 * Drupal JSON:API meta data
 */
// export interface JsonApi {
//   version: string
//   meta: {
//     links: {
//       self: {
//         href: string
//       } & Record<string, unknown>
//     } & Record<string, unknown>
//   } & Record<string, unknown>
// }

/**
 * Drupal JSON:API links
 */
// export interface JsonApiLinks {
//   self: {
//     href: string
//   } & Record<string, unknown>
// }

export interface MenuItemMeta {
  entity_id: string
}

export type MenuItemOptions = unknown

/**
 * Drupal route
 * @example entity.node.canonical
 */
export type DrupalRoute = string

export interface MenuItemRoute {
  name: DrupalRoute
  parameters: {
    node?: string
  } | []
}

/**
 * Drupal menu item UUID
 */
export type MenuItemUUID = string

/**
 * Either a content or config menu item
 */
export type MenuItemProvider = 'menu_link_content' | 'menu_link_config'

export type MenuItemIdentifier = `${MenuItemProvider}:${MenuItemUUID}` | ''

export interface MenuItemAttributes {
  description: string | null
  enabled: boolean
  expanded: boolean
  menu_name: string
  meta: MenuItemMeta
  options: MenuItemOptions[]
  parent: MenuItemIdentifier
  provider: MenuItemProvider
  route: MenuItemRoute
  title: string
  url: string
  weight: number
}

/**
 * Drupal JSON:API Menu Item
 *
 * The enpoint supports filtering by min_depth, max_depth, root, condtions and parents.
 * @see https://www.drupal.org/project/jsonapi_menu_items/issues/3171371#comment-13927240
 *
 * @description
 * ## Min_depth and max_depth
 * /jsonapi/menu_items/main?filter[min_depth]=2
 *
 * /jsonapi/menu_items/main?filter[max_depth]=5
 *
 * /jsonapi/menu_items/main?filter[min_depth]=1&filter[max_depth]=2
 *
 * ## Set root.
 * /jsonapi/menu_items/main?filter[parent]=id
 *
 * /jsonapi/menu_items/main?filter[parent]=id&filter['max_depth']=1
 *
 * Notes:
 * - id is the menu id (i.e: menu_link_content:0600b2dd-1f64-4afd-adaf-c7e6fd3b4882)
 * - This option implies min_depth=1. For this reason "filter[min_depth]" will be ignored if it's provided.
 * - It can be combined with filter['max_depth']
 *
 * ## Conditions
 * /jsonapi/menu_items/main?filter[conditions][url][value]=%url%&filter[conditions][url][operator]=LIKE
 *
 * /jsonapi/menu_items/main?filter[conditions][title][value]=title
 *
 * /jsonapi/menu_items/main?filter[conditions][provider][value]=menu_link_content
 *
 * Notes:
 * - title is a serialized field. The only operator supported is equal(=). This is the default operator if none is provided.
 * - url is only valid for those links that have a url, not a node reference
 *
 * ## Parents
 * /jsonapi/menu_items/main?filter[parents]=id1,id2
 *
 * Notes:
 * - id1, id2 are the menu ids (i.e: menu_link_content:0600b2dd-1f64-4afd-adaf-c7e6fd3b4882)
 */
export interface MenuItem {
  type: string
  id: MenuItemIdentifier
  attributes: MenuItemAttributes
}
