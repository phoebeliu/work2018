# **white-space**

后台数据，有时传回的是带折行的，然后呢我们放在一行里，于是就出现需求要折行的问题。

用了pre tag 包起来，但是呢发现上下的空白特别大，于是看了下浏览器是特定 

```css
pre, xmp, plaintext, listing {
    display: block;
    font-family: monospace;
    white-space: pre;--->这里
    margin: 1em 0px;
}
```

|            | New lines | Spaces and tabs | Text wrapping |
| ---------- | --------- | --------------- | ------------- |
| `normal`   | Collapse  | Collapse        | Wrap          |
| `nowrap`   | Collapse  | Collapse        | No wrap       |
| `pre`      | Preserve  | Preserve        | No wrap       |
| `pre-wrap` | Preserve  | Preserve        | Wrap          |
| `pre-line` | Preserve  | Collapse        | Wrap          |

最后改为 white-space: pre-line;上下空白缩小。