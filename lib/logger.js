/**
 * 日志打印
 * 这里的日志打印会带上前缀
 */
const chalk = require('chalk')
const format = require('util').format

/**
 * 前缀
 */

const prefix = '[bv-git-cli]'
// 分号固定灰色
const sep = chalk.gray(':')

/**
 * 正常信息打印
 *
 * @param {String} message
 */

exports.log = function (...args) {
  const msg = format.apply(format, args)
  console.log(chalk.white(prefix), sep, msg)
}

/**
 * 错误信息打印
 *
 * @param {String} message
 */

exports.error = function (...args) {
  if (args[0] instanceof Error) args[0] = args[0].message.trim()
  const msg = format.apply(format, args)
  console.error(chalk.red(prefix), sep, msg)
  process.exit()
}

/**
 * 成功信息打印
 *
 * @param {String} message
 */

exports.success = function (...args) {
  const msg = format.apply(format, args)
  console.log(chalk.white(prefix), sep, msg)
}
