export const useDrupalFields = (attributes: Record<string, any>) => {
  // filter object keys to only include those that start with 'field' or are 'body'

  return Object.fromEntries(
    Object.entries(attributes)
      .filter(([key]) => key.startsWith('field') || key === 'body')
  )
}
