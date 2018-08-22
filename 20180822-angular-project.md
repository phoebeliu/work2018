# angular project start

写一个前端component 集合，加上点UX设计弄个项目的toolkit.

搭架子的时候真是要命，很多第三方插件，刚开始傻傻全用了压缩min.js结果报错在jQuery部分。

错误是：Error: $injector:modulerrModule Error

大写懵逼中……

搜文档说是因为没加`ngRoute`，我心说你逗我呢？jQuery里没加ngoute?然后加了这玩意在index.js里，还是报错。绝望了……

最后搜来搜去有人告诉把error改一改，展示detail，于是默默把min.js 全部改为.js然后！开始报正经错误了……

然后真是这玩意没加，我心说大爷你angular本人既然都min.js就不能统统打包吗？！竟然这route还得分开装？！好吧……肯定是我的问题，我太菜。

于是通过这个问题，要记下来dev环境妥妥用非压缩，不然坑死自己。