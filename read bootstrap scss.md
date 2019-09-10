# read bootstrap scss

i want to add utilities like bootstrap in project.

so i think may be add the utilities part in just fine.

and when i read the actual code in bootstrap i lost.

https://github.com/twbs/bootstrap/blob/master/scss/_utilities.scss

there is just a lot of map.

```scss
// Utilities

$utilities: () !default;
// stylelint-disable-next-line scss/dollar-variable-default
$utilities: map-merge(
  (
    "align": (
      property: vertical-align,
      class: align,
      values: baseline top middle bottom text-bottom text-top
    ),
    "float": (
      responsive: true,
      property: float,
      values: left right none
    ),
    "overflow": (
      property: overflow,
      values: auto hidden,
    ),
    ...
```

then i look out mixin 

https://github.com/twbs/bootstrap/blob/master/scss/mixins/_utilities.scss

```scss
// Utility generator
// Used to generate utilities & print utilities
@mixin generate-utility($utility, $infix) {
  $values: map-get($utility, values);

  // If the values are a list or string, convert it into a map
  @if type-of($values) == "string" or type-of(nth($values, 1)) != "list" {
    $values: zip($values, $values);
  }

  @each $key, $value in $values {
    $properties: map-get($utility, property);

    // Multiple properties are possible, for example with vertical or horizontal margins or paddings
    @if type-of($properties) == "string" {
      $properties: append((), $properties);
    }
...
```

Ok ... but where to include?and what is $infix?!

so i down load the whole scss fold and find out it is in api.scss

https://github.com/twbs/bootstrap/blob/master/scss/utilities/_api.scss

```scss
// Loop over each breakpoint
@each $breakpoint in map-keys($grid-breakpoints) {

  // Generate media query if needed
  @include media-breakpoint-up($breakpoint) {
    $infix: breakpoint-infix($breakpoint, $grid-breakpoints);

    // Loop over each utility property
    @each $key, $utility in $utilities {
      // The utility can be disabled with `false`, thus check if the utility is a map first
      // Only proceed if responsive media queries are enabled or if it's the base media query
      @if type-of($utility) == "map" and (map-get($utility, responsive) or $infix == "") {
        @include generate-utility($utility, $infix);
      }
    }
  }
}
...
```

Ok...so there it is, and they need add breakpoint too.

So i find grid-breakpoints, Which is a map.

and there are a lot in the breakpoints.scss

......

so i know bootstrap really make css into functional scss with a lot of function and data in it.

respect!!!

i decide to add what i need in project not like bootstrap which need a lot of effort.

but next project i will use bootstrap way to do css!!!!!

