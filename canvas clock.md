# canvas clock

<http://howtodrawaclock.appspot.com/html/page1.html>

<canvas id='clockcanvas' height='100' width='100'></canvas>

The `translate()` function simply moves the origin of the canvas's coordinate grid

**NB: It does NOT move the canvas, only the coordinate grid overlaying it!**

First we need to ask the canvas element for a reference to its coordinate grid. This is called the `context`.

```js
var c = document.querySelector('clockcanvas').getContext("2d");
```

Once we have the context, we can translate it thus:

```js
var size = document.querySelector('clockcanvas').height / 2;
c.translate(size, size);//move origin form left top to center
```

![Central Origin](http://howtodrawaclock.appspot.com/assets/canvas2.png)

And finally, in this introductory section, let's look at `rotate`. It's quite simple to use, as long as you stick to the use of [radians](http://www.bbc.co.uk/bitesize/higher/maths/trigonometry/radian_and_equations/revision/1/) rather than degrees.

So if we wanted to rotate the canvas's context (**not the canvas itself remember!**) by 45 degrees, we simply say:

```js
c.rotate(Math.pi /4);
// accroding to the MDN it is (degrees you want to move equals to x)
//c.rotate(x * Math.pi / 180) fromular like this
```

![Rotated grid](http://howtodrawaclock.appspot.com/assets/canvas3.png)

Any line that is drawn along one of the axes will therefore be rotated by the amount specified in the `rotate`method, just like the hand of a clock.

At X minutes past the hour, the minute hand is 360 * X/60 degrees round. But as we need to be working in radians(弧度), it's 2 * pi * X / 60.

` accroding to the MDN it is (degrees you want to move equals to x)`

`c.rotate(x * Math.pi / 180) fromular like this`

> 这里是说分针移动的度数，表分为12格，一格是30度，这30度是5分钟，所以一分钟走的是6度，那么X分钟走的就是6X * PI /180 化简下来就是 X * PI / 30.

```js
var d = new Date();
var mins = d.getMinutes();
//c.rotate((mins / 60) * (2 * Math.PI));
c.rotate((mins * Math.PI) / 30);
```

On a real clock, the minute hand doesn't just jump forward every minute, it gradually moves with every second. So, for extra accuracy and a realistic movement, we should really account for the number of seconds through the minute in our angle too:

> 这里就有意思了，分针呢其实是每秒也移动的，所以他走1分钟6度，如上说过了。那么1秒走的是6/60度也就是1s/0.1度，那么分针实际上每秒走的度数就是（x分钟s秒）6x + 0.1s ,于是要rotate的部分就是（6x + 0.1s）* pi / 180 ，化简下来就是
>
> x*pi / 30 + 
>
> s*pi /1800

```js
var secs = d.getSeconds();
//c.rotate(((mins /60) + (secs / 3600)) * (2 * Math.PI));
c.rotate((mins * Math.PI /30) + (secs * Math.PI / 1800));
```

To draw the line, we'll use a few canvas functions. Initially, we need to specify that we're beginning a new drawing operation so we call `beginPath` thus:

```js
c.beginPath();
```

`beginPath` is used at the beginning of any set of drawing instructions on a `canvas`. It typically begins a drawing event and `stroke` ends it.

We then `moveTo` the starting point of our line, which (for now) is the centre of the canvas at (0,0).

```js
c.moveTo(0,0);
```

and then draw a `lineTo` the end point. The end point is a negative value on the y-axis, because you'll remember that the positive values go from top to bottom, so if we want to draw a line upwards, we draw it to a negative value on the y-axis.

```js
var minuteHandLength = -0.8 * (document.querySelector('clockcanvas').height / 2);
c.lineTo(0, minuteHandLength);
```

Before we actually draw the line, we need to specify the colour, thickness and style of the line. We can use the following to accomplish this:

```js
c.fillStyle = "#000000";
c.strokeStyle = "#00000";
c.lineCap = "round";
c.lineWidth = 5;
```

Finally, we actually draw the line using `stroke`.

```js
c.stroke();
```

But wait, the hands on a clock usually don't start right in the middle, but have a little overhang. (Interesting fact, on a mechanical clock, this is to provide a counterweight for the longer part of the hand to reduce wear on the mechanism and prolong its life.) To include this, instead of starting the line at 0,0, we start a little bit along the positive direction (down) of the y-axis. So now our code looks like this:

`这里是说加上针的宽度`

```js
var minOverhang = 0.1;
c.moveTo(0, minOverhang);
```

Gives us this:

![img](http://howtodrawaclock.appspot.com/assets/canvas6.png)

When we put all this together subsequently, the code will look a bit different because rather than declaring dimensions like minOverhang at the time, we will wrap them all up in a parameter that will be sent to a generic function. This will allow a single clock draw function to cater for all the different styles that we choose.

That's our minute hand done, now for the hour hand. We will use a very similar method to draw it, but first, we should rotate the `context` back to its original position ready for the next operation. Note that when we drew the hour hand, we used the `context` to put it in the right place, but the line was drawn on the canvas itself, so the line we drew does not rotate back with the context.

>这里就更有意思了……在画分针的时候把坐标系移了，那么我们接下来要花时针了，得把坐标系归零再画，所以要做个逆反动作。之前的移转部分加个负号不化简的式子如下，这里搞个弧度的概念看的我脑仁大……
>
>总之就是转过去多少，加个负号，转回来

```js
c.rotate(((mins / 60) + (secs / 3600)) * (-2 * Math.PI));
//c.rotate((mins * Math.PI /30) + (secs * Math.PI / 1800));
```

To return to this:

![img](http://howtodrawaclock.appspot.com/assets/canvas7.png)

To rotate the `context` by the right amount for the hour hand (catering for both hours since 12 and minutes since the hour):

> 这里已经搞过两次了，就不细说了，简而言之原理就是1小时走30度，60分钟时针走30度，1分钟走0.5度

```js
var hours = d.getHours();
//c.rotate(((hours / 12) + (mins / 720)) * (2 * Math.PI));
c.rotate((hours * Math.PI / 6)+(mins * Math.PI / 360));
```

Then we draw the line. We have already set the fillStyle, strokeStyle etc. we don't need to do it again, but we do need to issue a new `beginPath` command.

```js
var hourOverhang = 0.2;
var hourHandLength = -0.6 * (document.querySelector('clockcanvas').height / 2);
c.moveTo(0, hourOverhang);
c.lineTo(0, -hourHandLength);
c.stroke();
```

Now, we have two lines on our `canvas` representing the current time:

To conclude this section, let's put all the code that we've gone through together. You will notice that I've wrapped it up in a function. This is so that we can use it to expand upon as we go on.

```js
function paintClock(cvs, opt) {
//function that draws a clock on canvas cvs with options opt
var size, d, c, hours, mins, secs; //declare variables
size = cvs.width / 2
d = new Date(); //use the time now to set the clock
mins = d.getMinutes();
hours = d.getHours();
secs = d.getSeconds();
```

```js
//Hands style
c = cvs.getContext("2d"); //get the context of the canvas to operate with
c.fillStyle = opt.colour; //set the colour and transparency of the hands
c.strokeStyle = opt.colour;
c.lineCap = "round"; //the end of the hands should be round
c.translate(size, size); //set the origin to the centre of the canvas
```

```js
//Minute Hand
c.beginPath();
c.rotate(((mins / 60) + (secs / 3600)) * 2 * Math.PI); //rotate the canvas to the minute
c.moveTo(0, (opt.minoverh / 100) * size);
c.lineWidth = size * (opt.minwidth / 100); //set the thickness of the hands
c.lineTo(0, (-opt.minlength / 100) * size);
c.stroke(); //draw the minute hand
c.rotate(((mins / 60) + (secs / 3600)) * -2 * Math.PI); //rotate the canvas back to 0
```

```js
//Hour Hand
c.beginPath();
c.rotate(((hours / 12) + (mins / 720)) * 2 * Math.PI); //rotate the canvas to the hour
c.moveTo(0, (opt.houroverh / 100) * size);
c.lineWidth = size * (opt.hourwidth / 100); //set the thickness of the hands
c.lineTo(0, (-opt.hourlength / 100) * size);
c.stroke(); //draw the hour hand
c.rotate(((hours / 12) + (mins / 720)) * -2 * Math.PI); //rotate the canvas back to 0
}
```

## Border

Adding a border is really, really easy as the `canvas` element includes native functions which let us draw one with just a few lines of code:

```js
if (options.borderwidth > 0) {
c.beginPath();
c.lineWidth = size * options.borderwidth / 100;
c.arc(0, 0, size - (size * opt.borderwidth / 100), 0, 2 * Math.PI);
c.stroke();
}
```

This piece of code checks whether a borderwidth has been set in the options and if it has, it draws an [arc](http://www.w3schools.com/tags/canvas_arc.asp) with its origin at the centre (0,0), a radius of the size of the clock (minus the width of the line to account for the line itself), starting at angle 0 and progressing 2 pi radians (360 degrees).

## Tick Marks

![img](http://howtodrawaclock.appspot.com/assets/zoom2.png)

In the image above, "a" is the tick length, "b" is the gap and "c" is the width.

It makes sense then to `moveTo` the outer end first and then draw a line inwards towrds the centre.

To make the little tick marks, we should start at zero rotation and then rotate by 2*PI/n radians (where n is the number of tick marks required) between each tick mark. Let's see what that looks like:

```js
//Tick Marks
if (parseInt(opt.ticknumber, 10) > 0) {
for (i = 0; i < parseInt(opt.ticknumber, 10); i++) {
c.beginPath();
c.lineWidth = size * opt.tickwidth / 100;
c.moveTo(0, size - (size * opt.borderWidth / 100) - (size * opt.tickgap / 100));
c.lineTo(0, size - (size * opt.borderWidth / 100) - (size * opt.tickgap / 100) - (size * opt.ticklen / 100));
c.stroke();
c.rotate((2 * Math.PI) / opt.ticknumber);
}
}
```

> 这里没懂，为什么是(2 * Math.PI) / opt.ticknumber？？？？？

This where wrapping the logic to draw the clock within a function really pays off because we can simply use `setInterval` to update the clock every second like this:

```js
setInterval(paintClock, 1000);
```

Easy peasy.

https://diveintohtml5.info/canvas.html



看完以后还是有点懵逼，就这个数字不知道咋摆的。

```js
function drawNumbers(ctx, radius) {
  var ang;
  var num;
  ctx.font = radius * 0.15 + "px arial";
  ctx.textBaseline = "middle";
  ctx.textAlign = "center";
  for(num = 1; num < 13; num++){
    ang = num * Math.PI / 6;
    ctx.rotate(ang);
    ctx.translate(0, -radius * 0.85);
    ctx.rotate(-ang);
    ctx.fillText(num.toString(), 0, 0);
    ctx.rotate(ang);
    ctx.translate(0, radius * 0.85);
    ctx.rotate(-ang);
  }
}
```





```js
CanvasRenderingContext2D.fillText(text, x, y [, maxWidth]);
```

### Parameters[Section](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/fillText#Parameters)

- `text`

  A [`DOMString`](https://developer.mozilla.org/en-US/docs/Web/API/DOMString) specifying the text string to render into the context. The text is rendered using the settings specified by [`font`](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/font), [`textAlign`](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/textAlign), [`textBaseline`](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/textBaseline), and [`direction`](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/direction).

- `x`

  The x-axis coordinate of the point at which to begin drawing the text, in pixels.

- `y`

  The y-axis coordinate of the point at which to begin drawing the text, in pixels.

```js
void ctx.translate(x, y);
```

The `translate()` method adds a translation transformation to the current matrix by moving the canvas and its origin `x` units horizontally and `y` units vertically on the grid.

![img](https://mdn.mozillademos.org/files/234/Canvas_grid_translate.png)

### Parameters[Section](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/translate#Parameters)

- `x`

  Distance to move in the horizontal direction. Positive values are to the right, and negative to the left.

- `y`

  Distance to move in the vertical direction. Positive values are down, and negative are up.