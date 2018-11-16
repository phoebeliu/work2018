# angular performance 2mins to 7seconds

第一次遇到performance问题还是大锅级别的。IE直接崩掉，chrome要两分钟……

于是开始解决。

刚开始排查觉得就是页面业务逻辑太复杂，directive 套 directive。一层又一层堪称洋葱。然后呢有一个common 的directive超级复杂，里面ng-repeat 加了function，然后呢还有相当长且复杂的ng-if判断。可以说是最复杂的directive 了。于是乎崩了。

然后继续排查发现Chrome 的performance 最多的时间给了compileNodes和applyDirectivesToNode.

页面主要是tabs switchover。下面的content部分呢是使用ng-if来切换的。

于是从两方面着手，一从tabs switchover部分，二是tab content。

Switchover  我知道的是ng-if  ng-include ui-view 三种，很久没写路由了……试了ng-include发现很慢，查了以后说是因为

https://stackoverflow.com/questions/48787883/best-practice-and-performance-in-angularjs-ng-if-with-class-and-icon

it is best to replace `ng-include` with a component / directive with their `template` (**not** `templateUrl`) for **performance** improvement, since it is asynchronous and takes time to load the HTML

这里ng-include 需要时间去加载html到DOM部分。ng-if 直接渲染DOM。ng-if快。

ui-view试了一下，也很慢，用的是*ui-sref-active=*"active" *ui-sref=*"policies.detail.claims。于是放弃。

后来tab content 部分删除部分不用的逻辑，顺畅很多，就没再看了。

下午再来看一下用ui-view,发现点击之后到页面跳转需要9秒时间……迷茫！打开Chrome 的performance查看，发现是Major GC 占了95%，后来再试还有Minor GC 有5.2M，最后来看到还有DOM GC。我迷茫……第一次在JS里看到有这个这个GC   垃圾回收。so查了查还是迷茫……

这个以后会再看看学学。加入`TO DO LIST`

然后进入玄学时间：

1.`ui-view 改为$state.go();`   快了

于是就迷茫了，所以用ui-view的话是把html依次加载到DOM中渲染，而ng-if是无论TRUE or FALSE 都是默默至少是预加载了，至少很占内存。

于是到此，真相大白。开始修改了。

