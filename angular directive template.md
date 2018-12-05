# angular directive template

```js
 templateUrl : function(ele,attrs){
                    return attrs.template || 'XXX.html'
                },
```

`Error: [$compile:tpload] Failed to load template`

`templateUrl: templateStr,`

项目里用requireJS把template都提前注入到directive的js里，然后用了template来完成。然后要改成templateUrl就会报错，因为此时angular要的是一个url路径发送get请求，而给的这个字符串当成了url处理，因此报错。

At a high level, directives are markers on a DOM element (such as an attribute, element name, comment or CSS class) that tell AngularJS's **HTML compiler** ([`$compile`](https://docs.angularjs.org/api/ng/service/$compile)) to attach a specified behavior to that DOM element (e.g. via event listeners), or even to transform the DOM element and its children.

AngularJS comes with a set of these directives built-in, like `ngBind`, `ngModel`, and `ngClass`. Much like you create controllers and services, you can create your own directives for AngularJS to use. When AngularJS [bootstraps](https://docs.angularjs.org/guide/bootstrap) your application, the [HTML compiler](https://docs.angularjs.org/guide/compiler)traverses the DOM matching directives against the DOM elements.

**What does it mean to "compile" an HTML template?** For AngularJS, "compilation" means attaching directives to the HTML to make it interactive. The reason we use the term "compile" is that the recursive process of attaching directives mirrors the process of compiling source code in [compiled programming languages](http://en.wikipedia.org/wiki/Compiled_languages).

In the example above we in-lined the value of the `template` option, but this will become annoying as the size of your template grows.

**Best Practice:** Unless your template is very small, it's typically better to break it apart into its own HTML file and load it with the `templateUrl` option.

If you are familiar with `ngInclude`, `templateUrl` works just like it. Here's the same example using `templateUrl` instead:

`templateUrl` can also be a function which returns the URL of an HTML template to be loaded and used for the directive. AngularJS will call the `templateUrl` function with two parameters: the element that the directive was called on, and an `attr` object associated with that element.

**Note:** You do not currently have the ability to access scope variables from the `templateUrl` function, since the template is requested before the scope is initialized.