/**
 * Created by rsl_pc on 2016/6/2.
 */
/**
 * @param {number[][]} matrix
 * @return {number}
 */
var longestIncreasingPath = function(matrix) {

    var row=matrix.length;
    var cow=row>0?matrix[0].length:0;
    if(row==1&&cow==1)return 1;
    if(row<1||cow<1)return 0;
    var dp=new Array(row+1);
    var i=0;
    for(;i<row+1;i++)
    {    dp[i]=new Array(cow+1);
        for(var k=0;k<cow+1;k++)
            dp[i][k]=0;
    }
    var max=0;
    for(i=0;i<row;i++){
        for(var j=0;j<cow;j++)
        {
            var ret=dfs(i,j);
            max=ret>max?ret:max;

        }
    }

    function dfs(posX,posY){
        if(posX>row-1||posY>cow-1)return 0;
        if(posX<0||posY<0)return 0
        // having
        if(dp[posX+1][posY+1]>0)  return dp[posX+1][posY+1];
        var posR=posY<cow-1?matrix[posX][posY]<matrix[posX][posY+1]?dfs(posX,posY+1):0:0;
        var posL=posY>0?matrix[posX][posY]<matrix[posX][posY-1]?dfs(posX,posY-1):0:0;
        var posU=posX>0?matrix[posX][posY]<matrix[posX-1][posY]?dfs(posX-1,posY):0:0;
        var posD=posX<row-1?matrix[posX][posY]<matrix[posX+1][posY]?dfs(posX+1,posY):0:0;
        if(posL>=posU&&posL>=posD&&posL>=posR){
            dp[posX+1][posY+1]+=posL+1;
        }else if(posR>=posU&&posR>=posD&&posR>=posL){

            dp[posX+1][posY+1]+=posR+1
        } else if(posU>=posL&&posU>=posD&&posU>=posR){
            dp[posX+1][posY+1]+=posU+1;
        }else{
            dp[posX+1][posY+1]+=posD+1;
        }

        return dp[posX+1][posY+1];
    }
    return max;
};

var matrix=[[7,7,5],[2,4,6],[8,2,0]];
longestIncreasingPath(matrix)