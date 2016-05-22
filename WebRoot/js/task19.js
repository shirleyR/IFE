/**
 * Created by rsl_pc on 2016/5/22.
 */

var queueData=[];
function init() {
    addBtnHandle();
}
function render() {

    var wrapper=document.getElementById("queue-wrap");
    var height=wrapper.clientHeight;
    var width=wrapper.clientWidth/(2*queueData.length);
    var rate=height/100;
    wrapper.innerHTML="";
    queueData.forEach(function (data) {
        var div=document.createElement("div");
        div.style.background="pink";
        div.style.height=rate*data;
        div.style.width=width;
        div.style.marginTop=(1-rate)*data;
        div.style.float='left';
        div.style.marginLeft=width;
        wrapper.appendChild(div);
    })
}
function addBtnHandle() {
    var leftInBtn=document.getElementById("left-in-btn");
    var rightInBtn=document.getElementById("right-in-btn");
    var queue=document.getElementById("queue-input");

    var leftOutBtn=document.getElementById("left-out-btn");
    var rightOutBtn=document.getElementById("right-out-btn");

    leftInBtn.onclick=function () {
        var num=queue.value;
        if(!num.match(/^\d+$/)){
            alert("输入必须为数字");
            return;
        }

        queueData.unshift(+num);
        render();

    }
    rightInBtn.onclick=function () {

        var num=queue.value;
        if(!num.match(/^\d+$/)){
            alert("输入必须为数字");
            return;
        }
        queueData.push(+num);
        render();

    }
    leftOutBtn.onclick=function () {
        if(queueData.length==0)return;
        queueData.shift();
        render();
    }
    rightOutBtn.onclick=function () {
        if(queueData.length==0)return;
        queueData.pop();
        render();
    }
}

init();