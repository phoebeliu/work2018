# Multiple-column layout

https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Multiple-column_Layout

```css
.container {
  column-width: 200px;
  column-gap: 20px;
}
.container {
  column-count: 3;
  column-gap: 20px;
  column-rule: 4px dotted rgb(79, 185, 227);
}
.container {
  column-width: 250px;
  column-gap: 20px;
}

.card {
  background-color: rgb(207, 232, 220);
  border: 2px solid rgb(79, 185, 227);
  padding: 10px;
  margin: 0 0 1em 0;
    /*control breaking of content in multicol and in paged media. */
    break-inside: avoid;
  page-break-inside: avoid;
}
```

除了Firefox需要加-moz- qq和baidu浏览器也是，

以外都支持了。

我只能说CSS越发可怕了。