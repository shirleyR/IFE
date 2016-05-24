define(function (require,exports,module) {
    var $=require('jquery');
    var d3=require("d3");

    var div=document.createElement("div");
    div.style.width=100+'px';
    div.style.height=200+'px';
    div.style.background="red";
    div.className="divs";
    document.body.appendChild(div);
    d3.selectAll(".divs")
        .style("background","blue");

})