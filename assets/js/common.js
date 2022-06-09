var build_width_media_query = function(min, max) {
    var media = "(min-width: " + min + "px)";
    if (max !== null) media += " and (max-width: " + max + "px)";
    return media;
};

var match_width_media_query = function(min, max) {
    return window.matchMedia(build_width_media_query(min, max)).matches;
};

var preload_image = function(src) {
    $("").attr("src", src).hide().appendTo("body").on("load", function() {
        $(this).remove();
    });
};
$(function() {
    var BREAK_POINT = 767;

    var $w = $(window);
    var $h = $("html");
    var $b = $("body");
    var prev_width;

    var responsive_images = $("[data-src-sp]");

    responsive_images.each(function() {
        var img = $(this);
        img.data("src", img.attr("src"));
        preload_image(img.data("src-sp"));
    });


    (function() {
        var timeout_id;

        $w.on("resize", function() {
            if ($w.width() === prev_width) return;
            clearTimeout(timeout_id);
            prev_width = $w.width();

            var scrollbar_width = window.innerWidth - document.body.clientWidth;
            var mode = $b.width() <= BREAK_POINT - scrollbar_width ? "sp" : "pc";

            responsive_images.each(function() {
                switch (mode) {
                    case "pc":
                        $(this).attr("src", $(this).data("src"));
                        break;
                    case "sp":
                        $(this).attr("src", $(this).data("src-sp"));
                        break;
                }
            });

            setTimeout(function() { $w.scroll(); }, 400);
        });
    })();

    $w.resize();
});

var responsive = (function() {
    var sets = [];

    $(window).on("resize.responsive", function() {
        $.each(sets, function(i, set) {
            var widthQuery = window.matchMedia(set.media);

            if (widthQuery.matches) {
                set.fn(!set.prevMatch);
            }
            set.prevMatch = widthQuery.matches;
        });
    });

    return function(min, max, fn) {
        sets.push({
            media: build_width_media_query(min, max),
            fn: fn,
            prevMatch: false
        });
    };
})();


//font-size rem change
jQuery(function($) {
    var $w = $(window);
    var $h = $("html");
    var $b = $("body");

    var rem = function(n) {
        if ($w.width() < 768) {
            return n * $w.width() / 7.5;
        }

    };

    (function() {
        responsive(0, 767, function(changed) {
            $h.css("font-size", rem(1));
            if (!changed) return;

        });

        responsive(768, null, function(changed) {
            $h.css("font-size", "");
            if (!changed) return;
        });
    })();
    $w.resize();

});

$(function() {
    $('a[href*="#"]:not([href="#"])').click(function() {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            var content_h= $(".menu_list").outerHeight();
             var navbar_h= $(".navbar").outerHeight();
            if($(window).width() < 768){
                    var toTop = target.offset().top- content_h - navbar_h;
            }
            else{
                toTop = target.offset().top;
            }
        
            if (target.length) {
                $('html, body').animate({
                    scrollTop: toTop
                }, {
                    duration: 500,
                    easing: 'swing'
                });
                return false;
            }
        }
    });
});


// page_top
$(document).ready(function() {
      $('.page_top').click(function() {
            $("body, html").animate({ scrollTop: 0 }, 500);
            return false;
        });


      var hh = $('header').height();
    $(window).scroll(function(){
      var st = $(window).scrollTop(), wh = document.documentElement.clientHeight;
      var backtotop_pos_y = $('footer').outerHeight() - 16;
      if($(window).width() < 768){
        backtotop_pos_y = $('footer').outerHeight() - 12;
      }
      if(($(window).width() > 768) && ($(window).width() < 1199)) {
        backtotop_pos_y = $('footer').outerHeight() - 12;
      }
      if (st > hh) {
        $('.page_top').addClass('show');
        $('.page_top').stop().animate({'bottom': backtotop_pos_y, 'opacity': '1'}, 500);
      }
      else {
        $('.page_top').removeClass('show');
        $('.page_top').stop().animate({'bottom': -(backtotop_pos_y + 10), 'opacity': '0'}, 500);
      }

      // if (st > $('.footer_sec').offset().top - wh) {
      //   $('.page_top').addClass('stop');
      // }
      // else {
      //   $('.page_top').removeClass('stop');
      // }
    });


    // end of page_top

    // header menu
    $("header .btn_menu").click(function(event) {
        if ($(this).hasClass('is_active')) {
            $(this).removeClass('is_active');
            $(".menu_list").removeClass("show");

        } else {
            $(this).addClass('is_active');
            $(".menu_list").addClass("show");
        }
    });
});