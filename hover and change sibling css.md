# hover and change sibling css

https://jsfiddle.net/ThinkingStiff/dWHzF/

```html
<b>sibling method:</b>
<div>
    <div class="sibling-hover">hover over me</div>
    <div>I do nothing</div>
    <div>I do nothing</div>
    <div class="sibling-highlight">I get highlighted</div>
</div>

<b>child method:</b>
<div id="parent">
    <div>hover over me</div>
    <div>hover over me</div>
    <div>hover over me</div>
    <div class="parent-highlight">I get highlighted</div>
</div>

```

```css
.sibling-hover, #parent {
    cursor: pointer;
}
.sibling-hover:hover ~ .sibling-highlight {
    background-color: red;
    color: white;
}
#parent:hover .parent-highlight {
    background-color: red;
    color: white;
}

```

https://stackoverflow.com/questions/6910049/on-a-css-hover-event-can-i-change-another-divs-styling

Yes, you can do that, but only if `#b` is after `#a` in the HTML.

If `#b` comes immediately after `#a`: [http://jsfiddle.net/u7tYE/](http://jsfiddle.net/u7tYE/)

```css
#a:hover + #b {
    background: #ccc
}

<div id="a">Div A</div>
<div id="b">Div B</div>
```

That's using the [adjacent sibling combinator](http://reference.sitepoint.com/css/adjacentsiblingselector) (`+`).

If there are other elements between `#a` and `#b`, you can use this: [http://jsfiddle.net/u7tYE/1/](http://jsfiddle.net/u7tYE/1/)

```css
#a:hover ~ #b {
    background: #ccc
}

<div id="a">Div A</div>
<div>random other elements</div>
<div>random other elements</div>
<div>random other elements</div>
<div id="b">Div B</div>
```

That's using the [general sibling combinator](http://reference.sitepoint.com/css/generalsiblingselector) (`~`).

Both `+` and `~` work in all modern browsers and IE7+

If `#b` is a descendant of `#a`, you can simply use `#a:hover #b`.

ALTERNATIVE: You can use pure CSS to do this by positioning the second element before the first. The first div is first in markup, but positioned to the right or below the second. It will work as if it were a previous sibling.

```html
<td class="large tooltip-for-below">
                       
                        <a  class="nbs-link--darker block"
                           href="{{item.xCenterDownloadURI}}"
                           target="_blank">
                            <i class="fa fa-file"/>
                            <span> {{item.name}}</span>
                        </a>
                        <div class="link-wrapper">
                            <a href="" class="nbs-link" target="_blank">{{item.name}}</a>
                     
                        </div>
                    </td>
```

```scss
td{
	&:hover{
		a.nbs-link--darker:hover ~ .link-wrapper{
			display: block;
			@include opacity(1);
		}
		.link-wrapper{
			&:hover{
				display: block;
				@include opacity(1);
			}
		}
	}
}
```

