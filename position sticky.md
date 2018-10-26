# position: sticky;

用bootstrap 的时候看到的。左边的列表使用了

`position: sticky;`

So 作为老年人，懵逼了。所以来学习下。

https://developer.mozilla.org/en-US/docs/Web/CSS/position

In this demo you can control the `position`property for the yellow box.

To see the effect of `sticky` positioning, select the `position: sticky` option and scroll this container.

The element will scroll along with its container, until it is at the top of the container (or reaches the offset specified in `top`), and will then stop scrolling, so it stays visible.

- A **stickily positioned element** is an element whose [computed](https://developer.mozilla.org/en-US/docs/CSS/computed_value) `position` value is `sticky`. It's treated as relatively positioned until its [containing block](https://developer.mozilla.org/en-US/docs/Web/CSS/All_About_The_Containing_Block) crosses a specified threshold (such as setting [`top`](https://developer.mozilla.org/en-US/docs/Web/CSS/top) to value other than auto) within its flow root (or the container it scrolls within), at which point it is treated as "stuck" until meeting the opposite edge of its [containing block](https://developer.mozilla.org/en-US/docs/Web/CSS/All_About_The_Containing_Block).

```css
position: sticky;
top: auto;
/*if this will be not move*/
```

网页例子里有excel冻结行的效果，感觉不错。

大面积不支持，除了Firefox……so byebye