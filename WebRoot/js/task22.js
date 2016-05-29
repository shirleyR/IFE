/**
 * Created by admin on 2016/5/29.
 */

function Event(){
    var control=document.getElementsByClassName("control");
    control.onclick=function(e){
        if(e.target.nodeName=='Button'){
            var btn=e.target.nodeValue;
            if(btn=='preBtn'){

                preOrder(root);
            }else if(btn=='inBtn'){
                inOrder(root);
            }else {
                posOrder(root);
            }

        }
    }
}
Event();
var root=document.getElementById("root_wrapper");
function preOrder(node){
    if(node==null)return;
    setTimeout(node.style.backgroundColor="blue",1000);
    node.style.backgroundColor="#fff";
    if(node.childElementCount>0){

        var child=node.firstElementChild;
        preOrder(child);
        preOrder(child.nextSibling);
    }

}
function inOrder(node){
    if(node!=null){
        var child=node.firstElementChild;
        inOrder(child);
        setTimeout(node.style.backgroundColor="blue",1000);
        node.style.backgroundColor="#fff";
        inOrder(child.nextSibling);
    }

}

function posOrder(node){
    if(node!=null){
        var child=node.firstElementChild;
        posOrder(child);
        setTimeout(node.style.backgroundColor="blue",1000);
        posOrder(child.nextSibling);
    }
}