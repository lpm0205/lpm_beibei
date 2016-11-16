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
    })
    $(".denglu a").mouseenter(function(){
        $(this).fadeTo("slow",0.5)

    })
    $(".denglu a").mouseleave(function(){
        $(this).fadeTo("slow",1)

    })


});

/***登录验证****/
$(function(){
    //获取你登录时的账号和密码
    $("#denglu").click(function(){
        var _usn=$("#name").val();
        var _pwd=$("#psw").val();
        var users =$.cookie("registerUsers")? $.cookie("registerUsers"):"";
        users=convertStrToObj(users);
        //console.log(users);
        //判断用户存不存在
        if(_usn in users){
            for(var key in users){
                if(key==_usn && users[key]["password"]==_pwd){
                    $.cookie("loginedUser",_usn,{expires:7,path:"/"});
                    alert("登录成功!");
                    window.location.href="../index_01/index.html";
                }else{
                    alert("用户名或密码不正确，请重新输入");
                }

            }
        }else{
            alert("该用户不存在");
            return;
        }


    })

});