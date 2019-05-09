/**
 * 下载
 */
const Git = require("nodegit")
const path = require('path')

module.exports = (giturl, output, options = {}, branch = 'master') => {
  return Git
    .Clone(
      giturl,
      output,
      {
        fetchOpts: {
          callbacks: {
            certificateCheck: function () {
              // github will fail cert check on some OSX machines
              // this overrides that check
              return 0;
            }
          }
        },
        ...options
      }
    )
    .then(function (repo) {
      return repo.getBranchCommit('master');
    })
    .catch(err => {
      if (err.errno === -4) {
        fetch(output)
      } else {
        console.log(err)
      }
    })
}

function fetch(repoDir) {
  Git.Repository
    .open(path.resolve(repoDir))
    .then(function (repo) {
      return repo.fetch("origin", {
        callbacks: {
          credentials: function (url, userName) {
            return nodegit.Cred.sshKeyFromAgent(userName);
          }
        }
      })
    })
}