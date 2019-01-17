# [Position fixed not working is working like absolute [closed\]](https://stackoverflow.com/questions/36855473/position-fixed-not-working-is-working-like-absolute)

The issue here lies with your `.content-container` wrapper class, which has a CSS declaration of `webkit-transform: translate3d(0,0,0)`. The transform declaration, as [this answer illustrates](https://stackoverflow.com/questions/25824749/why-webkit-transform-translate3d0-0-0-messes-up-with-fixed-childs), changes the positioning context from the viewport to the rotated element, which essentially means that your `fixed` element behaves as if it were absolutely positioned. Here's an example showing the difference between a fixed element inside a transformed `div` and a fixed element outside of that `div`.

In order for everything to work, you'll need to remove the `transform3d` declaration from `.content-container`.

今儿突然需求把一个超大button改成fixed,然后发现没起效？！what？吓我一跳，以为我老了不中用了，竟然记错了property。结果查了下……是最外层有用了个transform……我真是……而且不懂他用这玩意干嘛……

只想说你最外面包个transform，那就是整个项目别fixed了呗……真的是服气……于是默默填坑去了。