## &--large

<https://css-tricks.com/the-sass-ampersand/>

Even though you can't have two ampersands touching without the interpolation brackets — as we demoed earlier in our pseudo class example — you can have another selector touch the ampersand. Touching the ampersand works well with modifier classes.

```scss
.btn {
  &-primary {}
  &-secondary {}
}
```

Compiled CSS:

```css
.btn-primary {}
.btn-secondary {}
```

This can be quite useful if employing a naming methodology (i.e. BEM) which uses dash and underscore combinated classes rather than combined selectors.

