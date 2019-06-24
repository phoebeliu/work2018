# ng-option error

Binds the given expression to the value of `<option>` or [`input[radio\]`](https://code.angularjs.org/1.4.5/docs/api/ng/input/input[radio]), so that when the element is selected, the [`ngModel`](https://code.angularjs.org/1.4.5/docs/api/ng/directive/ngModel) of that element is set to the bound value.

`ngValue` is useful when dynamically generating lists of radio buttons using [`ngRepeat`](https://code.angularjs.org/1.4.5/docs/api/ng/directive/ngRepeat), as shown below.

Likewise, `ngValue` can be used to generate `<option>` elements for the [`select`](https://code.angularjs.org/1.4.5/docs/api/ng/directive/select) element. In that case however, only strings are supported for the `value`attribute, so the resulting `ngModel` will always be a string. Support for `select` models with non-string values is available via `ngOptions`.

> 这里明确说明了, select 的option value 只处理string，不能处理boolean.
>
> 如果你要处理 boolean 那么使用ng-option.
>
> Ng-option 里面循环动态数据，首先是报错$digest，加上`track by` 会好点。
>
> 其次是初始化的时候总会出现一个<option ? Boolean :false?>
>
> 即便用'ture' 'false'来赋值也是<option ? String :false?>
>
> 所以最后使用 `0 1 `代替true false.成功。
>
> 还有一种方法，把ng-option的数组固定，显示动态名称部分调用方法。也可
>
> `ng-options="(!opts ? 'No Coverage' : item.name) for opts in [false, true]"`

