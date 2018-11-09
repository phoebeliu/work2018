# 6 Methods For Vertical Centering With CSS

http://vanseodesign.com/css/vertical-centering/

Centering elements vertically with css is something that often gives designers trouble. There are however a variety of methods for vertical centering and each is fairly easy to use. Today I want to present 6 of those methods.
I’ve usually skipped over the topic of vertical centering, since there are some good posts already out there that are easy enough to find, but recently [Bikram commented](https://www.vanseodesign.com/css/2-column-layout-code/#div-comment-124165)requesting a tutorial on vertically centering so I thought why not.

You can view demos of each of the methods below by [clicking here](https://vanseodesign.com/blog/demo/vertical-centering/line-height.php). Clicking the images above each section will also take you to that specific demo.

Let’s start by first talking about something that doesn’t work as many expect. [Understanding vertical-align](http://christopheraue.net/2014/03/05/vertical-align/) and why it doesn’t always work will help us better understand vertical centering in general.

## Vertical-Align

[Horizontal centering with css](https://www.vanseodesign.com/css/centering-with-css/) is rather easy. When the element to be centered is an inline element we use text-align center on its parent. When the element is a block level element we give it a width and set the left and right margins to a value of auto.

With text-align: center in mind, most people look first to [vertical-align](http://www.w3.org/TR/CSS2/visudet.html#propdef-vertical-align) in order to center things vertically. It seems logical and I know it was my first choice. If you’ve come from table based layout you likely used the valign attribute, which would also lead you to believe vertical-align is the way to go.

However valign only worked on table cells. Vertical-align is similar. It also applies to table cells and it works with some inline elements.

The values for vertical-align have meaning with respect to a parent inline element.

- With a line of text the values are relative to the line-height.
- With a table cell the values are relative to the [table-height-algorithm](http://www.w3.org/TR/CSS2/tables.html#height-layout), which usually means the height of the row.

Unfortunately [vertical-align](http://css-tricks.com/2597-what-is-vertical-align/) doesn’t apply to block-level elements like a paragraph inside a div, which is where most of us figure out it isn’t the be all solution to vertical centering.

All is not lost though, as we have other methods for centering block level elements and we can still use vertical-align where appropriate. Which method you choose will depend on what you’re trying to center relative to its container element.

[![line height demo](https://www.vanseodesign.com/blog/wp-content/uploads/2011/07/line-height.png)](https://vanseodesign.com/blog/demo/vertical-centering/line-height.php)

## Line-Height Method

This method will work when you want to vertically center a single line of text. All we need to do is set a line-height on the element containing the text larger than its font-size.

By default equal space will be given above and below the text and so the text will sit in the vertical center.

Most tutorials will also set the height on the element with the same value given to the [line-height](https://www.vanseodesign.com/css/thoughts-on-building-a-typographic-stylesheet/). I don’t think setting the height is necessary, but if line-height alone doesn’t work for you setting the height of the element will likely be the solution.

### html

|      | `<div id="parent">`                   |
| ---- | ------------------------------------- |
|      | `    <div id="child">Text here</div>` |
|      | `</div>`                              |

### css

|      | `#child {`                |
| ---- | ------------------------- |
|      | `    line-height: 200px;` |
|      | `}`                       |

The above works in all browsers, however it will only work for a single line of text. If your text could wrap to a 2nd line you need to use a different method. The value of 200px above is arbitrary. You can use any value you want as long as its larger than the font-size that’s been set.

**Added:** As Jeff pointed out in the comments below, there’s one small got’cha with this method in that you have to be careful when using the shortcut for the font property. This method relies on you setting the line-height as a value greater than the font-size. When you use the font shortcut any property you don’t specifically set gets set to its default value. With line-height that default is 1. If you use the font shortcut, just make sure to explicitly set the line-height inside.

### Centering an Image with Line-Height

What if the content you want centered is an image? Will this method work? The answer is yes with one additional line of css.

### html

|      | `<div id="parent">`                  |
| ---- | ------------------------------------ |
|      | `    <img src="image.png" alt="" />` |
|      | `</div>`                             |

### css

|      | `#parent {`                   |
| ---- | ----------------------------- |
|      | `    line-height: 200px;`     |
|      | `}`                           |
|      | ``                            |
|      | `#parent img {`               |
|      | `    vertical-align: middle;` |
|      | `}`                           |

You set the line-height as we did above (It’ll need to be greater than the height of the image) and then set vertical-align: middle on the image.

[![table cell demo](https://www.vanseodesign.com/blog/wp-content/uploads/2011/07/table-cell.png)](https://vanseodesign.com/blog/demo/vertical-centering/table-cell.php)

## CSS Table Method

Above I mentioned that vertical-align applies to table cells which leads us to this method. We’ll display our elements as table and table cell and then use the vertical-align property to center the content.

**Note:** CSS tables are not the same as [html tables](https://www.vanseodesign.com/css/css-divs-vs-tables/).

### html

|      | `<div id="parent">`                      |
| ---- | ---------------------------------------- |
|      | `    <div id="child">Content here</div>` |
|      | `</div>`                                 |

### css

|      | `#parent {display: table;}`   |
| ---- | ----------------------------- |
|      | ``                            |
|      | `#child {`                    |
|      | `    display: table-cell;`    |
|      | `    vertical-align: middle;` |
|      | `}`                           |

We set the parent div to display as a table and the child div to display as a table-cell. We can then use vertical-align on the child div and set its value to middle. Anything inside this child div will be vertically centered.

Unlike the method above the content can be dynamic as the div will grow with what’s placed inside. The downside of this method is it doesn’t work in older versions of IE, though there is a fix, which is to add display: inline-block to the child element.

|      | `#child {`                   |
| ---- | ---------------------------- |
|      | `    display: inline-block;` |
|      | `}`                          |

- [Flexible height vertical centering with CSS, beyond IE7](http://www.456bereastreet.com/archive/201103/flexible_height_vertical_centering_with_css_beyond_ie7/)
- [CSS Vertical Centering](http://www.brunildo.org/test/vertmiddle.html)

[![absolute positioning and negative margin demo](https://www.vanseodesign.com/blog/wp-content/uploads/2011/07/positioning-margin.png)](https://vanseodesign.com/blog/demo/vertical-centering/positioning-margins.php)

## Absolute Positioning and Negative Margin

This method works for block level elements and also works in all browsers. It does require that we set the height of the element we want to center.

In the code below I’m centering the child both vertically and horizontally using this method.

### html

|      | `<div id="parent">`                      |
| ---- | ---------------------------------------- |
|      | `    <div id="child">Content here</div>` |
|      | `</div>`                                 |

### css

|      | `#parent {position: relative;}` |
| ---- | ------------------------------- |
|      | ``                              |
|      | `#child {`                      |
|      | `    position: absolute;`       |
|      | `    top: 50%;`                 |
|      | `    left: 50%;`                |
|      | `    height: 30%;`              |
|      | `    width: 50%;`               |
|      | `    margin: -15% 0 0 -25%;`    |
|      | `}`                             |

We begin by [positioning](https://www.vanseodesign.com/css/css-positioning/) both parent and child divs. Next we set the top and left values of the child to be 50% each, which would be the center of the parent. However this sets the top left corner to be in the center so we’re not done.

We need to move the child up (by half its height) and to the left (by half its width) so its center is what sits in the center of the parent element. This is why we need to know the height (and here the width) of the child element.

To do that we give the element a negative top and left margin equal to half its height and width.

Unlike the first 2 methods this one is meant for block level elements. It does work in all browsers, however the content can outgrow its container in which case it will disappear visually. It’ll work best when you know the heights and widths of the elements.

- [A demo using this method to center a block of text in the browser](http://www.wpdfd.com/editorial/thebox/deadcentre3.html)

[![absolute positioning and vertical stretching demo](https://www.vanseodesign.com/blog/wp-content/uploads/2011/07/positioning-stretch.png)](https://vanseodesign.com/blog/demo/vertical-centering/positioning-stretch.php)

## Absolute Positioning and Stretching

As with the method above this one begins by setting positioning on the parent and child elements as relative and absolute respectively. From there things differ.

In the code below I’ve once again used this method to center the child both horizontally and vertically, though you can use the method for vertical centering only.

### html

|      | `<div id="parent">`                      |
| ---- | ---------------------------------------- |
|      | `    <div id="child">Content here</div>` |
|      | `</div>`                                 |

### css

|      | `#parent {position: relative;}` |
| ---- | ------------------------------- |
|      | ``                              |
|      | `#child {`                      |
|      | `    position: absolute;`       |
|      | `    top: 0;`                   |
|      | `    bottom: 0;`                |
|      | `    left: 0;`                  |
|      | `    right: 0;`                 |
|      | `    width: 50%;`               |
|      | `    height: 30%;`              |
|      | `    margin: auto;`             |
|      | `}`                             |

The idea with this method is to try to get the child element to stretch to all 4 edges by setting the top, bottom, right, and left vales to 0. Because our child element is smaller than our parent elements it can’t reach all 4 edges.

Setting auto as the margin on all 4 sides however causes opposite margins to be equal and displays our child div in the center of the parent div.

Unfortunately the above won’t work in IE7 and below and like the previous method the content inside the child div can grow too large causing it to be hidden.

[![vertical centering with padding demo](https://www.vanseodesign.com/blog/wp-content/uploads/2011/07/padding.png)](https://vanseodesign.com/blog/demo/vertical-centering/padding.php)

## Equal Top and Bottom Padding

In the method above we allowed the browser to automatically set the margins of the child element so they would be equal. In this method we’ll do something similar and explicitly set the top and bottom padding of the parent to be equal.

### html

|      | `<div id="parent">`                      |
| ---- | ---------------------------------------- |
|      | `    <div id="child">Content here</div>` |
|      | `</div>`                                 |

### css

|      | `#parent {`           |
| ---- | --------------------- |
|      | `    padding: 5% 0;`  |
|      | `}`                   |
|      | ``                    |
|      | `#child {`            |
|      | `    padding: 10% 0;` |
|      | `}`                   |

In the css above I’ve set top and bottom paddings on both elements. Setting it on the child will make sure the contents in the child will be vertically centered and setting it on the parent ensures the entire child is centered within the parent.

I’m using [relative measurements](https://www.vanseodesign.com/css/fluid-layout-code/) to allow each div to grow dynamically. If one of the elements or its content needs to be set with an absolute measurement then you’ll need to do some math to make sure things add up.

For example if the parent was 400px in height and the child 100px in height we’d need 150px of padding on both the top and bottom.

150 + 150 + 100 = 400

Using % could throw things off in this case unless our % values corresponded to exactly 150px.

This method works anywhere. The downside is that depending on the specifics of your project you may need to do a little math. However if you’re falling in line with the idea of [developing flexible layouts](https://www.vanseodesign.com/css/elastic-layout-code/) where your measurements are all relative you can avoid the math.

**Note:** This method works by setting paddings on the outer elements. You can flip things and instead set equal margins on the inner elements. I tend to use padding, but I’ve also used margins with success. Which you choose would depend on the specifics of your project.

[![vertical centering with floater div demo](https://www.vanseodesign.com/blog/wp-content/uploads/2011/07/floater-div.png)](https://vanseodesign.com/blog/demo/vertical-centering/floater.php)

## Floater Div

This last method requires an empty div which is [floated](https://www.vanseodesign.com/css/understanding-css-floats/) and used to control where our child element sits in the document flow. Notice the floater div comes before our child div in the html below.

### html

|      | `<div id="parent">`                      |
| ---- | ---------------------------------------- |
|      | `    <div id="floater"></div>`           |
|      | `    <div id="child">Content here</div>` |
|      | `</div>`                                 |

### css

|      | `#parent {height: 250px;}`  |
| ---- | --------------------------- |
|      | ``                          |
|      | `#floater {`                |
|      | `    float: left;`          |
|      | `    height: 50%;`          |
|      | `    width: 100%;`          |
|      | `    margin-bottom: -50px;` |
|      | `}`                         |
|      | ``                          |
|      | `#child {`                  |
|      | `    clear: both;`          |
|      | `    height: 100px;`        |
|      | `}`                         |

We float the empty div to the left (or right) and give it a height of 50% of the parent div. That causes it to fill up the entire upper half of the parent element.

Because this div is floated it’s removed from the normal document flow so we need to clear the child element. Here I’ve used clear: both, but you just need to clear in the same direction you floated the empty floater div.

The top edge of the child div should now be immediately below the bottom edge of the floater div. We need to bring the child element up by an amount equal to half its height and to do so we set a negative margin-bottom on the floater div.

This method also works across browsers. The downside is that it requires an empty div and that you know the height of the child element.

- [How To Center Content Vertically Using CSS](http://cranesandskyhooks.com/articles/center-content-vertically-with-css/)

## Additional Resources

In the sections above I linked to articles specific to each method. Below are some resources that cover more than a single method for centering.

- [Vertical Centering With CSS](http://blog.themeforest.net/tutorials/vertical-centering-with-css/) — covers all the methods above except for the padding method
- [Two Simple Ways to Vertically Align with CSS](http://www.sohtanaka.com/web-design/vertical-alignment-css/) — Covers absolute positioning and negative margins and the line height methods
- [Vertical centering using CSS](http://www.student.oulu.fi/~laurirai/www/css/middle/) — Covers all methods except the floater div method and adds a few more.
- [CSS tests and experiments](http://www.brunildo.org/test/) — Contains a variety of css experiments. Search the page for the word vertical and you’ll find several vertical centering experiments, including the 2 links below.
- [Centering (horizontally and vertically) an image in a box](http://www.brunildo.org/test/img_center.html)
- [Shrink-wrap and Center](http://www.brunildo.org/test/shrink_center_5.html)
- 

## Summary

None of the methods above is complicated and I’m sure if you use each once or twice it’ll be easy to use again.

The difficultly if there is one is that none of the methods above is perfect for all occasions. The trick is to understand several of the above and use each appropriately.

Some of the methods work better for inline elements and others work better for block level elements. Some might work better with your preference for developing a layout and some don’t work in older versions of a certain browser we all know well.

Rarely do I vertically center elements in a design. When I do the methods I tend to use are the line-height method and the equal padding method. One or the other has always worked for my needs.

If neither worked I would reach for either the positioning or floater methods and save the table cell method as a last resort. In time we’ll be able to use the [css3 flexible box layout module](http://www.w3.org/TR/css3-flexbox/) and forget about the methods above, but for now browser support isn’t quite there.

Do you use any of the above methods or do you use a different method I didn’t mention? Is there a vertical centering issue that none of the methods here address?