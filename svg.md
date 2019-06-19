# svg

有一项学完不咋用，然后忘光的技术……

其实就是画矢量图的，像素图--画面越精致PPI越高-渲染的像素越少，但反之就越粗糙了。所以用矢量图，来描述距离，则不论PPI图画一直保持一致。

基本上使用ADOBE画完导出来。

可以当图片加载，可以变成css background，但是如果要交互，必须使用inline html。css有专门的属性。

> <g>类似《div》把内容变成组合。

`SVG handles transform origins differently than HTML elements.`

原始 transform origin of an HTML element is 50%,50%

Svg 是 0，0左上角，所以要改下transform-origin:50%，50%；

> firefox的svg transform-oirgin :50%, 50%;不起效果，算是个bug他不识别百分比，必须用px(transform-origin： center center;这也不行）

> Svg 中cx 指的是中心x坐标，cy 指的是中心y坐标---解决Firefox bug

```css
@keyframes offset{
    100%{
        stroke-dashoffset: 0;
    }
} 
.logo{
    stroke: blue;
    stroke-width: 2px;
    stroke-dasharray: 500;/*the total length of logo*/
    stroke-dashoffset: 500;/*the total length of logo*/
    animation: offset 5s .5s linear forwards;
    /*animation: offset 5s .5s ease-out backwards;*/
}/*animation like draw a logo */
/*
Getting a path's total length using JavaScript
var path = document.querySelector('.logo');
var length = path.getTotalLength();
*/
```



- [Fills and Strokes - MDN](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Fills_and_Strokes)
- [Using CSS transitions - MDN](https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Using_CSS_transitions)
- [SVG attributes we can style with CSS](http://www.w3.org/TR/SVG/propidx.html)

- [The `` element](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/g)

- [Animated weather icons by Noah Blon](http://codepen.io/noahblon/full/lxukH/)

#### 

- [@keyframes](https://developer.mozilla.org/en-US/docs/Web/CSS/@keyframes)
- [animation](https://developer.mozilla.org/en-US/docs/Web/CSS/animation)
- [animation-fill-mode](https://developer.mozilla.org/en-US/docs/Web/CSS/animation-fill-mode)
- [animation-timing-function](https://developer.mozilla.org/en-US/docs/Web/CSS/animation-timing-function)
- [:nth-of-type](https://developer.mozilla.org/en-US/docs/Web/CSS/%3Anth-of-type)



- [stroke-dasharray](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-dasharray)
- [stroke-dashoffset](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-dashoffset)



- [`translate()` – MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/translate)
- [`translate3d()` – MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/translate3d)
- [Increase Your Site’s Performance with Hardware-Accelerated CSS](http://blog.teamtreehouse.com/increase-your-sites-performance-with-hardware-accelerated-css)
- [Hardware Acceleration with translate3d](http://davidwalsh.name/translate3d)

