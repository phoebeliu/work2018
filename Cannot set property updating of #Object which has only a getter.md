# Cannot set property updating of #<Object> which has only a getter

```js
var a = {};
Object.defineProperty(a, 'updating', {
	'get' :  _.constant(false)
}); 
a.updating = a.updating;
//than you have "Cannot set property updating of #<Object> which has only a getter" in console
```

So yes 

a.b = a.b

still will go a.b's set function in JS.