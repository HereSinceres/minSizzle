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

    function isArray(obj) {
        return Object.prototype.toString.call(obj) == "[object Array]";
    }

    function isFunction(obj) {
        return Object.prototype.toString.call(obj) == "[object Function]";
    }

    function makeArray(iterable) {
        console.log(iterable);
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
        var i, j, len, len2, rets = [],
            ret, tagName, id, clazz, child, pattern, type, attr, val, dice, queue;
        //上下文为数组
        context = isArray(context) ? context : [context];
        console.log('要匹配的文本和上下文:', crumb, context);
        //获取标签
        tagName = crumb.match(/^\w+/) !== null && crumb.match(/^\w+/)[0] || "*";
        console.log("匹配到的标签:", tagName);
        for (i = 0, len = context.length; i < len; i++) {
            rets = rets.concat(
                makeArray(
                    context[i].getElementsByTagName(tagName.toUpperCase())));
        }
        if (tagName !== "*") {
            crumb = crumb.replace(new RegExp("^" + tagName, ""), "");
        }

        //loop the left crumbs char to specialfy the ones
        //id
        if (/^#/.test(crumb)) {
            id = crumb.match(matchExpr["ID"])[0].replace("#", "");
            crumb = crumb.replace(new RegExp("^#" + id, ""), "");
            for (j = 0, len = rets.length; j < len; j++) {
                //shortcut
                ret = rets[j];
                if (ret.id != id) {
                    rets.splice(j, 1);
                    len--;
                    --j;
                }
            }
        }

        //class
        if (/^\./.test(crumb)) {
            clazz = crumb.match(matchExpr["CLASS"])[0].replace(".", "");
            crumb = crumb.replace(new RegExp("^\." + clazz, ""), "");
            for (j = 0, len = rets.length; j < len; j++) {
                //shortcut
                ret = rets[j];
                className = " " + ret.className + " ";
                pattern = new RegExp(clazz, "");
                if (!pattern.test(className)) {
                    rets.splice(j, 1);
                    len--;
                    --j;
                }
            }
        }
        //child([attr=?])
        // if (/^\[[^\]]*\]/.test(crumb)) {
        //     seed = crumb.match(/^\[[^\]]*\]/)[0].replace("[", "").replace("]", "");
        //     crumb = crumb.replace("[" + seed + "]", "");
        //     attr = seed.match(/^\w+/)[0];
        //     seed = seed.replace(new RegExp("^" + attr, ""), "");
        //     expr = seed.match(/^(!=|=)/)[0];
        //     seed = seed.replace(new RegExp("^" + expr, ""), "");
        //     val = seed;
        //     if (expr === "!=") {
        //         for (j = 0, len = rets.length; j < len; j++) {
        //             //shortcut
        //             ret = rets[j];
        //             if (css.attr(ret, attr) == val) {
        //                 rets.splice(j, 1);
        //                 len--;
        //                 --j;
        //             }
        //         }
        //     } else {
        //         for (j = 0, len = rets.length; j < len; j++) {
        //             //shortcut
        //             ret = rets[j];
        //             if (css.attr(ret, attr) != val) {
        //                 rets.splice(j, 1);
        //                 len--;
        //                 --j;
        //             }
        //         }
        //     }
        // }
        //child(:odd,:even,:random)
        // if (/^:/.test(crumb)) {
        //     seed = crumb.match(/^:\w+/)[0].replace(":", "");
        //     crumb = crumb.replace(new RegExp("^:" + seed, ""), "");
        //     type = seed.match(/^\w+/)[0];
        //     seed = seed.replace(type, "");
        //     switch (type) {
        //         case "odd":
        //             for (len = rets.length, j = rets.length - 1; j >= 0; j--) {
        //                 //shortcut
        //                 ret = rets[j];
        //                 if (j % 2 == 1) {
        //                     rets.splice(j, 1);
        //                     len--;
        //                     --j;
        //                 }
        //             }
        //             break;

        //         case "even":
        //             for (len = rets.length, j = rets.length - 1; j >= 0; j--) {
        //                 //shortcut
        //                 ret = rets[j];
        //                 if (j % 2 == 0) {
        //                     rets.splice(j, 1);
        //                     len--;
        //                     --j;
        //                 }
        //             }
        //             break;

        //         case "random":
        //             //如果小于1则视为百分比的几率选取
        //             //如果大于等于1则视为随机保留的个数
        //             seed = seed || 1;
        //             if (seed < 1) {
        //                 for (j = 0, len = rets.length; j < len; j++) {
        //                     //shortcut
        //                     dice = Math.random();
        //                     ret = rets[j];
        //                     if (dice > seed) {
        //                         rets.splice(j, 1);
        //                         len--;
        //                         --j;
        //                     }
        //                 }
        //             } else {
        //                 queue = [];
        //                 seed = rets.length - parseInt(seed);
        //                 while (queue.length < seed) {
        //                     dice = Math.round(Math.random() * (rets.length - 1));
        //                     queue[queue.length] = rets[dice];
        //                     rets.splice(dice, 1);
        //                 }
        //             }
        //             break;
        //     }
        // }

        //peal blank at head
        crumb = crumb.replace(/^\s+/, "");

        //is it nessesary to continue
        if (crumb)
            return matchEl(crumb, rets);
        else {
            //去除重复的元素
            return rets;
        }
    }

    /**
     * @param  {} 选择器
     * @param  {} 源上下文
     */
    function minSizzle(selector, context) {
        //申明fizzle对象中的属性
        //1. 以[0]开始的数组，存储匹配到的元素（隐藏）
        //2. 匹配到的元素的长度
        var length = 0,
            i, j, crumbs, nodes = [],
            node, selectorEl, offset = 0,
            rets = [];



        //保证集合中至少有一个元素
        selector = selector || document;
        //保证有初始上下文，默认亦为document
        context = context && context.nodeType === 1 ? context : document;

        //根据给定的selector类型，可能有以下几种类型
        //1. 本身是Windoow等其他对象
        //2. 本身就是个DOM元素
        //3. 字符串类型
        //现在我们依次对每个情况做出处理

        //1..
        //如果是对象就直接返回
        if (typeof selector === document || isWindow(selector))
            return selector;

        //2..
        //DOM元素的nodeType值均为1
        if (selector.nodeType === 1) {
            return selector;
        }

        //3..
        //解析字符串
        if (typeof selector == "string") {
            //首先去除首尾的空白
            selector = selector.replace(/^\s+|\s+$/g, "");
            //如果选择器为类似#id的简单形式，则调用原生的方法以提升效率
            if (matchExpr["ID"].test(selector)) {
                return document.getElementById(selector.replace("#", ""));
            } else {
                //运行到这里意味着选择器是个比较复杂的形式
                //@var {String} selectorEl 选择器的单个元素，如：
                //    $("div#nerd.is ul.happy li p, input.me");
                //    将会被视为
                //        div#nerd.is ul.happy li p,
                //        input.me 
                //@var {Array} nodes 临时存储匹配到的节点
                selectorEl = selector.split(",");
                for (i = 0, len = selectorEl.length; i < len; i++) {
                    j = 0;
                    //空白的节点不应该被检测，写错了？
                    if (selectorEl[i] && !/^\s+$/.test(selectorEl[i])) {
                        nodes = matchEl(selectorEl[i], context);
                        rets = rets.concat(nodes);
                    }
                }
            }
        }

        return rets; 
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