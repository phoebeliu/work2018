# Color Functions



https://sass-lang.com/documentation/functions/color

```scss
darken($color, $amount) //=> color 
```

Makes `$color` darker.

The `$amount` must be a number between `0%` and `100%` (inclusive). Decreases the HSL lightness of `$color` by that amount.

### ⚠️ Heads up!

The `darken()` function decreases lightness by a fixed amount, which is often not the desired effect. To make a color a certain percentage darker than it was before, use [`scale-color()`](https://sass-lang.com/documentation/functions/color#scale-color) instead.

- [SCSS](https://sass-lang.com/documentation/functions/color#example-7-scss)
- [Sass](https://sass-lang.com/documentation/functions/color#example-7-sass)

### SCSS SYNTAX

```scss
// #036 has lightness 20%, so when darken() subtracts 30% it just returns black.
@debug darken(#036, 30%); // black

// scale-color() instead makes it 30% darker than it was originally.
@debug scale-color(#036, $lightness: -30%); // #002447
```

- [SCSS](https://sass-lang.com/documentation/functions/color#example-8-scss)
- [Sass](https://sass-lang.com/documentation/functions/color#example-8-sass)

### SCSS SYNTAX

```scss
// Lightness 92% becomes 72%.
@debug darken(#b37399, 20%); // #7c4465

// Lightness 85% becomes 45%.
@debug darken(#f2ece4, 40%); // #b08b5a

// Lightness 20% becomes 0%.
@debug darken(#036, 30%); // black
```

```scss
lighten($color, $amount) //=> color 
```

Makes `$color` lighter.

The `$amount` must be a number between `0%` and `100%` (inclusive). Increases the HSL lightness of `$color` by that amount.

### ⚠️ Heads up!

The `lighten()` function increases lightness by a fixed amount, which is often not the desired effect. To make a color a certain percentage lighter than it was before, use [`scale-color()`](https://sass-lang.com/documentation/functions/color#scale-color) instead.

- [SCSS](https://sass-lang.com/documentation/functions/color#example-18-scss)
- [Sass](https://sass-lang.com/documentation/functions/color#example-18-sass)

### SCSS SYNTAX

```scss
// #e1d7d2 has lightness 85%, so when lighten() adds 30% it just returns white.
@debug lighten(#e1d7d2, 30%); // white

// scale-color() instead makes it 30% lighter than it was originally.
@debug scale-color(#e1d7d2, $lightness: 30%); // #eae3e0
```

- [SCSS](https://sass-lang.com/documentation/functions/color#example-19-scss)
- [Sass](https://sass-lang.com/documentation/functions/color#example-19-sass)

### SCSS SYNTAX

```scss
// Lightness 46% becomes 66%.
@debug lighten(#6b717f, 20%); // #a1a5af

// Lightness 20% becomes 80%.
@debug lighten(#036, 60%); // #99ccff

// Lightness 85% becomes 100%.
@debug lighten(#e1d7d2, 30%); // white
```