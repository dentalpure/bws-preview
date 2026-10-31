//01
$(".btnopen").click(function () {
    $(".nav").toggleClass('active');
});
$(".nav a").click(function () {
    $(".nav").removeClass('active');
});
$(".btnclose").click(function () {
    $(".nav").removeClass('active');
});
//fixedの時
$(function() {
  var height=$("header.header-type").outerHeight();
  $("body").css("margin-top", height);
});
//header01 fixed
var _window = $(window),
    _header = $('.header-type'),
    heroBottom;

_window.on('scroll',function(){
    heroBottom = "100";
    if(_window.scrollTop() > heroBottom){
        _header.addClass('transform');
    }
    else{
        _header.removeClass('transform');
    }
});

_window.trigger('scroll');
