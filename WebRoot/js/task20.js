/**
 * Created by rsl_pc on 2016/5/25.
 */
var $=function (e) {
    return document.querySelector(e);
}
var arrData=[]
$('#insert_btn').onclick=function () {
    var str=$('#input_text').value.trim();
    var arrWord=str.split(/[^0-9a-zA-Z\u4e00-\u9fa5]/)
        .filter(function (e) {
            if(e!=null&&e.length>0){
                return true;
            }
            return false;
        })
    arrData=arrData.concat(arrWord);
    render();
}
$("#search-btn").onclick=function () {
    var str=$("#search_input").value.trim();
    render(str);
}
function render(str) {
    $("#content").innerHTML=arrData.map(function(d) {
        if (str != null && str.length > 0) {
            d = d.replace(new RegExp(str, "g"), "<span class='select'>" + str + "</span>");
        }
        return '<div>' + d + '</div>';
    }).join('');
}
