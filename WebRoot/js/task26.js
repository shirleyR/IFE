/**
 * Created by rsl_pc on 2016/6/3.
 */
var ship=function (id) {
    this.id=id;
    this.state='stop';
    this.power=0;
    this.degree=0;
    this.orient;
}
ship.prototype={
   dynamicManager:function () {
        var flying=function () {
            this.degree+=10;
            this.power-=5;
            this.state='fly';
            if(this.power<=0)this.state='stop';

        };
       var stop=function () {
            this.state='stop';
       }
       return {
           fly:flying(),
           stop:stop()
       }
    },
    energyManager:function () {
        this.power+=10;
    },
    destroyManager:function () {
        this.state="destory";
    },
    receiveManager:function (message) {
        if(message==='stop'){
            this.dynamicManager.stop();
        }
        if(message==='fly'){

            if(this.power<=0){this.state='stop';return ;}
            this.dynamicManager.fly();

        }
        if(message==='destory'){
            this.destroyManager();
        }
    }
}

var Mediator=function () {
    this.ships;
    this.command;

}

Mediator.prototype={
        createObj:function (obj) {
            if(obj==="ship"){
                if(!this.ships){
                    this.ships=[];
                }
                this.ships.push(obj);
            }else{

                this.command=obj;
                this.command.ships=this.ships;
            }
        },
    recevie:function (mess,from,to) {
        if(Math.random()>0.3){
             if(to){
                // single direction


             }else{
                 for(var i=0;i<this.ships.length;i++){
                  if(this.ships[i].state==='destroy'){
                      continue;
                  }
                     if(this.ships[i].id===from){
                      this.ships[i].receiveManager(mess);
                    }
                 }
             }
        }
    }
}


var Command=function () {
    this.command;
    this.ships=[];
}




// 指挥官如何发布信息给Mediator

var comand=new Command();

var mediator=new Mediator();

// 如何创建 事件之间的关联
// 如何将视图和控制模块绑定



