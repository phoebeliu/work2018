# Using position: relative in a table cell is not defined

https://stackoverflow.com/questions/17526370/position-relative-not-working-with-display-table-cell/17527089

The CSS specification at W3.org says that the effect of `position: relative` is undefined for table-cell and other table elements.

See: http://www.w3.org/TR/CSS21/visuren.html#choose-position for more details.

As a result, some browsers seem to allow table cells to behave like a containing block for any absolutely positioned child elements within the table cell (see http://www.w3.org/TR/CSS21/visuren.html#comp-abspos for more details). However, some browser do not try to extend the specification and disregard `position: relative` when applied to table cells.

You are seeing normal behavior for a compliant browser, but for behaviors not defined by the CSS specification, browsers are free to do or not to do what they please, so results will vary.

## How to Work Around This

What I do for these situations, I place a block level wrapper element within the cell that has absolute positioning (I set the offsets so that the wrapper fills the table cell), and then absolutely position my inner child elements with respect to the wrapper.

## Making Buttons Scale both in Width and Height

The following CSS will allow the button element to fill up the width and height of the table cell: