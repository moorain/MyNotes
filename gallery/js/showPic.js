
function showPic(whichpic){
    var source=whichpic.getAttribute("href");
    var placeholder=document.getElementById("placeholder");
    placeholder.setAttribute("src",source);
}
function countBodyChildren(){
    var body_element=document.getElementsByTagName("body")[0];//得到body的元素，存储到数组中；
    // 变 量body-enement已经指向了文档的body元素.
    alert(body_element.childNodes.length);//弹出窗口显示数组所包含的个数。
}
window.onload=countBodyChildren;//让这个函数在页面加载时执行。放在代码后。