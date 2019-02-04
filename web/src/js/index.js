/**
 * 实现燥点效果关键代码
 */
var canvasNoise = (function(document, window) {
    "use strict";

    var defaults = {
        // canvas实际宽度，如果没有设置，就按照载入页面的canvas可视宽度作为其宽度
        width: 0,
        // 上面注释所有“宽度”换成“高度”
        height: 0,
        // 噪点重复单元片段的宽度和高度
        pieceWidth: 100,
        pieceHeight: 100,
        // 噪点的尺寸大小
        pixelWidth: 0.5,
        pixelHeight: 0.5
    };

    // 绘制一个噪点片段
    // 原因在于：
    // 如果满屏绘制，性能会很差
    // 像墙面的瓷砖一样，只要弄一个，其他再重复拼起来就可以
    var canvasPiece = function(options) {
        var canvas = document.createElement('canvas'), context = canvas.getContext('2d');
        // 尺寸
        var pieceWidth = options.pieceWidth, pieceHeight = options.pieceHeight;
        // 像素点大小
        var pixelWidth = options.pixelWidth, pixelHeight = options.pixelHeight;

        // 在特定的小尺寸上，绘制满满的随机灰色系的颜色
        for(var y = 0; y < pieceHeight; y+=pixelHeight){
            for(var x = 0; x < pieceWidth; x+=pixelWidth) {
                var color = Math.floor(Math.random() * 150);
                context.fillStyle = "rgba(" + color + "," + color + "," + color + ",1)";
                context.fillRect(x, y, pixelWidth, pixelHeight);
            }
        }
        return canvas;
    };

    // 根据上面绘制的噪点片段拼接成一个大的完整的噪点效果
    var draw = function(canvas, options) {
        // 片段噪点canvas
        var piece = canvasPiece(options);

        // 这里的canvas参数就是页面中的canvas啦
        var context = canvas.getContext('2d');
        // 根据尺寸算出需要多少个片段可以拼出来
        var width = options.width, height = options.height;
        var pieceWidth = options.pieceWidth, pieceHeight = options.pieceHeight;

        // 片段个数
        var tileNumH = Math.ceil(width / pieceWidth),
            tileNumV = Math.ceil(height / pieceHeight);

        // 使用drawImage方法把片段噪点一个一个绘制到大的画布上
        for(var x = 0; x < tileNumH; x++) {
            for(var y = 0; y < tileNumV; y++) {
                context.drawImage(
                    // 被用来复制的片段canvas图形
                    piece,
                    // 拿来绘制的画布的起始点和区域大小
                    0, 0,
                    pieceWidth, pieceHeight,
                    // 当前画布绘制的起始点和区域大小
                    x * pieceWidth,
                    y * pieceHeight,
                    pieceWidth,
                    pieceHeight
                );
            }
        }

    };

    return function(canvas, options) {
        // 下面这么多行就是参数的合并什么的
        var params = {};
        options = options || {};
        for (var key in defaults) {
            params[key] = options[key] || defaults[key];
        }

        if (!params.width) {
            params.width = canvas.clientWidth;
        }
        if (!params.height) {
            params.height = canvas.clientHeight;
        }

        // 设定尺寸，避免拉伸
        canvas.width = params.width;
        canvas.height = params.height;

        // 噪点画起来
        draw(canvas, params);
    };
})(document, window);

// IE9+浏览器才支持canvas，因此，忽略IE8-
if ([].map) {
    var canvas = document.querySelector('#nosicCanvas');
    canvasNoise(canvas, {
        pieceWidth: 300,
        pieceHeight: 150
    });
}
// 燥点效果结束
/*************华丽的分界线***************/
var doing = document.getElementById('do');
doing.onclick = function () {
    doing.className = 'active';
    window.location.href = 'home.html';
}
//get mouse position info
function mousePosition(e){
    if(e.pageX || e.pageY){  //ff,chrome等浏览器
        return {x:e.pageX ,y:e.pageY};
    }else{
        return {  //ie浏览器
            x:e.clientX + document.body.scrollLeft - document.body.clientLeft,
            y:e.clientY + document.body.scrollTop - document.body.clientTop
        };
    }
}
//window mouse move event
var windowWidth = document.body.clientWidth;
var widoowHeight = document.body.clientHeight;
var scale = document.getElementById('scala');
var mm = document.getElementById('mouseMove');
window.onmousemove = function (e) {
    var position = mousePosition(e);
    mm.className = 'show';
    mm.style.left = (position.x - 360) + 'px';
    mm.style.top = (position.y - 360) + 'px';
    if(position.x < windowWidth/2 && position.y < widoowHeight/2){
        scale.className = 'radar leftTop';
    }
    if(position.x < windowWidth/2 && position.y > widoowHeight/2){
        scale.className = 'radar leftBottom';
    }
    if(position.x > windowWidth/2 && position.y < widoowHeight/2){
        scale.className = 'radar rightTop';
    }
    if(position.x > windowWidth/2 && position.y > widoowHeight/2){
        scale.className = 'radar rightBottom';
    }
}
//render radar
renderRadar(windowWidth);
function renderRadar(screenWidth) {
    screenWidth = screenWidth * 0.75;//scala 0.75
    var arr = [
        {size:screenWidth * 1,margin:0},
        {size:screenWidth * 0.8333,margin:0},
        {size:screenWidth * 0.75,margin:0},
        {size:screenWidth * 0.625,margin:0},
        {size:screenWidth * 0.5,margin:0},
        {size:screenWidth * 0.4792,margin:0},
        {size:screenWidth * 0.375,margin:0},
        {size:screenWidth * 0.25,margin:0},
        {size:screenWidth * 0.625,margin:(screenWidth * 0.625)/2},
        {size:screenWidth * 0.1718,margin:(screenWidth * 0.1718)/2},
        {size:screenWidth * 0.1718,margin:(screenWidth * 0.1718)/2},
        {size:screenWidth * 0.1718,margin:(screenWidth * 0.1718)/2},
        {size:screenWidth * 0.1718,margin:(screenWidth * 0.1718)/2},
    ];
    var fgt = document.createDocumentFragment();
    for(var i=0;i<arr.length;i++){
        var item = document.createElement('div');
        item.style.width = arr[i].size +'px';
        item.style.height = arr[i].size +'px';
        item.style.marginLeft = '-' + arr[i].margin +'px';
        item.style.marginTop = '-' + arr[i].margin +'px';
        fgt.appendChild(item);
    }
    scale.appendChild(fgt);
}