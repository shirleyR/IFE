/**
 * Created by rsl_pc on 2016/5/22.
 */
/* 数据格式演示
 var aqiSourceData = {
 "北京": {
 "2016-01-01": 10,
 "2016-01-02": 10,
 "2016-01-03": 10,
 "2016-01-04": 10
 }
 };
 */


function getDateStr(dat) {
    var y=dat.getFullYear();
    var m=dat.getMonth()+1;
    m=m<10?'0'+m:m;
    var d=dat.getDate();
    d=d<10?'0'+d:d;
    return y+'-'+m+'-'+d;
}

function randomBuildData(seed) {
    var returnData={};
    var dat=new Date("2016-01-01");
    var datStr="";
    for(var i=1;i<92;i++)
    {
        datStr=getDateStr(dat);
        returnData[datStr]=Math.ceil(Math.random()*seed);
        dat.setDate(dat.getDate()+1);
    }
    return returnData;
}

var aqiSourceData={
    "北京": randomBuildData(500),
    "上海": randomBuildData(300),
    "广州": randomBuildData(200),
    "深圳": randomBuildData(100),
    "成都": randomBuildData(300),
    "西安": randomBuildData(500),
    "福州": randomBuildData(100),
    "厦门": randomBuildData(100),
    "沈阳": randomBuildData(500)
}

// 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
    nowSelectCity: -1,
    nowGraTime: "day"
}

function getWidth(width,len) {
    var posObj={};
    posObj.width=Math.floor(width/(len*2));
    posObj.height=Math.floor(width/len);
    posObj.offsetLeft=(width-posObj.left*(len-1)-posObj.width)/2;
    return posObj;
}

/**
 * 渲染图表
 */
function renderChart() {
    var innerHTML="",i=0;
    var wrapper=document.getElementById("aqi-chart-wrap");
    var width=wrapper.clientWidth;
    var selectedData=chartData[pageState.nowGraTime][pageState.nowSelectCity];
    var len=Object.keys(selectedData).length;
    var posObj=getWidth(width,len);
   // innerHTML+=
}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange() {
    // 确定是否选项发生了变化
    var graTime=document.getElementsByName("gra-time");
    var gra;
    for(var i=0;i<graTime.length;i++){
        if(graTime[i].checked){
            gra=graTime[i].value;
        }
    }
    if(gra===pageState.nowGraTime){
        return;
    }

    // 设置对应数据
    pageState.nowGraTime=gra;
    // 调用图表渲染函数
    renderChart();
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange() {
    // 确定是否选项发生了变化
    var city=document.getElementById("city-select");
    var selectCity=city.options[city.selectedIndex].text;
    // 设置对应数据
    if(selectCity===pageState.nowSelectCity)return;
    pageState.nowSelectCity=selectCity;
    // 调用图表渲染函数
    renderChart();
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
    document.getElementsByName("gra-time").onchanged=function () {
        graTimeChange();
    }
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
    // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
     var city=document.getElementById("city-select");
     var strCity="";
     for(var str in aqiSourceData){
         strCity+="<option>"+str+"</option>";
     }
    city.innerHTML=strCity;

    // 给select设置事件，当选项发生变化时调用函数citySelectChange
    city.onchanged=function () {
        citySelectChange();
    }
}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
    var charSoure={};
    // 将原始的源数据处理成图表需要的数据格式
    /*
      dataformat:
      city :  {day:{};
                week:{};
                month:{};
                }
     */
    for(var str in aqiSourceData){
        // day
        charSoure[str].day=aqiSourceData[str];
        // week
        var week=-1;
        var month=-1;
        var weekAqi=0;
        var monthAqi=0;
        for (var aqiTime in aqiSourceData[str]){
                var dat=new Date(aqiTime);
                var day=dat.getDay();
                 if(week==-1){
                     week=day;
                 }
                 weekAqi+=+aqiSourceData[str][aqiTime];
                monthAqi+=+aqiSourceData[str][aqiTime];
                if(week==6){
                    charSoure[str].push({dat:weekAqi})
                    weekAqi=0;
                }
                var monthAqi=dat.getMonth();
                if(month==-1){
                    month=monthAqi;
                }
                var nMonth=dat.setDate(dat.getDate() + 1).getMonth();
               if(month<nMonth){
                   charSoure[str].push({month:monthAqi})
                   monthAqi=0;
               }
        }

        // month
    }
    // 处理好的数据存到 chartData 中
    chartData=charSoure;
}

/**
 * 初始化函数
 */
function init() {
    initGraTimeForm()
    initCitySelector();
    initAqiChartData();
}

init();