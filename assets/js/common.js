var build_width_media_query = function(min, max){
  var media = "(min-width: " + min + "px)";
  if(max !== null) media += " and (max-width: " + max + "px)";
  return media;
};

var match_width_media_query = function(min, max){
  return window.matchMedia(build_width_media_query(min, max)).matches;
};

var preload_image = function(src){
  $("").attr("src", src).hide().appendTo("body").on("load", function(){
    $(this).remove();
  });
};
$(function(){
  var BREAK_POINT = 767;

  var $w = $(window);
  var $h = $("html");
  var $b = $("body");
  var prev_width;

  var responsive_images = $("[data-src-sp]");

  responsive_images.each(function(){
    var img = $(this);
    img.data("src", img.attr("src"));
    preload_image(img.data("src-sp"));
  });


  (function(){
    var timeout_id;

    $w.on("resize", function(){
      if($w.width() === prev_width) return;
      clearTimeout(timeout_id);
      prev_width = $w.width();

      var scrollbar_width = window.innerWidth - document.body.clientWidth;
      var mode = $b.width() <= BREAK_POINT - scrollbar_width ? "sp" : "pc";

      responsive_images.each(function(){
        switch(mode){
         case "pc":
          $(this).attr("src", $(this).data("src"));
          break;
         case "sp":
          $(this).attr("src", $(this).data("src-sp"));
          break;
        }
      });

      setTimeout(function(){$w.scroll();}, 400);
    });
  })();

  $w.resize();
});

var responsive = (function(){
  var sets = [];

  $(window).on("resize.responsive", function(){
    $.each(sets, function(i, set){
      var widthQuery = window.matchMedia(set.media);

      if(widthQuery.matches){
        set.fn(!set.prevMatch);
      }
      set.prevMatch = widthQuery.matches;
    });
  });

  return function(min, max, fn){
    sets.push({
      media: build_width_media_query(min, max),
      fn: fn,
      prevMatch: false
    });
  };
})();

$(function() {
  $('a[href*="#"]:not([href="#"])').click(function() {
      if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
          var target = $(this.hash);
          target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
          if (target.length) {
              $('html, body').animate({
                  scrollTop: target.offset().top
              }, {
                  duration: 500,
                  easing: 'swing'
              });
              return false;
          }
      }
  });
});