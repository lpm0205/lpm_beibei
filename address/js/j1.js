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
$(function() {
    backTopStyle();
    backTop();

    $(".main_pro li").click(function(){
        window.open("../product_05/product.html");
    });
    /**
     * 功能描述：右侧浮动div的鼠标滑过改变样式功能
     */

    function backTopStyle() {
        $('.toTop ul li').hover(function() {
            $(this).find('.first').css('display', 'none');
            $(this).find('.secound').css('display', 'block');
            $(this).find('.nochange i').css('color', '#fff');
            $(this).find('.nochange').css('display', 'block');
            $(this).css('background-color', '#ff4965');
        }, function() {
            $(this).find('.first').css('display', 'block');
            $(this).find('.secound').css('display', 'none');
            $(this).find('.nochange i').css('color', '#FF5482');
            $(this).css('background-color', '#fff');
        });
    }

    /**
     * 功能描述：点击’返回顶部‘，实现回到顶部的动画
     */
    function backTop() {
        $('.toTop ul li:last').on('click', function() {
            $('html, body').animate({scrollTop: 0}, 1000);
        });
    }

});
//添加数据
$(function(){
    addBuyMessage();
    addAddress();
    function addBuyMessage(){
        var _register=$.cookie("registerUsers");
        var _registerObj=convertStrToObj(_register);
        var _login= $.cookie("loginedUser");
        if(_login in _registerObj){                                                             /**判断登录的用户是否在注册的用户对象里，如果没有就跳到登录页**/
            if(judge(_registerObj[_login]["_goods"])==false){                        //如果一个货物也没有，就出来一个div框
                $(".table_style").hide();
                $(".no_goods").show();
            }else{
                $(".no_goods").hide();
                $(".table_style").show();
                if(checkCookie("sp1")){                                                 /**判断如果在cookie中能找到每个商品的id就进行下面的添加购物车操作**/
                var _mygood=_registerObj[_login]["_goods"]["sp1"];                      //如果有货物，就获取货物的属性
                    var _goodSrc=_mygood.src;                          //设置商品的图片
                    var _goodName=_mygood.name;                         //设置商品的姓名
                    var _goodColor=_mygood.color;                    //设置商品颜色
                    var _goodSize=_mygood.size;                       //设置商品尺码
                    var _goodNumber=_mygood.number;                    //设置商品的数量
                    var _goodPrice=_mygood.price;                 //设置商品的价格
                    //console.log(1);
                    //console.log(_goodColor);
                    $(".list").html(
                        "<td class='td_width'><div class='img_style'><img src='"+ _goodSrc+"'style='width: 70px;'/></div><a href='../list_04/list.html' class='hover_brand_name'>"+_goodName+"</a></td>"+
                        "<td style='text-align: left;'>尺寸："+_goodSize+"<br/><br/>颜色："+_goodColor+"</td>"+
                        "<td style='text-align: left;'>"+_goodNumber*_goodPrice+"</td>"+
                        "<td style='text-align: left;'>"+_goodNumber+"</td>"+
                        "<td class='small_sum' style='text-align: left; color: #FF4965; font-size: 18px;'>"+_goodNumber*_goodPrice+".00</td>"
                    );
                    /**填入静态页面完成后:**/
                    //遍历每一个默认为1数量的商品的总价
                    var inner="";
                    $(".small_sum").each(function(){
                        inner+=parseInt($(this).html());
                    });
                    $(".changePrice").html(inner);                                  //获得总计
                    $('.show_buy_price').html(inner + '.00');
                    var arr=['支付平台(支付宝)', '支付平台(微信支付)', '储蓄卡(招商银行)'];              //付款平台放在一个数组里
                    $('.account-list li').mouseover(function(){
                        var _index = $(this).index();
                        $(this).find("input").click(function(){
                            $('.choose_show').html('');
                            $('.choose_show').html(arr[_index]);
                        })

                    });
                }
            }
        }else{
            alert("请登录");
            window.open("../login_06/login.html");
        }
    }
    function addAddress(){
        /**样式改变**/
        $("#new_address").hover(function() {
            $(this).css('border','3px dashed #2a9ad2');
            $(this).children('a').css('color','#2a9ad2');
        }, function() {
            $(this).css('border','3px dashed #eee');
            $(this).children('a').css('color', '#999');
        });
        /**点击事件**/
        $("#new_address").click(function(){
            $(".back").show();
            $(".form_list").show();
        });




        function reloadAddress(){
            var key="";
            var _lastAddress="";
            var _register=$.cookie("registerUsers");
            var _registerObj=convertStrToObj(_register);
            var _login= $.cookie("loginedUser");
            /***用来删除对象属性***/
            /*  console.log(_registerObj[_login]["_addr"]._addressNaN);
             delete _registerObj[_login]["_addr"]._addressNaN;
             var usersStr =convertObjToStr(_registerObj);
             $.cookie("registerUsers",usersStr,{expires:7,path:"/"});*/
            if(_login in _registerObj){
                if(judge(_registerObj[_login]["_addr"])){
                    for(key in _registerObj[_login]["_addr"]){
                        console.log(0);
                        var _list="<li id=\'"+key+"\' style='display: block;' class='new_address old'>"+
                            "<div class='middel_conte'>"+
                            "<div class='address_nam'>"+
                            "<span class='get_name'>"+ _registerObj[_login]["_addr"][key]["myPerson"] +"</span>"+
                            "<span class='phone'>"+ _registerObj[_login]["_addr"][key]["myPhone"] +"</span>"+
                            "<span class='default_style'></span>"+
                            "</div>"+
                            "<div class='show_user_address'>"+
                            "<strong>寄送至</strong>"+
                            "<span class='address_one'>"+ _registerObj[_login]["_addr"][key]["myProvince"] +"</span>"+
                            "<span class='address_two'>"+ _registerObj[_login]["_addr"][key]["myCity"] +"</span>"+
                            "<span class='address_three'>"+ _registerObj[_login]["_addr"][key]["myTown"] +"</span>"+
                            "<span class='address_delita'>"+ _registerObj[_login]["_addr"][key]["myDetailedAddress"] +"</span>"+
                            "</div>"+
                            "<div class='address_footer'><a href='' class='remove'>删除</a></div>"+
                            "</div>"+
                            "</li>";
                        $(".ad_address").prepend(_list);
                    }

                    // console.log(key);
                    // if(key==""){

                    // }else{
                    _lastAddress="_address"+(parseInt(key.replace("_address",""))+1);
                    // }
                }else{
                    _lastAddress="_address1";
                }

            }else{
                alert("请登录");
                return;
            }
            //console.log(parseInt(key.replace("address","")));      //key=address3   3address
            return _lastAddress;
        }
        reloadAddress();
        /****获取最后一个地址并且+1做为下一个地址*****/
        function getLastAddress(){
            var key="";
            var _lastAddress="";
            var _register=$.cookie("registerUsers");
            var _registerObj=convertStrToObj(_register);
            var _login= $.cookie("loginedUser");
            /***用来删除对象属性***/
          /*  console.log(_registerObj[_login]["_addr"]._addressNaN);
            delete _registerObj[_login]["_addr"]._addressNaN;
            var usersStr =convertObjToStr(_registerObj);
            $.cookie("registerUsers",usersStr,{expires:7,path:"/"});*/
           if(_login in _registerObj){
                if(judge(_registerObj[_login]["_addr"])){
                    for(key in _registerObj[_login]["_addr"]){
                        //console.log(0);
                    }

                   // console.log(key);
                   // if(key==""){

                   // }else{
                        _lastAddress="_address"+(parseInt(key.replace("_address",""))+1);
                   // }
                }else{
                    _lastAddress="_address1";
                }

            }else{
                alert("请登录");
                return;
            }
            //console.log(parseInt(key.replace("address","")));      //key=address3   3address
             return _lastAddress;
        }
        //console.log(getLastAddress());

        /**点击确定是，新增加一个收货地址**/
        $("#btntext").click(function(){
                var _newAddress=getLastAddress();
                var _provinceName=$("#loc_province").val();
                var _cityName=$("#loc_city").val();
                var _townName=$("#loc_town").val();
                var _detailedAddress=$("#formm_content").val();
                var _zip=$("#zip").val();
                var _person=$("#nr").val();
                var _phone=$("#nb").val();
                //console.log(_detailedAddress);
                //把信息存入到cookie中
                //先取出cookie，转化为对象
                if(_newAddress==null || _provinceName==null || _cityName==null || _townName==null || _detailedAddress==null || _zip==null || _person==null || _phone==null){
                    alert("信息不能为空");
                    return;
                }
                var _register=$.cookie("registerUsers");
                var _registerObj=convertStrToObj(_register);
                var _login= $.cookie("loginedUser");
                if(_login in _registerObj){
                    //_register[_login]["_addr"]={};
                    _registerObj[_login]["_addr"][_newAddress]={
                        myProvince:_provinceName,
                        myCity:_cityName,
                        myTown:_townName,
                        myDetailedAddress:_detailedAddress,
                        myZip:_zip,
                        myPerson:_person,
                        myPhone:_phone
                    };
                    //把数据填入到cookie中后，就在页面生成一个收货地址
                    $(".back").hide();
                    $(".form_list").hide();
                    //添加新的收货地址
                    var _list="<li id=\'"+_newAddress+"\' style='display: block;' class='new_address old'>"+
                        "<div class='middel_conte'>"+
                        "<div class='address_nam'>"+
                        "<span class='get_name'>"+ _registerObj[_login]["_addr"][_newAddress]["myPerson"] +"</span>"+
                        "<span class='phone'>"+ _registerObj[_login]["_addr"][_newAddress]["myPhone"] +"</span>"+
                        "<span class='default_style'></span>"+
                        "</div>"+
                        "<div class='show_user_address'>"+
                        "<strong>寄送至</strong>"+
                        "<span class='address_one'>"+ _registerObj[_login]["_addr"][_newAddress]["myProvince"] +"</span>"+
                        "<span class='address_two'>"+ _registerObj[_login]["_addr"][_newAddress]["myCity"] +"</span>"+
                        "<span class='address_three'>"+ _registerObj[_login]["_addr"][_newAddress]["myTown"] +"</span>"+
                        "<span class='address_delita'>"+ _registerObj[_login]["_addr"][_newAddress]["myDetailedAddress"] +"</span>"+
                        "</div>"+
                        "<div class='address_footer'><a href='javascript:void(0);' class='remove'>删除</a></div>"+
                        "</div>"+
                        "</li>";
                    $(".ad_address").prepend(_list);
                    var usersStr =convertObjToStr(_registerObj);
                    $.cookie("registerUsers",usersStr,{expires:7,path:"/"});
                    window.location.reload();
                }else{
                    alert("请登录");
                    window.open("../login_06/login.html");
                }
        });
        /**点击删除**/
        $(".remove").click(function(){
            var _register=$.cookie("registerUsers");
            var _registerObj=convertStrToObj(_register);
            var _login= $.cookie("loginedUser");
            var _id=$(this).parent().parent().parent().attr("id");
            $(this).parent().parent().parent().remove();
            delete  _registerObj[_login]["_addr"][_id];
            var usersStr =convertObjToStr(_registerObj);
            $.cookie("registerUsers",usersStr,{expires:7,path:"/"});
        });
        /**点击获取地址**/
        $(".old").click(function(){
            //console.log(1);
            $(this).siblings().css({"border":"1px solid #ccc"});
            $(this).css({"border":"1px solid #ff5482"});
            var _name=$(this).find(".get_name").html();
            var _phone=$(this).find(".phone").html();
            var _addressOne=$(this).find(".address_one").html();
            var _addressTwo=$(this).find(".address_two").html();
            var _addressThree=$(this).find(".address_three").html();
            var _addressDelita=$(this).find(".address_delita").html();
            //console.log(_addressDelita);
            $(".address_1").html(_name);
            $(".address_2").html(_phone);
            $(".address_3").html(_addressOne);
            $(".address_4").html(_addressTwo);
            $(".address_5").html(_addressThree);
            $(".address_6").html(_addressDelita);
        })
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