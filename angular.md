[ Development Tools installation guides](http://treehouse.github.io/installation-guides/) 

[Getting Started with Webpack](https://teamtreehouse.com/library/getting-started-with-webpack)

[TypeScript Documentation](http://www.typescriptlang.org/docs/tutorial.html)

#### Resources:

[Starter Project Zip File](https://s3.amazonaws.com/treehouse-project-downloads/Angular2017/photo_blog.zip)
[Development Tools installation guides](http://treehouse.github.io/installation-guides/)
[Download Visual Studio Code](http://code.visualstudio.com/)
[TypeScript Compiler Options](https://www.typescriptlang.org/docs/handbook/compiler-options.html)
[Install TypeScript](http://www.typescriptlang.org/index.html#download-links)
[Angular Webpack Guide](https://angular.io/docs/ts/latest/guide/webpack.html)

#### Key Terms:

*Component Decorator*
Components are the backbone of an Angular application. The Component Decorator is for defining a component and registering it with Angular. Each component must have a selector and a template to be valid. Read the [Component Decorator documentation](https://angular.io/docs/ts/latest/api/core/index/Component-decorator.html) for more details.

#### Resources:

Emoji array for use in application

- emoji = ['🎉', '😍', '😜', '👍'];

[Showing component properties with interpolation](https://angular.io/docs/ts/latest/guide/displaying-data.html#!#interpolation)
[TypeScript Type Guards](https://basarat.gitbooks.io/typescript/content/docs/types/typeGuard.html)
[TypeScript String Literal Types](http://www.typescriptlang.org/docs/handbook/advanced-types.html#string-literal-types)
[Get Emoji](http://getemoji.com/)

[Angular Style Guide](https://angular.io/docs/ts/latest/guide/style-guide.html)

 [Barrel Definition](https://angular.io/docs/ts/latest/guide/glossary.html#!#barrel)



[`:host` selector specification](https://www.w3.org/TR/css-scoping-1/#host-selector)
[Angular Documentation for using `:host` selector](https://angular.io/docs/ts/latest/guide/component-styles.html#!#sts=:host)

[Structural Directive (NgIf, NgFor) Documentation](https://angular.io/docs/ts/latest/guide/structural-directives.html)
[Attribute Directive (NgClass, NgStyle) Documentation](https://angular.io/docs/ts/latest/guide/attribute-directives.html)
[Template Syntax Documentation](https://angular.io/docs/ts/latest/guide/template-syntax.html)



http://www.typescriptlang.org/samples/index.html

The `any` type is a powerful way to work with existing JavaScript, allowing you to gradually opt-in and opt-out of type-checking during compilation. You might expect `Object` to play a similar role, as it does in other languages. But variables of type `Object` only allow you to assign any value to them - you can’t call arbitrary methods on them, even ones that actually exist:

```typescript
let notSure: any = 4;
notSure.ifItExists(); // okay, ifItExists might exist at runtime
notSure.toFixed(); // okay, toFixed exists (but the compiler doesn't check)

let prettySure: Object = 4;
prettySure.toFixed(); // Error: Property 'toFixed' doesn't exist on type 'Object'.
```

[Angular Resources](https://angular.io/resources)
[Angular Modules](https://angular.io/docs/ts/latest/api/#!?query=module)

------

- HTTP Module Installation
  This course depends on a module that intercepts request to the HTTP service. If you install a different version you may experience compatibility issues. We strongly recommended that you install only the versions referenced in the course.

`Npm install @angular/http@2.4.2 --save --save-exact`

[Observables Documentation](https://angular.io/docs/ts/latest/tutorial/toh-pt6.html#!#observables)

`debugger`

骚操作在此，代码刷新后自动跳转到改行。

```typescript
export class EntryListComponent {

    constructor(http: Http) {
        http.get('./app/entries').toPromise()
            .then(response => { debugger }, error => { debugger })
    }

}
```

[ Public, Private, and Protected modifiers](http://www.typescriptlang.org/docs/handbook/classes.html#public-private-and-protected-modifiers) [TypeScript Generics Documentation](https://www.typescriptlang.org/docs/handbook/generics.html)



[ Angular In Memory Web API](https://github.com/angular/in-memory-web-api) [Backend Server File](https://gist.githubusercontent.com/kenhowardpdx/b5e6b93b04bc81df1236852268616869/raw/793a2cbc1c3fc8783442378abcbd2d56fcbef462/backend.ts) [Angular Lifecycle Hooks](https://angular.io/docs/ts/latest/guide/lifecycle-hooks.html)

[Forms Documentation](https://angular.io/docs/ts/latest/guide/forms.html)

`npm install @angular/forms@2.4.2 --save --save-exact`

[Augury Chrome Developer Tools Extension](https://chrome.google.com/webstore/detail/augury/elgalmkoelokbchhkhacckoklkejnhcd)

Note: Once you have installed Augury, restart your browser to access Augury functionality.

The EventEmitter is a way to pass data between components.One component sends the data, while the other component receives it.

[TypeScript Generics Documentation](https://www.typescriptlang.org/docs/handbook/generics.html)

[Angular Documentation ](https://angular.io/docs/ts/latest/)
[Angular CLI](https://cli.angular.io/)

- The Angular team has put a lot of thought into how best to build an Angular application. Angular's command line interface is a tool to help you quickly build out components and a testing framework with your application. Many of the concepts presented in this course are implemented in the CLI.

------

[TypeScript Configuration](https://angular.io/docs/ts/latest/guide/typescript-configuration.html)

- There are many ways to configure TypeScript to fit your development style. Angular has put together a nice guide describing what each property means and how it relates to developing an Angular application.

------

[Angular Style Guide](https://angular.io/docs/ts/latest/guide/style-guide.html)
[Angular Cheat Sheet](https://angular.io/docs/ts/latest/guide/cheatsheet.html)
[Angular GitHub Repository](https://github.com/angular/angular)

- It's important to keep your application up to date with the latest version of the framework. Star the application then create an account on [larger.io](https://www.larger.io/) to get notified when there are updates.