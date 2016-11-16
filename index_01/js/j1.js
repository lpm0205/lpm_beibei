//首页小效果
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
    });
    /**
     * 以上是公用部分
     *
     * ***/
    //今日优选，精彩预告
    $("#youxuan").mouseenter(function(){
        $(this).css({"font-weight":"700","border-bottom":"2px solid #ff647c"});
        $("#youxuan_ul").show();
        $("#yugao_ul").hide();
    });
    $("#youxuan").mouseleave(function(){
        $(this).css({"font-weight":"normal","border-bottom":"0"});
    });
    $("#yugao").mouseenter(function(){
        $(this).css({"font-weight":"700","border-bottom":"2px solid #ff647c"});
        $("#yugao_ul").show();
        $("#youxuan_ul").hide();
    });
    $("#yugao").mouseleave(function(){
        $(this).css({"font-weight":"normal","border-bottom":"0"});
    });

    //热卖排行榜
    $("#remai_ul li").mouseenter(function(){
        $("#remai_ul li:not(this)").css({"background":"#f9f9f9","font-weight":"nomal"});
        $(this).css({"background":"#fff","font-weight":"600"});
        var ind = $(this).index();
        //根据ind改变下面的ul
        $(".tz").hide();
        $(".tz").eq(ind).show();
        //console.log(ind);
    });
    $("#json_fl").mouseenter(function(){
        $("#msg").show();
    });
    $("#json_fl").mouseleave(function(){
        $("#msg").hide();
    });$("#p_r_second .tz a").hover(function(){
        $(this).css({"box-shadow":"2px 2px #666"});
    },function(){
        $(this).css({"box-shadow":"0px 0px"});
    });
});
//跟随菜单
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
//小轮播
$(function() {
    $.fn.extend({
        slide: function(duration, time) {
            var timer = '';
            var index = 0;
            var $smallBannerChange = $(this).find('.small_banner_change');
            var $smallBanner = $('.small_banner');
            var $last = $(this).find('.last');
            var $next = $(this).find('.next');

            clear();            //鼠标滑过是停止计时器
            last();             //点击下一张
            next();             //点击上一张
            /**
             * 功能描述：切换图片
             */
            function changeImg() {
                index++;
                if(index > 2) {
                    //$smallBannerChange.stop();                      //停止当前动画
                    index = 0;
                }
                $smallBannerChange.animate({'left': -248*index + 'px'}, time);     //滚动持续时间
            }
            /**
             * 功能描述：循环切换图片
             */
            timer = setInterval(function() {
                changeImg();
            }, duration);
            /**
             * 功能描述： 鼠标移入停止移动， 移出接着进行移动
             */
            function clear() {
                $smallBanner.hover(function() {
                    clearInterval(timer);
                    $last.css('display', 'block');
                    $next.css('display', 'block');
                }, function() {
                    $last.css('display', 'none');
                    $next.css('display', 'none');
                    timer = setInterval(function() {
                        changeImg();
                    }, duration);
                });
            }
            /**
             * 功能描述： 点击切换上一张图片
             */
            function last() {
                $last.on('click', function() {
                    index--;
                    if(index < 0) {
                        //$smallBannerChange.stop();
                        index = 2;
                    }
                    $smallBannerChange.animate({'left': -248*index + 'px'}, time);
                });
            }
            /**
             * 功能描述： 点击切换下一张图片
             */
            function next() {
                $next.on('click', function() {
                    index++;
                    if(index > 2) {
                        $smallBannerChange.stop();
                        index = 0;
                    }
                    $smallBannerChange.animate({'left': -248*index + 'px'}, time);
                });
            }
        }
    });
    $('.small_banner').slide(2500, 500);
});