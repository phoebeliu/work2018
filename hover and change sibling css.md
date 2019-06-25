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

