const snakeToCamel = (s) => s.replace(/(_\w)/g, (k) => k[1].toUpperCase())

export const camelizeKeys = (obj) => {
  if (Array.isArray(obj)) {
    return obj.map((v) => camelizeKeys(v))
  } if (obj !== null && obj.constructor === Object) {
    return Object.keys(obj).reduce(
      (result, key) => ({
        ...result,
        [snakeToCamel(key)]: camelizeKeys(obj[key]),
      }),
      {},
    )
  }
  return obj
}
