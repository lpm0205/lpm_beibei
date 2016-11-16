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
//返回上部功能
$(function() {
    backTopStyle();
    backTop();
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
//放大镜
$(function(){
    var arrImg=["img/glass1.jpg","img/glass2.jpg"];    //存放正常图片
    var arrBigImg=["img/big1.jpg","img/big2.jpg"];      //存放大图
    var img=$("#old");              //左侧的普通图片
    var bigImg=$("#big_img");                  //右侧隐藏的大图片
    //var smallImg=$();
    var smallGrass=$("#glass");         //放大镜
    var bigGrass=$("#big");             //右侧包裹大图片的div
    /*点击切换图片*/
    $(".pro_small ul li").click(function(){
        //改变小图边框颜色
        $(".pro_small ul li").css({"box-shadow":"none"});
        $(this).css({"box-shadow":"1px 1px 1px 1px #f34660"});
        //切换里面的图和大图
        var index=$(this).index();
        $("#fu img").attr("src",arrImg[index]);
        $("#big img").attr("src",arrBigImg[index]);
    })
    /*点击右边的选择颜色也改变对应的图片*/
    $(".yanse ul li").click(function(){
        var _index=$(this).index();
        $("#fu img").attr("src",arrImg[_index]);
        $("#big img").attr("src",arrBigImg[_index]);
        $(".yanse ul li").css({"box-shadow":"none"});
        $(this).css({"box-shadow":"1px 1px 1px 1px #fa0d66"});
    });
    function moveGlass() {
        /*放大镜滑块的宽、高*/
        var _width = parseInt(smallGrass.css("width"));
        //console.log(_width);
        /*小图片与大图片的比例，用于计算移动大图的距离的*/
        scale = bigImg.width() / img.width();
        $('#fu').on('mousemove', function(eve) {
            smallGrass.css({
                'display': 'block'
            });
            bigGrass.css({
                'display': 'block'
            });
            var event = eve || event;
            var resX = event.pageX - img.offset().left - _width / 2;
            var resY = event.pageY - img.offset().top - _width / 2;
            var maxX = img.width() - _width;
            var maxY = img.width() - _width;
            resX = resX > 0 ? resX : 0;
            resY = resY > 0 ? resY : 0;
            resX = resX < maxX ? resX : maxX;
            resY = resY < maxY ? resY : maxY;
            smallGrass.css({
                'left': resX + 'px',
                'top': resY + 'px'
            });
            bigImg.css({
                'left': -(resX) * scale + 'px',
                'top': -(resY) * scale + 'px'
            });
        });
        $('#fu').on('mouseout', function() {
            smallGrass.css({
                'display': 'none'
            });
            bigGrass.css({
                'display': 'none'
            });
        });
    }
    moveGlass();

});
//product.html中的小功能
$(function(){
    //点击优惠p标签出现隐藏的文字
    $(".youhui span").eq(1).mouseenter(function(){
        $("#part_p").css("display","block");
    });
    $(".youhui span").eq(1).mouseleave(function(){
        $("#part_p").css("display","none");
    });
    //点击选择颜色换边框颜色

    $(".chima ul li").click(function(){
        $(".chima ul li").css({"box-shadow":"1px 1px 1px #b8b7bd","color":"#000"});
        $(this).css({"color":"#ff4965", "box-shadow":"1px 1px 1px 1px #ff4965"})

    })

});
//加入购物车功能
$(function(){
    addProduct();

    function addProduct() {
        var _color = "";    //用来获取点击后选择的颜色
        var _size = "";     //用来获取点击后选择的尺码
        var _number="";    //用来获取点击后所选的数量
        var _src="";       //用来获取点击后图片的地址
        _number=$("#txt").html();    //默认为1

        /**点击颜色时获取颜色**/
        $(".yanse ul li").click(function () {
            _color = $(this).find("span").html();
            _src=$(this).find("img").attr("src");       //图片地址
            return _color;
        });
        /**点击尺码时获取尺码**/
        $(".chima ul li").click(function () {
            _size = $(this).html();
            console.log(_size);
            return _size;
        });
        /**点击数量增加减少**/
        $("#sub").click(function () {
             _number = parseInt($("#txt").html());    //每次点击减少时获取txt的初始值
            if (_number == 1) {
                $("#num_tip").show();
            } else {
                _number -= 1;
                $("#txt").html(_number);
                $("#num_tip").hide();
            }
        });
        $("#add").click(function () {
             _number = parseInt($("#txt").html());
            _number += 1;
            if (_number > 1) {
                $("#num_tip").hide();
            }
            $("#txt").html(_number);
        });
        /*点击加入购物车，地址改变，样式改变；右侧的继续购物出现;并且将尺码、数量、颜色给cookie*/
        $("#car").click(function(e){
            var _goodId="sp1";                      //设置商品的id
            var _goodSrc=_src;                          //设置商品的图片
            var _goodName=$("#mygood_name").html();     //设置商品的姓名
            var _goodColor=_color;                    //设置商品颜色
            var _goodSize=_size;                       //设置商品尺码
            var _goodNumber=_number;                    //设置商品的数量
            var _goodPrice=$("#mygood_price").html();      //设置商品的价格

            /************************判定选没选尺码、颜色************************************/
            if(_color==""||_size==""){
                alert("请选择颜色和尺码");
                return;
            }else {
                $(this).hide();
                $(".tocart div").eq(0).css({"display": "inline-block", "border": "none"});  //右侧去结算出现
                $("#jiesuan").css({"display":"inline-block"});
                var _login=$.cookie("loginedUser");                          //获取现在登陆的账号
                var _register=$.cookie("registerUsers");
                _register=convertStrToObj(_register);
                if(_login in _register){
                    _register[_login]["_goods"]={};
                    _register[_login]["_goods"][_goodId]={
                        src:_goodSrc,
                        name:_goodName,
                        color:_goodColor,
                        size:_goodSize,
                        number:_goodNumber,
                        price:_goodPrice
                    };
                    console.log( _register[_login]["_goods"][_goodId]);
                    var usersStr =convertObjToStr(_register);
                    $.cookie("registerUsers",usersStr,{expires:7,path:"/"});
                    /***************************做一个飞入购物车的效果*****************************/
                    var cloneImg = $("#old").clone().css({
                        width : 50,
                        height : 50
                    });
                    cloneImg.fly(
                        {
                            start : {
                                top : e.clientY,
                                left : e.clientX
                            },
                            end : {
                                top : $(".toTop ul li:first").offset().top,
                                left : $(".toTop ul li:first").offset().left,
                                width : 0,
                                height : 0
                            },
                            autoPlay : true,
                            onEnd : function (){
                                $(".toTop ul li:first").text(function (index, v){
                                    // "购物车(0)"
                                    var pattern = /(\d+)/;
                                    var num = parseInt(v.match(pattern)[1]);
                                    return "购物车(" + (num + 1) + ")";
                                });
                                cloneImg.remove();
                            }
                        }
                    );
                }else{
                    alert("请登录");
                    window.open("../login_06/login.html");
                }

            }
        });
        /**点击右边的继续购物回到原来的状态*/
        $(".tocart div").eq(0).click(function(){

            $(this).hide();
            $("#car").show();
            $("#jiesuan").css({"display":"none"});
        })


    }

});

//下面的菜单吸顶，和楼梯效果
$(function(){
    var _top = $('.on_top_title').offset().top;
    //滚动事件
    $(document).scroll(function(){
        var _nowScroll=$(this).scrollTop();
        var _top = $('.on_top_title').offset().top;       //获取顶部菜单相对于整个页面的高度
        //console.log(typeof _top);
        changeTop(_nowScroll);
    });
    //当超过该高度时就发生吸附顶部的效果
    function changeTop(scroll){
        if (scroll > _top) {
            $('.on_top_title').css({
                'position': 'fixed',
                'top': '0'
            });
            $('.hide_shopping_car').css({
                'display': 'block'
            });
        } else {
            $('.on_top_title').css({
                'position': 'absolute',
                'top': _top
            });
            $('.hide_shopping_car').css({
                'display': 'none'
            });
        }
    }
});
//楼梯效果
$(function(){
    var $li = $('.main_content_left').children('li');
    $('.on_top_nav li').on('click', function() {
        var _index = $(this).index();
        $(this).addClass('active_style').siblings().removeClass('active_style');
        var $height = $li.eq(_index).offset().top - 35;
        console.log($height);
        $('html, body').animate({
            scrollTop: $height
        }, 500);
    });
    $(window).scroll(function() {
        var $top = $(this).scrollTop();
        $li.each(function() {
            var $index = $(this).index();
            var $height = $li.eq($index).offset().top - 48;
            if ($top > $height) {
                $('.on_top_nav li').eq($index).addClass('active_style').siblings().removeClass('active_style');
            }
        });
    });
})














