var elementFactory = (function () {

    function commonElementMaker(elementString, cssArray) {
        var element = document.createElement(elementString);
        addCssClasses(element, cssArray);
        return element;
    };

    function imageMaker(path, imageCssArray) {
        var image = document.createElement("img");
        image.src = path;
        addCssClasses(image, imageCssArray);
        return image;
    };

    function linkMaker(url, text, linkCssArray) {
        var link = document.createElement("a");
        link.href = url;
        link.text = text;
        addCssClasses(link, linkCssArray);
        return link;
    };

    function mailToLinkMaker(url, text, linkCssArray) {
        var link = document.createElement("a");
        link.href = "mailto:" + text;
        link.text = text;
        addCssClasses(link, linkCssArray);
        return link;
    };

    function phoneToLinkMaker(url, text, linkCssArray) {
        var link = document.createElement("a");
        link.href = "tel:" + text;
        link.text = text;
        addCssClasses(link, linkCssArray);
        return link;
    };

    function elementCollectionBuilder(container, elementArray, elementMaker) {
        if (!elementArray.length) {
            return container;
        }
        container.appendChild(elementMaker(elementArray.pop()));
        elementCollectionBuilder(container, elementArray, elementMaker)
    };

    function addCssClasses(element, cssClassArray) {
        if (!cssClassArray.length) {
            return;
        }
        element.classList.add(cssClassArray.pop());
        addCssClasses(element, cssClassArray);
    };

    return {
        linkMaker: linkMaker,
        imageMaker: imageMaker,
        commonElementMaker: commonElementMaker,
        elementCollectionBuilder: elementCollectionBuilder,
        mailToLinkMaker: mailToLinkMaker,
        phoneToLinkMaker: phoneToLinkMaker
    };

})();