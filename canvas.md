# canvas

用js来搞画

```js
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
ctx.moveTo(0, 0);
ctx.lineTo(200, 100);
//two point draw a line

ctx.beginPath();
ctx.arc(95, 50, 40, 0, 2 * Math.PI);
//ctx.arc(x, y, radius, startAngle, endAngle [, anticlockwise]);
//The x-axis (horizontal) coordinate of the arc's center.
// draw a circle

ctx.font = "30px Arial";
ctx.fillText("Hello World", 10, 50);
//ctx.strokeText("Hello World", 10, 50); just a border of text
//ctx.fillText("Hello World", canvas.width/2, canvas.height/2); like border-radius with text
//draw a text

// Create gradient
var grd = ctx.createLinearGradient(0, 0, 200, 0);
//CanvasGradient ctx.createLinearGradient(x0, y0, x1, y1);
//var grd = ctx.createRadialGradient(75, 50, 5, 90, 60, 100);
//ctx.createRadialGradient(x0, y0, r0, x1, y1, r1);
//r:The radius of the start circle. Must be non-negative and finite.
grd.addColorStop(0, "red");
grd.addColorStop(1, "white");//x-axis position:0-1

// Fill with gradient
ctx.fillStyle = grd;
ctx.fillRect(10, 10, 150, 80);
/*
ctx.fillRect(0, 0, 150, 80);
This means: Start at the upper-left corner (0,0) and draw a 150x80 pixels rectangle.
*/

ctx.stroke();
```

The `**CanvasRenderingContext2D**`**.rotate()** method of the Canvas 2D API adds a rotation to the transformation matrix.

```j&#39;s
void ctx.rotate(angle);
```

- `angle`

  The rotation angle, clockwise in radians. You can use `*degree* * Math.PI / 180` if you want to calculate from a degree value.

The shape is a rectangle with its corner at (80, 60), a width of 140, a height of 30. Its horizontal center is at (80 + 140 / 2), or 150. Its vertical center is at (60 + 30 / 2), or 75. Thus, the center point is at (150, 75).

```js
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Non-rotated rectangle
ctx.fillStyle = 'gray';
ctx.fillRect(80, 60, 140, 30);

// Matrix transformation
ctx.translate(150, 75);
ctx.rotate(Math.PI / 2);
ctx.translate(-150, -75);

// Rotated rectangle
ctx.fillStyle = 'red';
ctx.fillRect(80, 60, 140, 30);
```

<http://howtodrawaclock.appspot.com/html/page1.html>