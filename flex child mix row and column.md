# flex child mix row and column

https://css-tricks.com/snippets/css/a-guide-to-flexbox/

first--->direction

```css
.container {
  flex-direction: row | row-reverse | column | column-reverse;
}
```

second--->wrap

```css
.container{
  flex-wrap: nowrap | wrap | wrap-reverse;
}
```

- `nowrap` (default): all flex items will be on one line
- `wrap`: flex items will wrap onto multiple lines, from top to bottom.
- `wrap-reverse`: flex items will wrap onto multiple lines from bottom to top.

Third ---->basis

```css
.item {
  flex-basis: <length> | auto; /* default auto */
}
```

>
>
>don't forget clear your content's padding !!!!