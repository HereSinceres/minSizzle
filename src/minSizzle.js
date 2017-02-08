(function (window) {
    // http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
    //identifier 匹配规则
    var identifier = "(?:\\\\.|[\\w-]|[^\0-\\xa0])+";
    var matchExpr = {
        "ID": new RegExp("^#(" + identifier + ")"),
        "CLASS": new RegExp("^\\.(" + identifier + ")"),
        "TAG": new RegExp("^(" + identifier + "|[*])")
    };


    function isWindow(obj) {
        return obj != null && obj.window == window;
    }

    function isDocument(obj) {
        return obj != null && obj.nodeType && obj.nodeType == 9;
    }

    function isArray(obj) {
        return Object.prototype.toString.call(obj) == "[object Array]";
    }

    function isFunction(obj) {
        return Object.prototype.toString.call(obj) == "[object Function]";
    }

    function makeArray(iterable) {
        var ret = [],
            len = iterable.length;
        //String、window和function也有length属性
        if (len == null || typeof iterable === "string" || isFunction(iterable) || isWindow(iterable))
            ret[0] = iterable;
        else
            while (len)
                ret[--len] = iterable[len];
        return ret;
    }


    /**
     * 在上下文中根据选择器文本匹配DOM
     * @param  {} crumb 选择器文本 'div#js-id.js-class ul.js-ul li p'
     * @param  {} context 上下文限定
     * @return {Array} 匹配到的DOM节点组成的数组
     */
    function matchEl(crumb, context) {
        console.log(context);
        var result = [],
            ret;
        //上下文为数组
        context = isArray(context) ? context : [context];
        //获取标签
        var tagName = crumb.match(/^\w+/) !== null && crumb.match(/^\w+/)[0] || "*";
        for (var i = 0, len = context.length; i < len; i++) {
            result = result.concat(
                makeArray(
                    context[i].getElementsByTagName(tagName.toUpperCase())));
        }
        if (tagName !== "*") {
            crumb = crumb.replace(new RegExp("^" + tagName, ""), "");
        }
        //id
        if (/^#/.test(crumb)) {
            var id = crumb.match(matchExpr["ID"])[0].replace("#", "");
            crumb = crumb.replace(new RegExp("^#" + id, ""), "");
            for (var j = 0, len = result.length; j < len; j++) {
                //shortcut
                ret = result[j];
                if (ret.id != id) {
                    result.splice(j, 1);
                    len--;
                    --j;
                }
            }
        }

        //class
        if (/^\./.test(crumb)) {
            var clazz = crumb.match(matchExpr["CLASS"])[0].replace(".", "");
            var crumb = crumb.replace(new RegExp("^\." + clazz, ""), "");
            for (var j = 0, len = result.length; j < len; j++) {
                ret = result[j];
                className = " " + ret.className + " ";
                var pattern = new RegExp(clazz, "");
                if (!pattern.test(className)) {
                    result.splice(j, 1);
                    len--;
                    --j;
                }
            }
        }
        crumb = crumb.replace(/^\s+/, "");
        if (crumb)
            return matchEl(crumb, result);
        else {
            return result;
        }
    }

    /**
     * @param  {} 选择器
     * @param  {} 源上下文
     */
    function minSizzle(selector, context) {
        var selectorArray, result = [];
        //保证集合中至少有一个元素
        selector = selector || document;
        //保证有初始上下文，默认亦为document
        context = context && context.nodeType === 1 ? context : document;
        //是否是document或者window
        if (isDocument(selector) || isWindow(selector))
            return selector;
        //DOM元素的nodeType值均为1
        if (selector.nodeType === 1) {
            return selector;
        }
        //如果是字符串进入匹配
        if (typeof selector == "string") {
            selector = selector.replace(/^\s+|\s+$/g, "");
            //ID选择
            if (matchExpr["ID"].test(selector)) {
                return document.getElementById(selector.replace("#", ""));
            } else {
                selectorArray = selector.split(",");
                for (var i = 0, len = selectorArray.length; i < len; i++) {
                    var temp = selectorArray[i].replace(/^\s+|\s+$/g, "");
                    if (temp) {
                        result = result.concat(matchEl(temp, context));
                    }
                }
            }
        }
        return result;
    }

    var _sizzle = window.minSizzle;

    minSizzle.noConflict = function () {
        if (window.minSizzle === minSizzle) {
            window.minSizzle = _sizzle;
        }

        return minSizzle;
    };

    if (typeof define === "function" && define.amd) {
        define(function () {
            return minSizzle;
        });
    } else if (typeof module !== "undefined" && module.exports) {
        module.exports = minSizzle;
    } else {
        window.minSizzle = minSizzle;
    }
})(window)