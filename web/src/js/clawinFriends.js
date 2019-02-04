var friendsConfig = [
    {
        title:'Pokonyan',
        desc:'Plush dolls <br/> 20-25CM',
        imgPath:'./assets/images/clawin/friends1.png'
    },
    {
        title:'Panda from China',
        desc:'Plush dolls <br/> 20-25CM',
        imgPath:'./assets/images/clawin/friends2.png'
    },
    {
        title:'Husky Dog',
        desc:'Plush dolls <br/> 22CM',
        imgPath:'./assets/images/clawin/friends3.png'
    }
    ,
    {
        title:'Tibbers',
        desc:'Cosplay plush dolls <br/> 30CM',
        imgPath:'./assets/images/clawin/friends4.png'
    },
    {
        title:'Espeon',
        desc:'plush dolls <br/> 20-22CM',
        imgPath:'./assets/images/clawin/friends5.png'
    },
    {
        title:'Togepi',
        desc:'Plush dolls <br/> 22CM',
        imgPath:'./assets/images/clawin/friends6.png'
    }
];
var current = 0;//当前第几张
var interval = null;
window.onload = function(){
    renderFriendsBox(friendsConfig[current]);

    interval = setInterval(function () {
        changeFriends('next');
    },3000);
}
//渲染娃娃机盒子
function renderFriendsBox(dataItem) {
    if(!dataItem){
        return;
    }
    var box = document.getElementById('friendsBox');
    box.innerHTML = '';
    var template = '<div class="friendsText">\n'+
    '                    <h3>'+dataItem.title+'</h3>\n'+
    '                    <p>'+dataItem.desc+'</p>\n'+
    '               </div>\n'+
    '               <div class="friendsImgs friendsImgOne">\n'+
    '                   <img src="'+dataItem.imgPath+'">\n'+
    '               </div>';
    box.innerHTML = template;
}
function changeFriends(type) {
    if(type == 'prev'){
        current--;
        if(current == -1){
            current = friendsConfig.length - 1;
        }
    }
    if(type == 'next'){
        current++;
        if(current == friendsConfig.length){
            current = 0;
        }
    }
    renderFriendsBox(friendsConfig[current]);
}