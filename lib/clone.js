/**
 * git clone
 * @param {String} giturl 克隆地址
 * @param {String} output 输出目录
 * @param {Object} options 配置参数
 * @param {String} branch 分支
 */
const Git = require("nodegit")
const pull = require("./pull")
module.exports = (giturl, output, options = {}, branch = 'v1.1') => new Promise((resolve, reject) => {
  Git
    .Clone(
      giturl,
      output,
      {
        fetchOpts: {
          callbacks: {
            // github will fail cert check on some OSX machines
            // this overrides that check
            certificateCheck: () => 0
          }
        },
        ...options
      }
    )
    .then(repo => {
      return repo.getHeadCommit()
        .then(function (targetCommit) {
          return repo.createBranch(branch, targetCommit, false);
        })
        .then(function (reference) {
          return repo.checkoutBranch(reference, {})
        })
        .then(function () {
          return repo.getReferenceCommit(
            "refs/remotes/origin/" + branch)
        })
        .then(function (commit) {
          Git.Reset.reset(repo, commit, 3, {})
          resolve()
        })
    })
    .catch(err => {
      if (err.errno === -4) {
        pull(output, branch).then(resolve).catch(reject)
      } else {
        reject(err)
      }
    })
})
