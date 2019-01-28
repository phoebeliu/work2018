## center aligning a fixed position div
```
You can use margin: 0 auto with position: fixed if you set left and right.

.wrapper {
    position:fixed;
    top: 0;
    left: 0;
    right: 0;
    width: 500px;
    margin: 0 auto;
}
This also works with position: absolute; and vertically.
