/*
*   josn列表数据添加数据
*
*/
    function message() {
        //
        function nodeReader(index,_tmall){
            var k="1000"+index;
            //console.log(k);
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
                    //console.log(0);
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

        ajaxRequest("post", "json/json.json", null, function (data) {
            var _tmall = JSON.parse(data);
            //console.log(_tmall);
            //console.log(_tmall);
            dataReader(_tmall);
        }, true);
    }



/*
     显示剩余时间
 */
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
    var oDiv=document.getElementById("t_time");
    if(lefttime<=0){
        oDiv.innerHTML+="团购结束";
    }else{
        oDiv.innerHTML="<p><span>活动剩余时间</span>"+d+"天"+h+"小时"+m+"分"+s+"秒"+"</p>";
    }
    setTimeout(showtime,500)
}

window.onload=function(){
    message();
    //showtime();
};