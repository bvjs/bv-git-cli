/**
 * Git克隆配置文件
 * @param {String} output 输出目录，克隆项目存放目录
 * @param {Array} repos 项目配置
 * @param {String} repos[i].url 项目git地址
 * @param {String} repos[i].branch 分支
 * @param {Boolean} info 是否打印日志
 * @param {Boolean} clean 是否一直是clone，如果为false，则先clone，如果存在，则pull
 */
module.exports = {
  output: '',
  info: false,
  clean: false,
  repos: [
    {
      url: '',
      branch: '',
    }
  ],
}