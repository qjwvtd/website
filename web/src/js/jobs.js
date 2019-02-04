// {
//     "code": 0,0成功，-1失败
//     "msg": "",消息
//     "count": 2,数据量
//     "data": [ 数据集合
//     {
//         "id": id
//         "recruit_position": 招聘职位,
//         "recruiting_numbers": 招聘人数,
//         "working_place": 工作地点,
//         "employment_nature": 招聘性质,
//         "age": 年龄,
//         "employ_description": 招聘说明,
//         "post_duties": 岗位职责,
//         "sex": 性别,
//         "education": 学历,
//         "professional_skills":专业技能,
//         "work_experience": 工作经验,
//         "key_capabilities": 关键胜任能力,
//         "duty_time": 最迟到岗时间,
//         "salary_range": 薪酬,
//         "create_time": 创建时间,
//         "update_time": 修改时间
//     }
// ]
// }

// 获取所有职位信息
$.ajax({
    url: webRoot + '/recruit/outlist',
    type: 'get',
    data: {page: 1, limit: 20},
    dataType: 'json',
    success: function (data) {
        if(data.data.length == 0 || data.code != 0){
            getDomNode('jobList').innerText = 'response data empty!';
            return;
        }
        renderJobList(data.data);
    },
    error: function (xhr, status, error) {
        throw new Error(xhr, status, error);
    }
});
//模态构造函数
function Modal(){
    this.modal = document.getElementById('modal');
}
Modal.prototype.open = function(){
    this.modal.className = 'modal active';
}
Modal.prototype.close = function(){
    this.modal.className = 'modal';
}
Modal.prototype.closeBtn = document.getElementById('closeModal');
//创建实例
var modal = new Modal();
// 关闭模态
var close = modal.closeBtn;
close.onclick = function () {
    modal.close();
}
//函数：渲染职位list
function renderJobList(dataList) {
    //dataList 必须是一个数组
    var listUl = getDomNode('jobList');
    var fgt = document.createDocumentFragment();
    if(dataList.length == 0){
        return;
    }
    for(var i = 0;i < dataList.length; i++){
        var itemLi = document.createElement('li');
        itemLi.innerHTML = '<a href="#modal">'+dataList[i].recruit_position+'<span></span></a>';
        (function (item,itemData,index) {
            item.onclick = function(){
                setItemClassNameActive(index);
                modal.open();
                renderJobDetail(itemData);
            }
        })(itemLi,dataList[i],i)
        fgt.appendChild(itemLi);
    }
    listUl.appendChild(fgt);
}
//函数：渲染职位详情
function renderJobDetail(option) {
    var desc = getDomNode('jobDescription');
    var template = '<p><b>招聘人数:</b>'+option.recruiting_numbers+'</p>\n'+
        '                    <p><b>工作地点:</b>'+option.working_place+'</p>\n'+
        '                    <p><b>工作性质:</b>'+option.employment_nature+'</p>\n'+
        '                    <p><b>年龄:</b>'+option.age+'</p>\n'+
        '                    <p><b>性别:</b>'+option.sex+'</p>\n'+
        '                    <p><b>学历:</b>'+option.education+'</p>\n'+
        '                    <p><b>岗位职责:</b>'+option.post_duties+'</p>\n'+
        '                    <p><b>工作经验:</b>'+option.work_experience+'</p>\n'+
        '                    <p><b>关键胜任能力:</b>'+option.key_capabilities+'</p>\n'+
        '                    <p><b>发布时间:</b>'+option.create_time.substr(0,10)+'</p>';
    desc.innerHTML = template;
}
//函数：设置item className
function setItemClassNameActive(index) {
    var listUl = getDomNode('jobList');
    var list = listUl.getElementsByTagName('li');
    for(var i=0;i<list.length;i++){
        list[i].className = i == index ? 'active' : '';
    }
}
