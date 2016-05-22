/**
 * Created by rsl_pc on 2016/5/21.
 */
/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};
/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {

    var city=document.getElementById("aqi-city-input").value.trim();
    var aqi=document.getElementById("aqi-value-input").value.trim();
    if(!city.match(/^[A-Za-z\u4E00-\u9FA5]+$/)){
        alert("城市名需为英文或中文");return;
    }else if(!aqi.match(/^\d+$/)){
        alert("aqi为整数");return;
    }
    aqiData[city]=aqi;
    return;
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
    var table=document.getElementById("aqi-table");
    table.innerHTML="";

    var str="<tr><td>城市</td><td>空气质量</td><td>操作</td></tr>";
    for(var tcity in aqiData){
        str+="<tr><td>"+tcity+"</td><td>"+aqiData[tcity]+"</td>"+"<td><button class='del-btn'>删除</button>"+"</td>";
    }
    table.innerHTML=str;
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
    addAqiData();
    renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(target) {
    // do sth.
    var tr=target.parentElement.parentElement;
    var ncity=tr.children[0].innerHTML;

    delete aqiData[ncity];
    renderAqiList();
}

function init() {

    // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
        document.getElementById("add-btn").onclick=function(){
            // confirm city name is chinese or char ; aqi is Integer
            //

           addBtnHandle();
        }
    // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
    document.getElementById("aqi-table").addEventListener("click",function (e) {
        alert(this.nodeType);
        if(e.target.nodeName.toLowerCase()==='button'){
            delBtnHandle(e.target);
        }
    },true);
}

init();