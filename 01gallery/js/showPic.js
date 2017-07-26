
function showPic(whichpic){
    var source=whichpic.getAttribute("href");
    var placeholder=document.getElementById("placeholder");
    placeholder.setAttribute("src",source);
    var text=whichpic.getAttribute("title");  //增加一条语句来获取whichpic对象的title属性值。存入text变量。
    var description=document.getElementById("description");//得到id是descrip的《p>元素，并把他保存到变量descrip里。
    description.firstChild.nodeValue=text;//把description的第一个子节点设置为text的值。
}
//function countBodyChildren(){
//    var body_element=document.getElementsByTagName("body")[0];//得到body的元素，存储到数组中；
//    // 变 量body-enement已经指向了文档的body元素.
//    alert(body_element.childNodes.length);//弹出窗口显示数组所包含的个数。
//}
//window.onload=countBodyChildren;//让这个函数在页面加载时执行。放在代码后。