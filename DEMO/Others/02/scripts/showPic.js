function showPic(whichpic) {//定义一个新的函数
    if (!document.getElementById("placeholder")) return false;//检查当前浏览器是否理解名为getElementByTagName的DOM方法
    //如果未定义，请离开，理解这个函数的将会继续执行。不理解这个函数的浏览器不会执行这个函数。
    var source = whichpic.getAttribute("href");
    var placeholder = document.getElementById("placeholder");
    placeholder.setAttribute("src",source);
    if (!document.getElementById("description")) return false;
    //对getElementById使用同上的方法。
    if (whichpic.getAttribute("title")) {
        var text = whichpic.getAttribute("title");
    } else {
        var text = "";
    }
    var description = document.getElementById("description");
    if (description.firstChild.nodeType == 3) {
        description.firstChild.nodeValue = text;
    }
    return false;
}

function prepareGallery() {
    if (!document.getElementsByTagName) return false;
    if (!document.getElementById) return false;
    if (!document.getElementById("imagegallery")) return false;
    //必要的测试和检查工作就绪后，可以开始编写事件处理的核心功能。
    var gallery = document.getElementById("imagegallery");
//创建一个变量简化。
    var links = gallery.getElementsByTagName("a");
    //将节点列表,赋值给一个变量。命名为links。

    for ( var i=0; i < links.length; i++) {
        links[i].onclick = function() {
            return showPic(this);
        }
        links[i].onkeypress = links[i].onclick;
    }
}

function addLoadEvent(func) {
    var oldonload = window.onload;
    if (typeof window.onload != 'function') {
        window.onload = func;
    } else {
        window.onload = function() {
            oldonload();
            func();
        }
    }
}

addLoadEvent(prepareGallery);/**
 * Created by Administrator on 2017/7/26 0026.
 */
