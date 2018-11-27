# [Equal height columns with CSS](https://stackoverflow.com/questions/33813871/equal-height-columns-with-css)



https://stackoverflow.com/questions/33813871/equal-height-columns-with-css/33815389#33815389



Father div 

```css
display: -webkit-flex;
display: -ms-flexbox;
display: flex;
-webkit-flex-flow: row wrap;
-ms-flex-flow: row wrap;
flex-flow: row wrap;
```
Child div

nothing



https://stackoverflow.com/questions/19695784/how-can-i-make-bootstrap-columns-all-the-same-height

**Solution 1 using negative margins (doesn't break responsiveness)**

[Demo](http://jsfiddle.net/nV3Ua/1195/)

```css
.row{
    overflow: hidden; 
}

[class*="col-"]{
    margin-bottom: -99999px;
    padding-bottom: 99999px;
}
```

**Solution 2 using table**

[Demo](http://jsfiddle.net/nV3Ua/1192/)

```css
.row {
    display: table;
}

[class*="col-"] {
    float: none;
    display: table-cell;
    vertical-align: top;
}
```

**Solution 3 using flex** added August 2015. Comments posted before this don't apply to this solution.

[Demo](http://jsfiddle.net/nV3Ua/1821/)

```css
.row {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display:         flex;
  flex-wrap: wrap;
}
.row > [class*='col-'] {
  display: flex;
  flex-direction: column;
}
```

**Best approach for Bootstap 3.x** -- using CSS **flexbox** (and requires minimal CSS)..

```
.equal {
  display: flex;
  display: -webkit-flex;
  flex-wrap: wrap;
}
```

[Bootstrap same height flexbox example](http://bootply.com/127827)

To only apply the same height flexbox at specific breakpoints (responsive), use a media query. For example, here is `sm`(768px) and up:

```
@media (min-width: 768px) {
  .row.equal {
    display: flex;
    flex-wrap: wrap;
  }
}
```

This solution also works well for multiple rows (column wrapping):
<https://www.bootply.com/gCEXzPMehZ>

**Other workarounds**

These options will be recommended by others, but [**are not a good idea**](https://medium.com/@bootply/bootstrap-equal-height-columns-d07bc934eb27) for responsive design. These only work for simple single row layouts w/o column wrapping.

1) Using [**huge negative margins & padding**](http://www.bootply.com/6mwUqfimQN)

2) Using [**display:table-cell**](http://www.codeply.com/go/GDZz7SjPwd) (this solution also effects the responsive grid, so a @media query can be used to only apply `table` display on wider screens before the columns stack vertically)



------



## **Bootstrap 4**

Flexbox is now used by default in Bootstrap 4 so there is no need for the extra CSS to make equal height columns: <http://www.codeply.com/go/IJYRI4LPwU>

