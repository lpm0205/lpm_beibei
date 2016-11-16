/**
 * Created by Administrator on 2016/9/20.
 */
$(function(){
    $(".seventh img").mouseenter(function(){
        //console.log($(this).index());
        var index=$(this).index();
        switch(index){
            case 1:
                $(this).attr("src","img/q1.jpg");
                break;
            case 2:
                $(this).attr("src","img/t1.jpg");
                break;
            case 3:
                $(this).attr("src","img/w1.jpg");
                break;
        }
    })
    $(".seventh img").mouseleave(function(){
        //console.log($(this).index());
        var index=$(this).index();
        switch(index){
            case 1:
                $(this).attr("src","img/q0.jpg");
                break;
            case 2:
                $(this).attr("src","img/t0.jpg");
                break;
            case 3:
                $(this).attr("src","img/w0.jpg");
                break;
        }
    });
    $(".denglu a").mouseenter(function(){
        $(this).fadeTo("slow",0.5)

    });
    $(".denglu a").mouseleave(function(){
        $(this).fadeTo("slow",1)
    });


});

/**注册验证**/
$(function(){
    var _list="";
    var _arr=['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
    //点击获取验证码
    $("#yanzheng").click(function(){
        $(this).css({
            'background': '#ff5482',
            'color': '#fff',
            'font-size': '18px',
            'font-weight': '400',
            'letter-spacing': '5px'
        });
        var _one=_arr[parseInt(Math.random()*_arr.length)];
        var _two=_arr[parseInt(Math.random()*_arr.length)];
        var _three=_arr[parseInt(Math.random()*_arr.length)];
        var _four=_arr[parseInt(Math.random()*_arr.length)];
        _list=_one+_two+_three+_four;
        $(this).text(_list);
    });
    //点击注册
    $("#zhuce").click(function(){
            /**得到验证码**/
            //获取到用户输入的信息
            var usn=$("#name").val();
            var pwd=$("#psw_1").val();
            var yanzheng=$("#check").val();
            var reg_name=/^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/g;  //匹配手机号
            var reg_psw=/^\d{6,16}$/g;                                                                        //匹配密码
            if(!usn.match(reg_name)){
                alert("输入的手机格式不对");
                return;
            }
            if(!pwd.match(reg_psw)){
                alert("密码格式错误");
                return;
            }
            if(!(yanzheng==_list)){
                alert("验证码错误");
                return;
            }
            var users = $.cookie("registerUsers")? $.cookie("registerUsers"):"";    // 刚开始无数据的时候，转化为空对象
            users = convertStrToObj(users);
            if(usn in users){                                                                   //判断用户是否被注册
                alert("用户名已经被注册");
                return;
            }else {
                users[usn] = {
                    "password":pwd,
                    "_addr":{}
                };
                //根据每个用户名创建对象
                var usersStr =convertObjToStr(users);
                $.cookie("registerUsers",usersStr,{expires:7,path:"/"});
                alert("注册成功");
                window.location.href="../login_06/login.html";
            }
    });
});
