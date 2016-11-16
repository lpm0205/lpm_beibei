/**
 * Created by Administrator on 2016/9/24.
 */
/**头部信息获取***/
$(function (){
    // 获取到已登录的用户名
    var loginedUser = $.cookie("loginedUser");

    if(loginedUser){
        $('#change').append("<p style='display:inline-block;'>欢迎回来，" + loginedUser + "</p>");
        var myA = $("<a style='color:#ff0000;' href='../login_06/login.html'>[注销]</a>");
        myA.click(function (){
            var res = $.removeCookie("loginedUser", {path : "/"});
            if(!res){
                alert("注销失败");
                return false;
            }
        });
        $('#change').append(myA);
        $('#denglu').hide();
        $('#zhuce').hide();

    } else {
        $('#denglu').show();
        $('#zhuce').show();
    }


});
/**右侧跟随菜单的功能***/
$(function(){
   $(".toTop ul li:first").click(function(){
        window.open("../buy_03/buy.html");
   });
    function loadCart(){
        var cartStr = $.cookie("registerUsers") ? $.cookie("registerUsers") : "";
        var cartObj = convertStrToObj(cartStr);
        var login = $.cookie("loginedUser") ? $.cookie("loginedUser") : "";
        //console.log(cartObj);
        //console.log(login);
        //console.log(cartStr);
        if(login in cartObj){
            if(judge(cartObj[login]["_goods"])==true){

                // 获取到购物车中所有商品的数量
                var total = 0;
                for(var id in cartObj[login]["_goods"]){
                    //console.log(cartObj[login]["_goods"][id])
                    total +=parseInt(cartObj[login]["_goods"][id].number);
                }
                $(".toTop ul li:first").text("购物车(" + total + ")");
            }
        }else{
            return;
        }
    }
    loadCart();
});
//proObj = {
//    personId1:{
//        proImgSrc:1,
//        proName:2,
//        proSize:3,
//        proColor:4,
//        proNum:5,
//        proTotal:6
//    },
//    personId2:{
//        name:1,
//        age:2
//    }
//}


/**cookie转化成字符串（默认），与转化成对象**/
function convertObjToStr(obj) {
    // "test1,123:test2,abc:test3,888"
    // "{
    //     15662181116={password:123qweASD

    //                  },
    //      13944792525={password:123qweASD
    //                   },
    //  }"
/*    var res = "";
    for(var usn in obj){
        //var pwd = obj[usn];
        // 看是否是第一组用户名和密码信息
        // 如果不是，先在前面添加一个:
        if(res){
            res += ":";
        }
        res +=usn + "," ;
    }
    return res;*/
    var res=JSON.stringify(obj);
    return res;

}
function convertStrToObj(str){
    var res;
    if(str==""){
        return {};
    }
    else {
/*        var users = str.split(":");
        var res = {};
        for (var i = 0; i < users.length; i++) {
            //["test1", "123"]
            var userData = users[i].split(",");
            res[userData[0]] = userData[1];
        }*/
        res=JSON.parse(str);
    }
    return res;
}




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








