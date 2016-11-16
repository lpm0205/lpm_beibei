/**
 * Created by Administrator on 2016/9/19.
 */
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

    $(function() {
        backTopStyle();
        backTop();
        getMoreBrands();
        changeImgSize();
        $(".main_pro li").click(function(){
            window.open("../product_05/product.html");
        })
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

        /**
         * 功能描述：展开商品标图
         */
        function getMoreBrands() {
            var times = 0;
            $('.m_brand_more').on('click', function() {
                times++;
                if(!(times%2 === 0)) {
                    $('.main_top').addClass('main_top_change');
                    $('.m_brand').addClass('m_brand_change');
                    $('.m_brand_img').addClass('m_brand_img_change');
                } else {
                    $('.main_top').removeClass('main_top_change');
                    $('.m_brand').removeClass('m_brand_change');
                    $('.m_brand_img').removeClass('m_brand_img_change');
                }
            });
        }

        /**
         * 功能描述： 鼠标滑过图片变大
         */
        function changeImgSize() {
            $('.images').hover(function() {
                $(this).children('img').stop().animate({
                    'width': '260px',
                    'height': '260px'
                }, 400);
            }, function() {
                $(this).children('img').stop().animate({
                    'width': '253px',
                    'height': '253px'
                }, 400);
            });
        }
    });



});