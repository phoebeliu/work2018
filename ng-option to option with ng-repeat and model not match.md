# ng-option to option with ng-repeat and model not match

```html

                                                                <select type="text" ng-model="classification.classDescription" ng-options="item.key as item.value for item in classDescriptionValues" ng-change="updateBopClassification()" ng-disabled="!classification.isClassDescriptionEditable">
//next one will go wrong
                                                                <select type="text" ng-model="classification.classDescription" ng-change="updateBopClassification()" ng-disabled="!classification.isClassDescriptionEditable">
                                                                    <option ng-repeat=" item in classDescriptionValues" value="{{item.key}}" ng-class="{'bg-option': filterColoredOption(item)}" ng-selected="item.key ==classification.classDescription">{{item.value}}</option>
                                                                </select>
```

在到处检测ng model 后发现值没变啊

后来watch 了ng -repeat的集合发现集合刷新了一遍……

于是option在刷新后就无法match ng-model了然而ng-option 可以

于是在option里hardcode了一个 ng-selected="value ==ngmodel"然后可以了

真是一个要命的问题。