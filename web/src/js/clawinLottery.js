//clawin2 lottery page
var getEle = document.getElementsByClassName.bind(document);
var pointer = getEle('pointer')[0];
var zp = getEle('lotteryContent')[0];
var tip = getEle('lotteryTip')[0];
var lights = Array.prototype.slice.call(getEle('light'));
var currentDeg;
var onRotation = false; // 记录当前是否正在旋转，如果正在旋转，就不能继续点击了
var reward = ['thanks','10 gold','thanks','30 gold','thanks','50 gold'];

// 根据随机角度获取奖励
var getReward = (function() {
    currentDeg = 0;
    return function() {
        // 转三圈到四圈
        var rotateDeg = Math.random() * 360 + 1080;
        currentDeg += rotateDeg;
        var rewardText = reward[Math.floor((currentDeg + 18) % 360 / 36)];
        // console.log(rewardText);
        return {
            deg: currentDeg,
            text: rewardText === 'thanks' ? 'I`m so sorry' : rewardText
        }
    }
})();
// start
var lotteryEventStart = function(){
    zp.className = 'lotteryContent active';
    tip.className = 'lotteryTip';
    if (onRotation) return;
    // console.log('开始抽奖');
    onRotation = true;
    lights.forEach(function(light){
        light.className += ' light-twinkling';
    });
    var nextStatus = getReward();
    // console.log(nextStatus);
    pointer.style.transform = 'rotateZ('+nextStatus.deg+'deg)';
};
//end
var lotteryEventEnd = function(){
    zp.className = 'lotteryContent';
    tip.className = 'lotteryTip active';
    // console.log('抽奖结束');
    setTimeout(function(){// 等闪烁三下结束
        onRotation = false;
        lights.forEach(function(light){
            light.className = 'light';
        });
    },300);
};

zp.addEventListener('click',function () {
    lotteryEventStart();
});
pointer.addEventListener('click',function () {
    lotteryEventStart();
});

zp.addEventListener('transitionend', function(){
    lotteryEventEnd();
});
pointer.addEventListener('transitionend', function(){
    lotteryEventEnd();
});