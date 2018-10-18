# get value after angular filter

```html
 <div>
                q{{q.label}}
                <div class="control-label is-full"  ng-init="labels[$index]= $filter('translate')(q.label);test =(q.label | translate)" ng-if="RegExp('^[0-9]').test((q.label | translate))">{{q.label | translate}}</div>
                labels[$index]{{labels[$index]}}    <br> $filter('translate')(q.label){{ $filter('translate')(q.label)}}<br>
                test{{test}}
                <div gw-pl-ctrl-group label="{{q.label | translate}}" model="q" mdwrapper="true">
                    <textarea name="Answer_{{q.code}}_{{$index}}" ng-model="q.answer" aria-label="{{q.label | translate}}" md-no-autogrow="false" md-no-asterisk="false"></textarea>
                </div>
            </div>
```

这里不论在页面里如何折腾 q | translate 或（q | translate）或 $filter('translate')(q.label)

均不能实现，页面打出来的值均为空。

所以目前这个问题，只能在js里面完成。尚无HTML的解决方法。

且还有个诡异的事情，不知道页面里是如何处理的，因为无法打断点。

`!isNaN(parseInt(labels[$index].charAt(0))) `

`!isNaN(parseInt(labels[$index][0])) `

`*ng-init=*"labels[$index]=q.label | translate" *ng-if=*"labels[$index].match('/^\d/')" `

都一直显示TRUE，至今没明白为什么。页面输出这些值均为空。