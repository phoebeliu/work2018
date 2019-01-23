# long word in select option

```html
<select type="text" >
                                                                    <option ng-repeat=" item in lalal" value="{{item.key}}" ng-class="{'bg-option': filterColoredOption(item)}" ng-selected="item.key ==a.b" title="{{item.value}}">{{item.value | limitTo:80}}</option>
                                                            </select>
```

add `title`to make whole words show when hover!

Add `limitTo`incase the option too long and can not control  by CSS!
