# hr be relative and after be absolute, after can not see

```scss
hr {
    border-color: #eee;
    border-style: solid none;
    border-width: 1px 0;
    margin: 18px 0;
    position: relative;
    &:after{
    content: '';
    display: block;
    position: absolute;
    left:0;
    height:2px;
    width: calc(100% + 15px) ;
    background-color: $white-two;
    }
}
//after can not see in the page.
//because !hr don't have enough height!
```

in general, if you use `position:absolute` please make sure the elements, which is `relative have the height`.

