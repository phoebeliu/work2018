# angular 1.X中页面init值的继承与作用域

```html
<accordion  close-others="oneAtATime">
<accordion-group>
<accordion-heading>
    <!--这里并没有initshow 值，且看了源码发现这个accordion是隔离scope,页面中多个之间这个show值是相互隔离作用的-->
<button class="" ng-click="show = (!show)">
    <span ng-if="!show">SHOW ADDITIONAL DETAILS</span>
    <span ng-if="show">HIDE ADDITIONAL DETAILS</span>
</button>   
</accordion-heading>
```

然而有天突然发现这个show值变了，变成了true。按理来说应该是undefined才对。所以就开始了找bug之旅……

最后发现是在父页面中也有一个show值且写了 ng-init="show=true"

于是发现angular中这些isolate scope 页面中如果有值且同名，那么会继承父层的，但可以独立，应该是类似java对象化，super了父层，各自独立但有init或说default值。

我看到还是震惊了一下。感觉坑有点多，且这里以后还是应该用对象来做，不建议使用单纯变量值是真的！