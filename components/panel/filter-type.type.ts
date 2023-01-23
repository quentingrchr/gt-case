export const FILTER_TYPE = {
  none: 'none',
  farms: 'farms',
  products: 'products',
} as const

export type FilterTypeType = typeof FILTER_TYPE[keyof typeof FILTER_TYPE]

export type FilterSearchType = string | undefined
