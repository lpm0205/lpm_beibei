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
function county(_p,_c,_data){
    var _county=document.getElementById("loc_town");
    var _options="";
    for(var i=0;i<_data["regions"][_p]["regions"][_c]["regions"].length;i++){
        _options+="<option>"+_data["regions"][_p]["regions"][_c]["regions"][i]["name"]+"</options>"
    }
    _county.innerHTML=_options;
}
function city(_p,_data){
    var _city=document.getElementById("loc_city");
    var _county=document.getElementById("loc_town");        //镇

    var _options="";
    for(var i=0;i<_data["regions"][_p]["regions"].length;i++){
        _options += "<option>" + _data["regions"][_p]["regions"][i]["name"] + "</option>"
    }
    _city.innerHTML=_options;
    _city.onchange=function(){
        var _c=-1;
        for(var i=0;i<this.children.length;i++){
            if(this.children[i].selected){
                _c=i;
                console.log(_c);
                _county.innerHTML= "<option>" + _data["regions"][_p]["regions"][_c]["name"] + "</option>"
                break;
            }
        }
        county(_p,_c,_data);

    }
}
function obtainProvince(){
    ajaxRequest("post","json/cityName.json",null,function(data){
        //console.log(data);
        var _data=window.eval("("+data+")");            //转化为对象
        //console.log(_data);
        var _province=document.getElementById("loc_province");
        var _options="";
        for(var i=0;i<_data["regions"].length;i++){
            _options += "<option>" + _data["regions"][i]["name"] + "</option>"
        }
        _province.innerHTML=_options;
        //_data["regions"][0].selected;
        _province.onchange=function(){
            var _p=-1;
            for(var i=0;i<this.children.length;i++){
                if(this.children[i].selected){
                    _p=i;
                    break;
                }
            }
            city(_p,_data);
        }
    },true);
}
window.onload=function(){
    message();
    obtainProvince();
};