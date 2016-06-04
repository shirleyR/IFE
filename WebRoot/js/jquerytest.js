/**
 * Created by rsl_pc on 2016/5/30.
 */
jQuery.Callbacks=function (flags) {
    var list=[],
        stack=[],
        memory,firing,firingStart,firingLength,firingIndex,
        fir=function (context,args) {
            args=args||[];
            memory=!flags.memory||[context,args];
            firing=true;
            firingIndex=firingStart||0;
            firingLength=list.length;
            for(;list&&firingIndex<firingLength;firingIndex++){
                if(list[firingIndex].apply(context,args)===false&&flags.stopOnFalse){
                    memory=true;
                    break;
                }
            }
            firing=false;
            if(list){
                if(!flags.once){
                    if(stack&&stack.length){
                        memory=stack.shift();
                        self.fireWith(memory[0],memory[1]);

                    }
                }else if(memory===true){
                    self.disable();
                }else
                    list=[];
            }
        },
        self={
            disable:function () {
                list=stack=memory=undefined;
                return this;
            }
        }
}
jQuery.extend({
    Deferred:function (func) {
    //    成功回调函数列表
        var doneList=jQuery.Callbacks("once memory"),
            failList=jQuery.callback("once memory"),
            progressList=jQuery.callback("memory"),
            state="pending",
            lists={
                resolve:doneList,
                reject:failList,
                notify:progressList
            },
            promise={

            },
            //asy queue
            deferred=promise.promise({}),
            key;
        for(key in lists){
            deferred[key]=lists[key].fire;
            deferred[key+"Width"]=lists[key].fireWith;

        }
        deferred
            .done(function () {
               state="resolved";
              },failList.disable,progressList.lock)
            .fail(function () {
                state="rejected";
            },doneList.disable,progressList.lock)

        if(func)
            func.call(deferred,deferred);
        return deferred;

    }
})



jQuery.extend({
    cache:{},
    uuid:0,
    expando:{},
    hasData:function (elem) {
        
    },
    data:function (elem,name,data,pvt) {
        if(!cache[id]){
            cache[id]={};
            if(!isNode){
                cache[id].toJSON=jQuery.noop;
            }
        }
        if(typeof name==="object"||typeof name==="function"){
            if(pvt){

            }else {
                
            }
        }
    },
    remove:function (elem,name,pvt) {
        
    },
    _data:function (elem,name,data) {
        
    },
    acceptData:function (elem) {
        
    }
    
    
})

jQuery.fn.extend({
    data:function (key,value) {

    },
    removeData:function (key) {

    }

})