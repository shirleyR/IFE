/**
 * Created by rsl_pc on 2016/5/22.
 */

/**
 * init queue
 */
// 改进策略： 定义一个queue类，将操作作为该类的属性
    
var queueData=[];
function init() {
    addBtnHandle();
}
function render() {

    var wrapper=document.getElementById("queue-wrap");
    wrapper.innerHTML="";
    queueData.forEach(function (data) {
        var div=document.createElement("div");
        div.innerText=data;
        div.style.background="pink";
        div.style.textAlign="center";
        div.style.width=50+'px';
        div.style.marginTop=5+'px';
        div.style.fontSize=1+"em";
        div.style.float='left';
        div.style.marginLeft=10+'px';
        div.style.height=50+'px';
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

        queueData.unshift(num);
        render();

    }
    rightInBtn.onclick=function () {

        var num=queue.value;
        if(!num.match(/^\d+$/)){
            alert("输入必须为数字");
            return;
        }
        queueData.push(num);
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