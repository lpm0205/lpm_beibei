/**
 * Created by Administrator on 2016/9/19.
 */
//公用
$(function(){
    //搜索图标
    $("#s1").mouseenter(function(){
        $(this).hide();
        $("#s2").show();
    });
    $("#s2").mouseleave(function(){
        $("#s1").show();
        $(this).hide();
    });
    $("#lianxi").mouseenter(function(){
        $("#ption_1").show();
        $(this).css({ "background":"#fff", "border":"1px solid #000"});

    });
    $("#lianxi").mouseleave(function(){
        $("#ption_1").hide();
        $("#lianxi").css({ "background":"#f4f4f4", "border":"0"});
    });

    $("#guanzhu").mouseenter(function(){
        $("#ption_2").show();
        $(this).css({"background":"#fff","border":"1px solid #000"});

    });
    $("#guanzhu").mouseleave(function(){
        $("#ption_2").hide();
        $("#guanzhu").css({ "background":"#f4f4f4", "border":"0"});
    });
    //年龄
    $("#age").mouseenter(function(){
        $("#age_div").show();
    })
    $("#age").mouseleave(function(){
        $("#age_div").hide();
    })
    $("#json_fl").mouseenter(function(){
        $("#msg").show();
    });
    $("#json_fl").mouseleave(function(){
        $("#msg").hide();
    });
    /**
     * 以上是公用部分
     *
     * ***/
});
$(function(){

    var _register=$.cookie("registerUsers");
    var _registerObj=convertStrToObj(_register);
    var _login= $.cookie("loginedUser");
    if(_login in _registerObj){                                                             /**判断登录的用户是否在注册的用户对象里，如果没有就跳到登录页**/
        if(judge(_registerObj[_login]["_goods"])==false){                        //如果一个货物也没有，就出来一个div框
            $("#has_good").hide();
            $("#no_good").show();

        }else{                                                                   //如果有货物，就获取货物的属性
            if(checkCookie("sp1")){                                                 /**判断如果在cookie中能找到每个商品的id就进行下面的添加购物车操作**/
                var _mygood=_registerObj[_login]["_goods"]["sp1"];
                var _goodSrc=_mygood.src;                          //设置商品的图片
                var _goodName=_mygood.name;                         //设置商品的姓名
                var _goodColor=_mygood.color;                    //设置商品颜色
                var _goodSize=_mygood.size;                       //设置商品尺码
                var _goodNumber=_mygood.number;                    //设置商品的数量
                var _goodPrice=_mygood.price;                 //设置商品的价格
                var _list="";
                _list="<tr class='lab'>"+
                    "<td class='t_first'><input type='checkbox' class='cbox' checked='checked'></td>"+
                    "<td class='t_second'><div class='td_img'><img src='"+_goodSrc+"'/></div>" +
                    "<a href='../list_04/list.html'>"+_goodName+"</a>"+
                    "</td>"+
                    "<td class='t_third'>尺寸："+_goodSize+"<br/>颜色"+_goodColor+"</td>"+
                    "<td class='t_fourth'>"+_goodPrice+"</td>"+
                    "<td class='t_fiveth'>"+
                    "<span class='sub'>-</span>"+
                    "<span class='num'>1</span>"+
                    "<span class='add'>+</span>"+
                    "</td>"+
                    "<td class='t_sixth'></td>"+
                    "<td class='t_seventh'><a href='javascript:void(0);'>删除</a></td>";
                $("tbody").append(_list);                                                        /**填入静态页面完成后:**/
                //把默认的数量乘以钱数放到右边的小计里
                $(".num").html(_goodNumber);                                        //将数量放入到.num标签
                var _countNum=parseInt($(".num").html());
                $(".num").parent().next().html(_countNum * _goodPrice  + '.00');   //获得小计
                //遍历每一个默认为1数量的商品的总价
                var inner="";
                $(".t_sixth").each(function(){
                    inner+=parseInt($(this).html());
                });
                $(".changePrice").html(inner);                                  //获得总计
                $(".sub").click(function(){
                    var _num=$(this).parent().find($(".num"));
                    var _countNum=parseInt($(this).parent().find($(".num")).html());
                    if(_countNum==1){
                        alert("请至少选一件!");
                    }else{
                        _countNum-=1;
                        _num.html(_countNum);
                        var _registerStr = $.cookie("registerUsers");                          //获取cookie然后将cookie的单价和现在的数量相乘
                        _registerObj = convertStrToObj(_registerStr);
                        $(this).parent().next().html(_countNum * _registerObj[_login]["_goods"]["sp1"]["price"]  + '.00');
                        _registerObj[_login]["_goods"]["sp1"]["number"]=_countNum;              //改变数量后将新的数量存进cookie中
                        var usersStr =convertObjToStr(_registerObj);
                        $.cookie("registerUsers",usersStr,{expires:7,path:"/"});
                        var inner="";
                        $(".t_sixth").each(function(){
                            inner+=parseInt($(this).html());
                        });
                        $(".changePrice").html(inner);
                    }
                });
                $(".add").click(function(){
                    var _num=$(this).parent().find($(".num"));
                    var _countNum=parseInt($(this).parent().find($(".num")).html());
                    _countNum+=1;
                    _num.html(_countNum);
                    var _registerStr = $.cookie("registerUsers");                          //获取cookie然后将cookie的单价和现在的数量相乘
                    _registerObj = convertStrToObj(_registerStr);
                    $(this).parent().next().html(_countNum * _registerObj[_login]["_goods"]["sp1"]["price"]  + '.00');
                    _registerObj[_login]["_goods"]["sp1"]["number"]=_countNum;
                    var usersStr =convertObjToStr(_registerObj);
                    $.cookie("registerUsers",usersStr,{expires:7,path:"/"});
                    /**下面的总价**/
                    var inner="";
                    $(".t_sixth").each(function(){
                        //找到每个小计同级的.num元素
                        inner+=parseInt($(this).html());
                    });
                    $(".changePrice").html(inner);
                });
                /**点击删除，从cookie中删除此商品所有信息**/
                $(".t_seventh a").click(function(){
                    var _registerStr = $.cookie("registerUsers");                          //获取cookie然后将cookie的单价和现在的数量相乘
                    _registerObj = convertStrToObj(_registerStr);
                    $(this).parent().parent().remove();
                    delete _registerObj[_login]["_goods"]["sp1"];
                    console.log(_registerObj[_login]);
                    var usersStr =convertObjToStr(_registerObj);
                    $.cookie("registerUsers",usersStr,{expires:7,path:"/"});
                });

            }
        }
    }else{
        alert("请登录");
        window.open("../login_06/login.html");
    }

});

/***用来判断对象是否为空，若为空则返回false，如果不为空返回true***/
function judge(obj){
    for(var i in obj){//如果不为空，则会执行到这一步，返回true
        return true;
    }
    return false;
}
function checkCookie(name){
    var c = document.cookie.indexOf(name);
    if(c!=-1){
        return true;
    }else{
        return false;
    }
}