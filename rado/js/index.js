$(function(){
    // 加载图片
    var loadImgsArr=[
        //将需要loading的图片放到此数组
        "images/arrowup.png",
        "images/bg1.jpg",
        "images/bg2.jpg",
        "images/bg3.jpg",
        "images/bg4.jpg",
        "images/bg5.jpg",
        "images/bg7.jpg",
        "images/bodybg.jpg",
        "images/btnleft.png",
        "images/btnright.png",
        "images/closebtn.png",
        "images/closeBtn2.png",
        "images/con2.png",
        "images/con3.png",
        "images/con4.png",
        "images/con5.png",
        "images/con6.png",
        "images/con7.png",
        "images/conBg.png",
        "images/createbtn.png",
        "images/cup.png",
        "images/holdbtn.png",
        "images/home.png",
        "images/knowbtn.png",
        "images/popimg.jpg",
        "images/popimg.png",
        "images/returnpop.png",
        "images/scrollbg.png",
        "images/shake.png",
        "images/share.jpg",
        "images/sharebtn.png",
        "images/sharepic.png",
        "images/txt1.png",
        "images/txt3.png",
        "images/txt4.png"
    ];
    netease_loadimg(loadImgsArr,function(){
        //loading结束后的回调函数

    });

    var mySwiper1 = new Swiper('.swiper-container-main', {
        pagination: '.swiper-pagination',
        direction: 'vertical',
        slidesPerView: 1,
        paginationClickable: true
    });
    mySwiper1.detachEvents();
    // 关闭了解详情
    $(".startBtn").click(function(){
        mySwiper1.slideTo(1, 500, false);
        setTimeout(function(){
            $("<img src='images/gif1.gif' />").appendTo(".img2")
        },200);
    })

   
    // 分享弹窗
    $(".sharebtn").on("click",function(){
        $(".myShare").show();
    })
    $(".myShare").on("click",function(){
        $(".myShare").hide();
    })  
    $(".close_return").on("click",function(){
        $(".returnPop").hide()
    })

    
    //audio声音播放控制
    $(document).ready(function(){
        $(".music-icon").click(function(document){
            if($(this).hasClass("play")){
                $('#stop-btn').click();
                $(this).removeClass("play").addClass("stop");
                $(this).css("background-image","url(images/soundno.png)");
            }
            else
            {
                $('#play-btn').click();
                $(this).removeClass("stop").addClass("play");
                $(this).css("background-image","url(images/sound.png)");
            }
        });
        
    });
    // 提示用户锁定为竖屏
    var orient = "onorientationchange" in window ? "orientationchange" : "resize";
    window.addEventListener(orient, adaptation, false);
    adaptation();
    function adaptation() {
        if (window.orientation == 90 || window.orientation == -90) {
            $(".black").show();
        } else {
            $(".black").hide();
        }
    }
    
});

$()