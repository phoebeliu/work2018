# Multiple definitions of a property not allowed in strict mode

```js
'aaa': {
					diffPath: ['Locations']
					//appendStateLabelToPath: true
				},
                'aaa': {
                    diffPath: ['Locations']
                    //appendStateLabelToPath: true
                },
```

IE 诡异事件

有一个页面出不来，console里只有这条报错，然后看是有地方写重复了。

然后呢有的页面刷出来，有的页面刷不出来。

我就纳闷了

也不报错，除了这个原始错误。

到现在我也不懂为什么……