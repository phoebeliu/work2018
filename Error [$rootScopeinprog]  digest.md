# Error: [$rootScope:inprog] http://errors.angularjs.org/1.4.5/$rootScope/inprog?p0=%24digest

```html
<div  mig-popup-datepicker time-zone="EDT" ng-model="quoteandbind.submission.draftData.periodStartDate" min-view="day" input-id="EffectiveDate" input-name="EffectiveDate" ng-change="effecitveDatePostOnChange()" ng-model-options="{ debounce: 500 }"></div>
```

Because everytime the model change will immediately trigger the ng-change function so the $digest error display.

After add `ng-model-options="{ debounce: 500 }"`the error will fix

