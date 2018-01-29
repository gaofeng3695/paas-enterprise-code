

# git管理办法

## 一、分支管理办法

| 分支类别 |       命名       |  存在期限   | 备注                    |
| :--: | :------------: | :-----: | :-------------------- |
| 版本分支 |     master     | 永久（受保护） | 管理对外发布版本，每个版本打一个 tag  |
| 开发分支 |      dev       | 永久（受保护） | 作为日常开发汇总，即开发版的代码      |
| 个人分支 |    gaofeng     |   临时    | 每人建立自己的分支             |
| 发布分支 | release-v1.0.0 |   临时    | 测试完毕后直接发布             |
| 修复分支 | hotfixe-v1.0.1 |   临时    | 创建线上bug修复分支，测试完毕后直接发布 |

其他备注：

1. 临时分支在提交合并之后会被删掉。
2. 发布分支和修复分支也是测试分支，测试通过后，直接用此测试分支作发布，发布后将测试分支并入master和dev上。
3. 测试出现bug，如果一个人负责修改，直接在此分支上修改，如果多人协作，以当前测试分支另起新的个人分支。
4. master上的发布版本需要打tag作好版本的记录。



## 二、工作流管理办法

以下图为例：

![image](https://ws1.sinaimg.cn/large/0062G6WRly1fnxg4ccaafj30kq0oz798.jpg)

## 三、git配置    

* 必要配置    
```
git config --global core.quotepath false                 # 关闭对0x80以上的字符进行quote， 解决git的中文乱码问题。
git config --global core.autocrlf true                   # 自动转换LF和CRLF(不同操作系统换行不同问题)。
```

* 推荐配置：提高工作效率   
```
// git命令使用别名简化
git config --global alias.co checkout                    # GIT命令别名 方便操作快捷
git config --global alias.ci commit                      # GIT命令别名 方便操作快捷
git config --global alias.st status                      # GIT命令别名 方便操作快捷
git config --global alias.br branch                      # GIT命令别名 方便操作快捷
```



## 四、 提交信息的格式    

Commit message 都包括两个部分：header（必须），body（选填） 。
不管是哪一个部分，任何一行都不得超过50个字符，避免自动换行影响美观，举例如下
### header(必须)    

Header部分只有一行，总结性质描述。

### body(选填)    

Body 部分是对本次 commit 的详细描述，可以分成多行。        
- 应该说明代码变动的动机，以及与以前行为的对比。    
- 为什么这个变更是必须的? 它可能是用来修复一个bug，增加一个feature，提升性能、可靠性、稳定性等等
- 他如何解决这个问题? 具体描述解决问题的步骤
- 是否存在副作用、风险?






