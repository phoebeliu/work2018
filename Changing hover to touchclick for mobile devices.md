# [Changing :hover to touch/click for mobile devices](https://stackoverflow.com/questions/22559756/changing-hover-to-touch-click-for-mobile-devices)

If you use :active selector in combination with :hover you can achieve this according to [**w3schools**](http://www.w3schools.com/cssref/sel_active.asp)as long as the :active selector is called after the :hover selector.

```
 .info-slide:hover, .info-slide:active{
   height:300px;
 }
```

You'd have to test the [**FIDDLE**](http://jsfiddle.net/3p6Kz/2/) in a mobile environment. I can't at the moment. 
**correction** - I just tested in a mobile, it works fine

w3schools is not the best resource, therefore I'd loke to cite [developer.mozilla.org/en-US/docs/Web/CSS/%3Aactive](https://developer.mozilla.org/en-US/docs/Web/CSS/%3Aactive) – [23tux](https://stackoverflow.com/users/228370/23tux) [Oct 24 '15 at 11:12](https://stackoverflow.com/questions/22559756/changing-hover-to-touch-click-for-mobile-devices#comment54433015_22560108)