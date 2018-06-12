function dataFunctions() { }

dataFunctions.prototype.getInfoFromNode = function (infoNode) {
    var obj = {};
    obj.id = infoNode.getAttribute("data-id");
    return obj;
};

dataFunctions.prototype.createXhrPostRequest = function (url, token) {
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.open("POST", url);
    xhr.setRequestHeader("content-type", "application/json");
    xhr.setRequestHeader("token", JSON.stringify(token));
    return xhr;
};

dataFunctions.prototype.sendXhrPostRequest = function (xhr, postData, callback) {
    xhr.onload = function (event) {
        callback(xhr);
    }
    xhr.send(postData);
};

function nodeConstructors() { }

nodeConstructors.prototype.arrayLikeToArray = function (arrayLike) {
    arr = [];
    for (var i = 0; i < arrayLike.length; i++) {
        arr.push(arrayLike[i]);
    }
    return arr;
};

function myEvents() { }

myEvents.prototype.getElementAttributeData = function (element, attributeProp) {
    if (element && attributeProp) {
        var attribute = element.attributes[attributeProp];
        if (attribute) {
            return attribute.value;
        } else {
            throw new Error("The data does not exist", element, attributeProp);
        }
    }
};

myEvents.prototype.checkAndCorrectClass = function (className) {
    if (className) {
        if (className[0] !== ".") {
            return "." + className;
        } else {
            return className;
        }
    }
};

myEvents.prototype.prepForAjax = function (element) {
    var obj = {};
    var url = this.getElementAttributeData(element, "data-from");
    var targetClass = this.checkAndCorrectClass(this.getElementAttributeData(element, "data-to"));
    obj.url = url;
    obj.target = targetClass;
    return obj;
};

myEvents.prototype.prepForAjaxInNewTag = function (element) {
    var obj = this.prepForAjax(element);
    obj["name"] = this.getElementAttributeData(element, "data-name");
    return obj;
};

myEvents.prototype.loadToPage = function (obj, callback) {
    if (callback) {
        $(obj.target).load(obj.url, function () {
            console.log("load completed");
            callback();
        });
    } else {
        $(obj.target).load(obj.url, function () {
            console.log("load completed");
        });
    }    
};

myEvents.prototype.ajaxToPage = function (obj, callback) {
    $.ajax({ url: obj.url }).done(function (data) {
        $(obj.target).html(data);
        if (callback) {
            callback(data);
        }
    });
};

myEvents.prototype.hideSection = function (section) {
    var part = document.querySelector("." + section);
    part.classList.add("hidden");
};

myEvents.prototype.showSection = function (section) {
    var part = document.querySelector("." + section);
    part.classList.remove("hidden");
};

myEvents.prototype.handleSuccessError = function (data) {
    if (data.error) {
        try {
            throw new Error(data.error.message + " code:" + data.error.code + ", appErrorCode:" + data.error.data.appErrorCode);
        } catch (e) {
            console.error(e.message);
        }
    }
};
