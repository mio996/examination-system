const log = {}

/**
 * @description 返回这个样式的颜色值
 * @param {String} type 样式名称 [default | primary | success | warning | danger | text]
 */
function getColor(type = 'default') {
  const color = {
    default: '#354953',
    primary: '#00796a',
    success: '#43b883',
    warning: '#e6a23c',
    danger: '#f56c6c',
    text: '#333333'
  }
  return color[type]
}

/**
 * @description 打印一个[title | text]样式的信息
 * @param {String} title
 * @param {String} info
 * @param {String} style
 */
log.capsule = function (title, info, style = 'primary') {
  console.log(
    `%c ${title} %c ${info} %c`,
    `background: ${getColor(
      'default'
    )}; padding: 1px; border-radius: 3px 0 0 3px; color: #fff`,
    `background: ${getColor(
      style
    )}; padding: 1px; border-radius: 0 3px 3px 0; color: #fff`,
    `background: transparent;`
  )
}

/**
 * @description 打印彩色文字
 */
log.colorful = function (textArr) {
  console.log(
    `%c ${textArr.map((t) => t.text || '').join('%c')}`,
    ...textArr.map((t) => `color: ${getColor(t.type)}`)
  )
}

log.default = function (text) {
  log.colorful([{ text }])
}

log.primary = function (text) {
  log.colorful([{ text, type: 'primary' }])
}

log.success = function (text) {
  log.colorful([{ text, type: 'success' }])
}

log.warning = function (text) {
  log.colorful([{ text, type: 'warning' }])
}

log.danger = function (text) {
  log.colorful([{ text, type: 'danger' }])
}

export default log
