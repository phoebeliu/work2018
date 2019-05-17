# [Can I use a :before or :after pseudo-element on an input field?](https://stackoverflow.com/questions/2587669/can-i-use-a-before-or-after-pseudo-element-on-an-input-field)

## `:before` and `:after` render inside a container

**and <input> can not contain other elements.**

------

Pseudo-elements can only be defined (or better said are only supported) on container elements. Because the way they are rendered is **within** the container itself as a child element. `input` can not contain other elements hence they're not supported. A `button` on the other hand that's also a form element supports them, because it's a container of other sub-elements.

If you ask me, if some browser **does** display these two pseudo-elements on non-container elements, it's a bug and a non-standard conformance. Specification directly talks about element content...

## W3C specification

If we carefully read [the specification](http://www.w3.org/TR/CSS2/generate.html#before-after-content) it actually says that they are inserted **inside** a containing element:

> Authors specify the style and location of generated content with the :before and :after pseudo-elements. As their names indicate, the :before and :after pseudo-elements specify the location of content before and after an element's document tree content. The 'content' property, in conjunction with these pseudo-elements, specifies what is inserted.

See? *an element's document tree \**content***. As I understand it this means **within** a container.