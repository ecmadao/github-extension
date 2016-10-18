![github extension](./readme/github-extension.png)

> 一个用于提升`github pull request & code review`的 chrome 插件

## 特性

### 关于创建`pull request`

当你给某个 github 仓库 push 了一个新分支之后，应该会在该仓库的首页看见下面这种页面：

![创建pull request](./readme/create_pull_request.png)

然后点击"Compare & pull request"，就会跳转到创建`pull request`的页面，并且你刚 push 的这个分支会直接和`master`分支比较。

![create pull request-before](./readme/create_pull_request_before.png)

酷😝。但如果你并不想合并到`master`分支呢？假设我们从`master`创建了一个`staging`分支，它被用于测试环境。而日常的开发和测试都是在基于`staging`所创建的分支，而`master`作为生产环境的分支🤔。

既然我们的分支基于`staging`创建，那它或许和`master`有很大的差别。如果这样的话，在我们点击"Compare & pull request"之后，它会直接和`master`分支进行比较的话 -- 那简直太糟糕了 -- 你的页面可能会卡死、耗费很长很长的时间来加载资源🙄，而且只有在加载完资源之后才可以切换`base`分支，然后再比较一次😞。

而利用这个插件，我会偷偷改变你要比较的分支。当你点击"Compare & pull request"按钮之后，会跳转到一个仅仅和自身比较的页面，那样的话几乎可以在瞬间完成页面加载。

![create pull request-after](./readme/create_pull_request_after.png)

我觉得吧，与其初始化的时候加载了错误的`compare`，还不如不提供默认选择，让我自己来选择`pull request`的`base`分支。

### 关于`code review`的用户体验

假设你被指定参与一个`code review`，而那个`code review`又碰巧很长。直接`merge`了呗？开玩笑，那怎么可能。

所以当你认认真真的看完了`pull request file compare`，想要发表点评论，或者合并分支的时候，不得不再将页面滚动到最顶部，点击`navbar`上的按钮。

![navbar](./readme/navbar.png)

这个插件可以为这一步提供一点便利。针对`pull request`页面，它会生成一个位于页面右下角的`action button`浮动按钮，并提供"回到顶部"、"链接到 conversation 页面"、"链接到 commits 页面"、"链接到 files 页面"几个功能😝。

那几个按钮和`navbar`的作用一毛一样：

![action button](./readme/action_button.png)

### 展现类似的开源项目

现阶段不是非常准确，该功能供娱乐😆。

主要是依据项目名称和语言进行搜索，然后选择展现了 star 数最高的前六个开源项目：

![similar repos](./readme/similar_repos.png)

--------------------------------------------------------------------------------

其实吧，我上面的那些都仅仅是"治标不治本"而已。因为对一个正确、健康的开发流程而言，本身就不提倡太长的`code review` -- 有那么多改变的代码要看，难以保障 review 质量。而对于插件"改变 pull request 比较的分支"这个功能，本身 github 的`git flow`所提倡的就是：使用`master`分支作为`base`分支，开发分支应该基于`master`分支创建。不过因为自己习惯的原因（公司开发流程的`git flow`和`gitlab work flow`），才会去创建这个 chrome 插件，也希望能帮助到大家吧。

## 本地玩起来

- 克隆这个仓库
- 打开 chrome，进入 [chrome://extensions](chrome://extensions/) 页面
- 打开 “开发者模式”
- 点击 "加载未封装的扩展程序"，然后加载你刚刚下载的文件夹内的 "build" 文件夹

## ToDo

- [x] 在各仓库的主页面展现和它类似的开源仓库
- [x] code review 页面的 action button 展现当前的页面
- 更多功能还在思考中。。

## author

[ecmadao](https://github.com/ecmadao)

## License

MIT