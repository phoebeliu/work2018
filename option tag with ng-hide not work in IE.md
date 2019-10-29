# option tag with ng-hide not work in IE

(see [here](https://stackoverflow.com/questions/9234830/how-to-hide-a-option-in-a-select-menu-with-css), [here](https://stackoverflow.com/questions/19565864/option-with-displaynone-does-not-work-on-ie) and [here](https://stackoverflow.com/questions/20373558/options-with-displaynone-not-hidden-in-ie)).

This happens because IE does not respect the `display: none` style on `option` elements (you can try that without AngularJS). Remember, that all `ngShow`/`ngHide` do is add/remove the `.ng-hide` CSS class. The `.ng-hide` CSS class is associated with a `display: none` style rule.

So, this works as expected as far as AngularJS is concerned. You could use your own rule for `.ng-hide` (or possibly `.ng-hide` on `<option>` elements), but using `ngIf` (which adds/removes the DOM node) sounds like a better alternative.