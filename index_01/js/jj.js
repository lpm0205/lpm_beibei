/**
 * Created by Administrator on 2016/9/21.
 */

function lunbo(n){
        var _ban=document.getElementById("banner");                                     //获取最大banner
        var _img=document.getElementById("banner").getElementsByTagName("img")[0];      //获取小banner里的图片
        var _li=document.getElementById("banner").getElementsByTagName("p");            //获取下面的p
        var _timer=0;
        var _opacity=0;
        var _index=1;
        var c=0;
        var arr=["#dcf2ff","#fff0b9","#fd6c7b"];                                                  //将背景图片存入数组
        //console.log(_img);
        //图片淡入淡出效果
        function exc(_index) {
            //console.log(_li.length);
            for(var i = 0; i < _li.length;i++){
                _li[i].className = '';
            }
            _img.src = "img/banner" + (_index ) + ".jpg";
            _li[_index].className="active";

            _ban.style.backgroundColor=arr[_index];
            function danru() {
                _opacity += 0.05;
                _img.style.opacity = _opacity;
                if (_opacity >= 1) {
                    clearTimeout(_timer);
                    return;
                }
                _timer = setTimeout(danru, 30);
            }
            _opacity = 0;
            danru();
        }
        var index = 0;
        exc(index);
        //每过3秒就换一次图片
        function carousel(){
            index ++;
            if(index == 3){
                index = 0;
            }
            exc(index);
        }
        var timer = setInterval(carousel, 3000);
        //鼠标移入移除事件
        function point() {
            for (var i = 0; i < _li.length; i++) {
                _li[i].index = i;
                _li[i].onmouseover = function () {
                    clearInterval(timer);
                    exc(this.index);
                };
                _li[i].onmouseout = function(){
                    index = this.index;
                    timer =setInterval(carousel, 3000);
                }
            }
        }
        point();
    }
function message() {
        //
        function nodeReader(index,_tmall){
            var k="1000"+index;
            console.log(k);
            var _msg_r=document.getElementById("msg_r");
            var a_list="";
            for(var key in _tmall){
                //console.log(key);
                if(k==key){
                    //console.log(k==key);
                    for(var key1 in _tmall[key]["children"]){
                        //console.log(_tmall[key]["children"][key1]["name"]);
                        //console.log(_tmall[key]["address"]);
                        a_list+="<li><img src=\'img/"+_tmall[key]["address"] +".jpg\'/>"+"<p>"+_tmall[key]["children"][key1]["name"]+"</p>";
                        /*
                        for(var key2 in _tmall[key]["children"][key1]["children"]){
                            a_list+="<a href=\"#\">"+_tmall[key]["children"][key1]["children"][key2]["name"]+"</a>";
                        }
                        */
                        a_list+="</li>";
                    }
                }

            }
            _msg_r.innerHTML=a_list;
            a_list=null;
        }
//style=\"color:"+_tmall[key]["color"]+";\" href=\"#\"

//加入到左边

        function dataReader(_tmall) {
            var _msg=document.getElementById("msg");
            var _fu=document.getElementById("json_fl");
            var k = 0;
            var a_list = "";
            for (var key in _tmall) {
                a_list += "<li>" + _tmall[key]["name"] + "</li>";
            }
            var _ul2 = document.getElementById("msg_l");
            _ul2.innerHTML = a_list;
            a_list = null;
            for (var i = 0; i < _ul2.children.length; i++) {
                _ul2.children[i].index = i;
                _ul2.children[i].onmouseover = function () {
                    for (var k = 0; k < this.children.length; k++) {

                        this.children[k].style.color = "#000;"
                    }
                    this.style.background = "#fff";
                    _msg.style.display = "block";

                    nodeReader((this.index+1), _tmall);
                };
/*                _fu.onmouseleave = function (e) {
                    _msg.style.display = "none";
                };*/
                _ul2.children[i].onmouseout = function () {
                    this.style.background = "#f9f9f9";
                }
            }
        }

        ajaxRequest("post", "josn/json.json", null, function (data) {
            var _tmall = JSON.parse(data);
            //console.log(_tmall);

            dataReader(_tmall);
        }, true);
    }
function  message2(){
    function dataReader(_food) {
        var _product=document.getElementById("product");
        var _list="";
        var _timer=null;
        for(var key in _food){
            //console.log(_food[key]);
            _list="<a class='food' href='../list_04/list.html'>" +
                        "<img src='pro_img/" + _food[key]["src"] + ".jpg'/>" +
                        "<div id='import'>" +
                            "<div class='time'></div>"+
                            "<h3>"+ _food[key]["name"] +"</h3>" +
                            "<p>"+ _food[key]["message"] +"</p>"+
                            "<span>"+ _food[key]["dazhe"] +"</span>"+
                        "</div>"+
                    "</a>";
            _product.innerHTML+=_list;
        }
        $(".food").hover(function(){
            $(this).find("span").css({"background":"#ff4965","color":"#fff"})
        },function(){
            $(this).find("span").css({"background":"#fff","color":"#ff4965"})
        });
    }


    ajaxRequest("post", "josn/pro.json", null, function (data) {
        var _food = JSON.parse(data);
        dataReader(_food);
    }, true);

}
function showtime(){
    var endtime=new Date("2016/10/1,12:20:20");            //活动结束时间
    var nowtime=new Date();
    //console.log(endtime.getTime());
    var lefttime=parseInt((endtime.getTime()-nowtime.getTime())/1000);
    //console.log(endtime.getTime()-nowtime.getTime()/1000);
    var d=parseInt(lefttime/(24*60*60));
    var h=parseInt(lefttime/(60*60)%24);
    var m=parseInt(lefttime/60%60);
    var s=parseInt(lefttime%60);
    //向每个div中添加数据
    var oDiv=document.getElementsByClassName("time");
    for(var i=0;i<oDiv.length;i++){
        oDiv[i].innerHTML="<b>活动剩余时间</b>"+d+"天"+h+"小时"+m+"分"+s+"秒";
        if(lefttime<=0){
            oDiv[i].innerHTML="团购结束";
        }
    }
    setTimeout(showtime,500)
}

window.onload=function(){
    lunbo();  //轮播
    message();  //加入菜单json
    message2(); //加入商品json
    showtime(); //倒计时
};