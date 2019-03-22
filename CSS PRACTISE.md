- [Basic Style Guide](#basic-style-guide)
  - [Class names should utilize kebab-case](#class-names-should-utilize-kebab-case)
  - [Use a single blank line between sets of rules](#use-a-single-blank-line-between-sets-of-rules)
  - [Add a single space between the property and value](#add-a-single-space-between-the-property-and-value)
  - [Always include a semi-colon at the end of the last declaration](#always-include-a-semi-colon-at-the-end-of-the-last-declaration)
  - [Use shorthand if you can](#use-shorthand-if-you-can)
- [Special Tips](#special-tips)
  - [Create the hack for IE](#create-the-hack-for-ie)
  - [The main color example](#the-main-color-example)
  - [Write functional class name meaningful and clearly](#write-functional-class-name-meaningful-and-clearly)
  - [Add default value and make the correct condition in the mixin](#add-default-value-and-make-the-correct-condition-in-the-mixin)
  - [Comment as much as you can as often as you can](#comment-as-much-as-you-can-as-often-as-you-can)
  - [Make the z-index reasonable](#make-the-z-index-reasonable)

## Basic Style Guide

### Class names should utilize kebab-case

{+Do+}

```scss
.top-button
```

{-No Do-}

```scss
.top_button
.topButton
```

### Use a single blank line between sets of rules

{+Do+}

```scss
.hide {
  display: none !important; 
}

.invisible {
  visibility: hidden; 
}
```

{-No Do-}

```scss
.hide {
  display: none !important; 
}
.invisible {
  visibility: hidden; 
}
```

### Add a single space between the property and value

{+Do+}

```scss
border-left: 3px solid #eee;
```

{-No Do-}

```scss
border-left:3px solid #eee;
```

### Always include a semi-colon at the end of the last declaration

{+Do+}

```scss
.align-middle{
  align-items: center;
  -webkit-box-align:center;
  -ms-flex-align:center;
}
```

{-No Do-}

```scss
.align-middle{
  align-items: center;
  -webkit-box-align:center;
  -ms-flex-align:center
}
```

### Use shorthand if you can

{+Do+}

```scss
padding: 15px 0;
```

{-No Do-}

```scss
padding: 15px 0px 15px 0px; 
```

## Special Tips

### Create the hack for IE

> Reason: Most time the style will be no different between IE and Chrome. But there are some defects about IE itself will make page layout mass up. So if you need to wirte hack please use the media which will include IE 9/10/11.

{+Do+} : 

```scss
@media screen and (min-width:0\0) { /* IE9 , IE10 ,IE11 rule sets go here */
    md-checkbox {
        border-collapse: separate;
    }
}
```

### The main color example

> Reason: There are some main color use in the project. Sometime we use name instead of color code. And all the color have keep as variable in the _base.scss.

{+SpecialTips+}

```scss
$navy-blue: #00274d;
$ocean-blue: #006eb6;
$aqua-blue: #00b5e2;
$greyblue: #6a8197;
$light-blue: #f7fbfd;
$bluey-grey-86: rgba(139, 157, 174, 0.86);
$light-blue-grey: #d6e8f4;
$light-blue-grey-two: #bcd1e0;
$light-blue-grey-three: #ccdce6;
$very-light-purple:#fdf2f3;
```

### Write functional class name meaningful and clearly	

{+Do+}

```scss
.pdr-0{
  padding-right: 0!important;
}
```

{-No Do-}

```scss
.pd0{
  padding-right: 0!important;
}
```

### Add default value and make the correct condition in the mixin

{+Do+} : Assign the default value 0 and in the if condition include default

```scss
@mixin mig-button($type:primary, $width:0) {
  //...
  @if $width >= 0px {
    display:block;
  } @else {
    @include inline-block;
  }
```

### Comment as much as you can as often as you can

> Reason: This is especially true for responsive layouts where percentage width/margin's have been worked out. Always comment in the ratio so that the resulting % values mean something to the next developer viewing your CSS. A random 6dp percentage will mean nothing to anyone else looking at your code.

{+Do+}

```scss
@media screen and(max-width: 1023px)and (min-width: 768px){
    margin-left:257px;//212 side bar width + 45padding
}
```

### Make the z-index reasonable

> Reason: Alway care about the z-index value. Don't make them too large with no reason but only you want them large. In the system the fix nav header only have the z-index value 10.

{+Do+}

```scss
z-index: 10;
```

{-No Do-}

```scss
z-index: 999;
```

