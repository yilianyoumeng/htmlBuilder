// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
var $ = require('jquery');
window.$ = $;
$(function () {
    //上传背景图并预览
    $('#uploadBg').change(function () {
        $('#area2').append('<div id="bgImg2" class="bgImg"></div>');
        $('#area').append('<div id="bgImg" class="bgImg"></div>');
        var objUrl = getObjectURL(this.files[0]); //获取图片的路径，该路径不是图片在本地的路径 
        console.log('背景图信息');
        console.log(this.files[0].path);
        $('#bgImgUrl').val(this.files[0].path);
        var f = this.files[0];
        var reader = new FileReader();
        reader.onload = function (e) {
            var data = e.target.result;
            var image = new Image();
            image.onload = function () {
                var height = image.height;
                console.log(height + "=====");
                $('#bgImg').css('height', height + 'px');
                $('#bgImg2').css('height', height + 'px');
            };
            image.src = data;
        }
        reader.readAsDataURL(f);
        console.log(objUrl);
        if (objUrl) {
            $("#bgImg2").css("background-image", "url(" + objUrl + ")"); //将图片路径存入src中，显示出图片
            $("#bgImg").css("background-image", "url(imgs/bgImg.jpg)");
        }
    });
    //轮播部分 '<div class="swiper-container-box-three swiperBox" style="height:469px;">'+  
    //'<div class="imgBox"><img src="assets/imgs/lb3.jpg" class="imgThree" /></div>'+
    //'<div class="con">'+
    $('body').append('<script id="js"></script>');
    var lunboDDHtml = '<div class="swiperBox">' +
        '<div class="swiper-container">' +
        '<div class="swiper-wrapper">' +
        '<div class="swiper-slide">' +
        '<div class="imgBox"><img src="imgs/old_lb3.jpg"/></div>' +
        '</div>' +
        '<div class="swiper-slide">' +
        '<div class="imgBox"><img src="imgs/lb3.jpg"/></div>' +
        '</div>' +
        '</div>' +
        '<div class="swiper-pagination" style="z-index:99;"></div>' +
        '</div>' +
        '</div>'

    var lunNum = $('.swiperBox').length + 1;//第几个轮播
    console.log(lunNum);
    $('#lunboDD').click(function () {
        $('#tanDD').removeClass('dn').addClass('db');
    })
    $('#tanDD .yes').click(function (e) {//点点轮播设置，点击“确定”
        var setImgNum = parseInt($('#setImgNum').val());//轮播中图片个数
        var setWidth = parseInt($('#setWidth').val());//轮播中图片个数
        var setPointH = parseInt($('#setPointH').val());//底部点点的距离
        var setHeight;
        if (setPointH > 0) {
            setHeight = parseInt($('#setHeight').val()) + 20 + setPointH;
            setPointH = 0;
        } else {
            setHeight = parseInt($('#setHeight').val());
        }

        $('#area').append(lunboDDHtml);
        $('.swiper-container:last').attr('id', 'swiper' + lunNum);
        console.log('点击后' + lunNum);
        console.log(setHeight);
        $('#swiper' + lunNum).css('height', setHeight + 'px');
        $('#swiper' + lunNum).css('width', setWidth);
        console.log($('#swiper' + lunNum).css('height'));
        $('.swiper-container:last').children('.swiper-pagination').attr('id', 'swiper-pagination' + lunNum);
        $('#swiper-pagination' + lunNum).css('bottom', -setPointH + 'px');
        jsDDHtml(lunNum, setImgNum);
        lunNum = lunNum + 1;
        $('#tanDD').removeClass('db').addClass('dn');
        //拖动
        swiperMove();
    })
    $('#tanDD .no').click(function () {//点点轮播设置，点击“取消”
        $('#tanDD').removeClass('db').addClass('dn');
    })
    //拖动
    $(document).mousemove(function (e) {
        if (!!this.move) {
            var posix = !document.move_target ? { 'x': 0, 'y': 0 } : document.move_target.posix,
                callback = document.call_down || function () {
                    $(this.move_target).css({
                        'top': e.pageY - posix.y,
                        'left': e.pageX - posix.x
                    });
                };

            callback.call(this, e, posix);
        }
    }).mouseup(function (e) {
        if (!!this.move) {
            var callback = document.call_up || function () { };
            callback.call(this, e);
            $.extend(this, {
                'move': false,
                'move_target': null,
                'call_down': false,
                'call_up': false
            });
        }
    });
    //生成html
    $('#buildFile').click(function(){
        //$("#bgImg").css("background-image", "");
        $('#tanDownLoad').removeClass('dn').addClass('db');
    })
})

//点点轮播swiper设置
function jsDDHtml(lunNum, i) {
    var lunJsHtml = 'var mySwiper' + lunNum + ' = new Swiper("#swiper' + lunNum + '", {' +
        //autoplay: 5000,
        'loop: true,' +
        'slidesPerView: ' + i + ',' +
        // spaceBetween : 15,'+
        //cssWidthAndHeight : true,
        'setWrapperSize: true,' +
        'pagination: "#swiper-pagination' + lunNum + '",' +
        //paginationType : 'bullets',//custom
        'paginationClickable: true,' +
        '})'
    $('#js').append(eval(lunJsHtml));
    $('#jsHtml').append(lunJsHtml)
}
//箭头轮播swiper设置
function jsJTHtml(lunNum, i) {
    var lunJsHtml = 'var mySwiper' + lunNum + ' = new Swiper("#swiper' + lunNum + '", {' +
        //autoplay: 5000,
        'loop: true,' +
        'slidesPerView: ' + i + ',' +
        // spaceBetween : 15,'+
        //cssWidthAndHeight : true,
        'setWrapperSize: true,' +
        'pagination: "#swiper-pagination' + lunNum + '",' +
        //paginationType : 'bullets',//custom
        'paginationClickable: true,' +
        '})'
    $('#js').append(eval(lunJsHtml));
    $('#jsHtml').append(lunJsHtml)
}
//建立一個可存取到該file的url
function getObjectURL(file) {
    var url = null;
    console.log(file);
    if (window.createObjectURL != undefined) { // basic
        url = window.createObjectURL(file);
    } else if (window.URL != undefined) { // mozilla(firefox)
        url = window.URL.createObjectURL(file);
    } else if (window.webkitURL != undefined) { // webkit or chrome
        url = window.webkitURL.createObjectURL(file);
    }
    return url;
}
function swiperMove(){
    $('.swiperBox').dblclick(function () {
        console.log(!$(this).data('isMove'));
        console.log('拖得了么？？###')
        $(this).data('isMove', !$(this).data('isMove'))
        $(this).css('border', '2px dashed #ddd')
        if(!$(this).data('isMove')){
            $(this).css('border', 'none');
        }     
    })
    $('.swiperBox').mousedown(function (e) {
        if (!$(this).data('isMove')){
            return;
        }else{
            // 移动处理
            var $p = $(this);
            var $pp = $p[0];
            var offset = $p.offset();
            $pp.posix = { 'x': e.pageX - offset.left, 'y': e.pageY - offset.top };
            $.extend(document, { 'move': true, 'move_target': $pp });
        } 
        
    })
}
