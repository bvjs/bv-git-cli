# 简介

克隆Git项目

#### 安装

```
npm install -g bv-git-cli
```

#### 初始化
生成配置文件

```
bv-git init
```

在当前目录生成git.config.js
```
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
```

#### 克隆
配置好配置文件后，执行：

```
bv-git clone
```

执行其它配置文件

```
bv-git clone ./git.dev.config.js
```

#### 其它

```
bv-git help
```