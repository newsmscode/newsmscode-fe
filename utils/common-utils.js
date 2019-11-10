const dateFormat = (source, pattern = 'yyyy-MM-dd HH:mm:ss') => {
  if (!source) {
    return ''
  }

  if (['number', 'string'].includes(typeof source)) {
    source = new Date(source)
  }

  const dateFields = {
    yy: source.getFullYear() % 100,
    yyyy: source.getFullYear(),
    M: source.getMonth() + 1,
    MM: source.getMonth() + 1,
    d: source.getDate(),
    dd: source.getDate(),
    h: source.getHours() % 12,
    hh: source.getHours() % 12,
    H: source.getHours(),
    HH: source.getHours(),
    m: source.getMinutes(),
    mm: source.getMinutes(),
    s: source.getSeconds(),
    ss: source.getSeconds(),
  }

  return pattern.replace(/yyyy|yy|MM|M|dd|d|HH|H|hh|h|mm|m|ss|s/g, (fm) => {
    const value = dateFields[fm]
    if (fm.length === 1) {
      return value
    }
    return `0000${value}`.substr(-fm.length)
  })
}


const __object_2_entries__ = (source, parentKey = null) => {
  if (!source) {
    return []
  }

  const sourceEntries = Object.entries(source)

  if (!sourceEntries || !sourceEntries.length) {
    return []
  }

  const entries = [] 
  sourceEntries.forEach(([k, v]) => {
    const key = `${parentKey ? `${parentKey}.` : ''}${k}`
    if (
      v
      && v.toString() === '[object Object]'
      && Object.keys(v).length
    ) {
      entries.push(...__object_2_entries__(v, key))
    } else {
      entries.push([key, v])
    }
  })
  return entries
}

const flatObject = (source) => {
  return Object.fromEntries(__object_2_entries__(source))
}

module.exports = {
  dateFormat,
  flatObject
}
