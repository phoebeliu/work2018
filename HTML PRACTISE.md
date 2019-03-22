* [Style Guide](#style-guide)
  * [Element names should utilize kebab-case](#element-names-should-utilize-kebab-case)
  * [Element attributes should utilize kebab-case](#element-attributes-should-utilize-kebab-case)
* [Angular Templates](#angular-templates)
  * [Choose the correct method to show/hide information to the screen](#choose-the-correct-method-to-showhide-information-to-the-screen)
  * [Add click events to parent elements to support IE](#add-click-events-to-parent-elements-to-support-ie)
  * [Apply 'clear fix' to parent elements with floating children](#apply-clear-fix-to-parent-elements-with-floating-children)
  * [Avoid using functions within ngIf/ngShow/ngHide/ngSwitch/ngRepeat due to performance cost.](#avoid-using-functions-within-ngifngshownghidengswitchngrepeat-due-to-performance-cost)
  * [Avoid allowing a null value for the first option in a dropdown list](#avoid-allowing-a-null-value-for-the-first-option-in-a-dropdown-list)
  * [Directive expressions should be used for short condition statements (<4). Variables should be used for long condition statements](#directive-expressions-should-be-used-for-short-condition-statements-4-variables-should-be-used-for-long-condition-statements)
  * [All written text on the screen should go through the translate service](#all-written-text-on-the-screen-should-go-through-the-translate-service)
  * [Add annotations to complex/ambiguous code blocks](#add-annotations-to-complexambiguous-code-blocks)
  * [Ensure the use of "track by" when using ngRepeat](#ensure-the-use-of-track-by-when-using-ngrepeat)
  * [Using single-way binding for properties which never change](#using-single-way-binding-for-properties-which-never-change)

## Style Guide

### Element names should utilize kebab-case
{+Do+}
```html
<mig-agent-contact></mig-agent-contact>
```
{-No Do-}
```html
<migagentcontact></migagentcontact>
```

### Element attributes should utilize kebab-case
{+Do+}
```html
<div first-class-notified="{{firstClassNotified}}"></div>
```
{-No Do-}
```html
<div firstclassnotified="{{firstClassNotified}}"></div>
```

## Angular Templates

### Choose the correct method to show/hide information to the screen
> Reason: The ngIf and ngShow directives both can be used to render template elements to the screen based on the truthy/falsy expression. The biggest difference between ngIf and ngShow is that once the elements have been compiled, ngIf elements will self-destruct and require re-rendering each time the conditions change. This is great as it decreases the amount of angular $watchers on the screen but it requires additional rendering cost.

{+Do+} : ngShow When the conditional expression changes frequently
```html
<list-errors ng-show="errors" message="These Values are Required to continue"></list-errors>
```

{+Do+} : ngIf When the conditional expression changes infrequently
```html
<list-errors ng-if="errors" message="These Values are Required to continue"></list-errors>
```

{+Special Do+} : *When its a simple value to change use conditional expression shorthand*  
```html
<p>{{'You'}} {{(errors)?'Do':'Don't'}} {{'Have Errors'}}</p>
```

### Add click events to parent elements to support IE
> Reason: IE will not trigger the click event if the ng-click event is buried. 

{+Do+}
```html
<button ng-click="click()"><span></span></button>
```

{-No Do-}
```html
<button><span ng-click="click()"></span></button>
```

### Apply 'clear fix' to parent elements with floating children	
{+Do+}
```html
<div class='clearfix'> 
   <div class="col-md-3"></div>
</div>	
```
{-No Do-}
```html
<div> 
   <div class="col-md-3"></div>
</div>
```

### Avoid using functions within ngIf/ngShow/ngHide/ngSwitch/ngRepeat due to performance cost. 
{+Do+} : Assign the function value to a variable
```html
<div class="control-group" ng-if="buildingDtoObj.Visible"></div>	
```
{-No Do-}
```html
<div class="control-group form-wrapper" ng-if="isBuildingVisible()">
```

### Avoid allowing a null value for the first option in a dropdown list	
{+Do+}
```html
<select gw-pl-select="accountInfoView.communication.value"...>	
```
{-No Do-}
```html
<select ng-model="accountInfoView.value.communication.code"...>
```

### Directive expressions should be used for short condition statements (<4). Variables should be used for long condition statements		
{+Do+}
```html
<div ng-if="addInsuredTypeExists && isPrimaryContact && orgTypeKeys"></div>
```
{-No Do-}
```html
<div ng-if="(model.addtlInsuredTypeRadio == 'company'||edit == 'company' || model.addtlInsuredTypeRadio == 'person'||edit == 'person') && !contact.isNewDBA && (orgTypeKeys != null) && (!contact.isNewAdditionalInterest)">
```

### All written text on the screen should go through the translate service
{+DO+}
```html
<p>{{'agent.account.view.welcome' | translate}} {{user.name}}</p>
```
{-No DO-}	
```html
<p>Welcome {{user.name}}</p>
```

### Add annotations to complex/ambiguous code blocks
{+Do+}
```html
<!-- Beginning of Document Table -->
<div class="white-background" >
    <div class="content-wrapper--780">
        <div class="padded-container--30-top-90-bottom">

            <div class="table--mobile-wrapper">
                <table class="condensed-bicolor add-order-icon">
                    <thead>
                    ...
```
{-No Do-}
```html
<div class="white-background" >
    <div class="content-wrapper--780">
        <div class="padded-container--30-top-90-bottom">

            <div class="table--mobile-wrapper">
                <table class="condensed-bicolor add-order-icon">
                    <thead>
                    ...
```

### Ensure the use of "track by" when using ngRepeat	
{+Do+}
```html
<div class="collapasable-multilevel-slat" ng-repeat="vehicleIncident in model.vehicleIncidents.value | filter:{vehicle : {policyVehicle:true}} track by $index" data-idx="1">	
```
{-No Do-}
```html
<div class="collapasable-multilevel-slat" ng-repeat="vehicleIncident in model.vehicleIncidents.value | filter:{vehicle : {policyVehicle:false}}">
```

### Using single-way binding for properties which never change	
{+Do+}
```html
<p> {{ ::variable }}</p>
<ul>
   <li ng-repeat="user in ::users"></li>
</ul>	
```
{-No Do-}
```html
<p> {{ variable }}</p>
<ul>
   <li ng-repeat="user in users"></li>
</ul>	
```