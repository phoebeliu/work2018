# circle from 0 to 360 css

https://css-tricks.com/css-pie-timer/

```h
<div class="loader-animation inline-block">
                    <div class="mask"></div>
                </div>
```

```scss
@mixin timer($item, $duration, $size, $color, $border, $hover: running) {
  #{$item}, #{$item} * { @include box-sizing(border-box); }

  #{$item} {
    width: $size;
    height: $size;
  }

  #{$item}:before,#{$item}:after {
    @include box-sizing(border-box);
    display: block;
    content: '';
    width: 50%;
    height: 100%;
    transform-origin: 100% 50%;
    position: absolute;
    background: $color;
    border: #{$border};
  }

  #{$item}:before {
    border-radius: 100% 0 0 100% / 50% 0 0 50%;
    z-index: 200;
    border-right: none;
    animation: rota $duration + s linear infinite;
  }

  #{$item}:hover :before,
  #{$item}:hover :after,
  #{$item}:hover .mask {
    animation-play-state: $hover;
  }

  #{$item}:after {
    border-radius: 0 100% 100% 0 / 0 50% 50% 0;
    left: 50%;
    opacity: 0;
    z-index: 100;
    animation: opa $duration + s steps(1,end) infinite reverse;
    border-left: none;
  }

  #{$item} .mask {
    width: 50%;
    height: 100%;
    position: absolute;
    background: inherit;
    opacity: 1;
    z-index: 300;
    animation: opa $duration + s steps(1,end) infinite;
  }

  @keyframes rota {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  @keyframes opa {
    0% { opacity: 1; }
    50%, 100% { opacity: 0; }
  }
}

/* loader-animation */
    .loader-animation {
      position: relative;
      display: block;
      width: 22px;
      height: 22px;
      background-color: $white;
    }
    @include timer('.loader-animation', 3, 22px, $white, '4px solid #43beac');

```

So the animation looks like this:

- **T0** - the spinner is on the left, hidden by the mask. The filler is hidden.
- **T1** - the spinner starts rotating clockwise, and slowly appears from behind the mask.
- **T2** - the spinner has gone 360/10*2 = 72° and keeps rotating.
- **T3** - the spinner has gone 360/10*3 = 108° and keeps rotating.
- **T4** - the spinner has gone 360/10*4 = 144° and keeps rotating.
- **T5** - the spinner has gone 360/10*5 = 180° and keeps rotating. At this very moment, the filler instantly goes at 100% opacity while the mask goes disappears.
- **T6** - the spinner has gone 360/10*6 = 216° and keeps rotating.
- **T7** - the spinner has gone 360/10*7 = 252° and keeps rotating.
- **T8** - the spinner has gone 360/10*8 = 288° and keeps rotating.
- **T9** - the spinner has gone 360/10*9 = 324° and keeps rotating.
- **T10** - the spinner has gone 360°, getting back to its starting point. Then we restart the animation. The mask goes at 100% opacity while the filler goes disappears.

