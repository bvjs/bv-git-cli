/**
 * git pull
 * @param {String} repoDir Git项目目录
 * @param {String} branch 分支
 */
const Git = require("nodegit")
const path = require('path')

let repository = null

module.exports = (repoDir, branch) => new Promise((resolve, reject) => {
  Git.Repository
    .open(path.resolve(repoDir))
    .then(repo => {
      repository = repo
      return repository.fetchAll({
        callbacks: {
          credentials: (url, userName) => nodegit.Cred.sshKeyFromAgent(userName),
          certificateCheck: () => 0
        }
      })
    })
    .then(() => {
      resolve()
      return repository.mergeBranches(branch, `origin/${branch}`)
    })
    .catch(reject)
})
