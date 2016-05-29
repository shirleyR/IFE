/**
 * Created by rsl_pc on 2016/5/27.
 */
var repeatmove=function () {
    var tagName=Array.prototype.shift.call(arguments).trim();
    var tagArr=Array.prototype.shift.call(arguments);
    if(tagArr!=null){tagArr=[];}
    var len=tagArr.length;
    for(var i=0;i<len;i++)
        if(tagArr[i]===tagName){
            return;
        }
    if(len===10){
        tagArr.shift();
    }
    tagArr.push(tagName);
}
var interestArrGlobal=[];
var tagGroup=[];
var textSplit=function () {
    var interestText=document.getElementById("interest_input_text").value.trim();
    var interstArr=interestText.split(/[^0-9a-zA-Z\u4e00-\u9fa5]+/)
    if(interstArr!=null&&interstArr.length>0){
        interstArr.forEach(function (d) {
            if(d!=null&&d.length>0){
                repeatmove(d.trim(),interestArrGlobal);
            }
        })
    }
}

var render=function (arr,divtag) {
     var renderdiv=document.getElementById(divtag);
     var str="";
    arr.forEach(function (d) {
        str+="<button class='"+divtag+" btn'>"+d+"</button>";
    })
    renderdiv.innerHTML=str;
    var buttons=document.getElementsByClassName("btn");
    buttons.onmousemove=function () {
        var tag=this.innerHTML;
        this.innerHTML="点击删除"+tag;
    }
    buttons.onmouseout=function () {
        var tag=this.innerHTML;
        this.innerHTML=tag.split("点击删除")!=null?tag.split("点击删除")[0]:tag;
    }
    buttons.onclick=function () {
        var tag=this.innerHTML;
        var remove=tag.split("点击删除")!=null?tag.split("点击删除")[0]:tag;
        removeButton(remove,tagGroup);
        render(tagGroup,"tag_show")
    }
}
function removeButton() {
    var tagName=Array.prototype.shift.call(arguments).trim();
    var tagArr=Array.prototype.shift.call(arguments);
    if(tagArr!=null){tagArr=[];}
    var len=tagArr.length;
    for(var i=0;i<len;i++)
        if(tagArr[i]===tagName){
            tagArr.splice(i,1);
        }

}
function addBtnEvent() {

    
    var TagEvent=document.getElementById("tag_input_text");
    TagEvent.onkeyup=function (e) {
        var text=this.value.trim().split(/,|，|、|\s|\n|\r|\t/);
        if(/(,| |\，)$/.test(text)||e.keyCode===13){
            text.forEach(function (d) {
                repeatmove(d,tagGroup);
            })

            render(tagGroup,"tag_show");

        }
    }

    var confirm=document.getElementById("interest_btn");
    confirm.onclick=function () {
        textSplit();
        render(interestArrGlobal,"interest_show")
    }
}
addBtnEvent();
