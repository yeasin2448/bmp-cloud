(function($){
	'use strict';

    $(document).ready(function() {
        var bigimage = $("#big");
        var thumbs = $("#thumbs");
        //var totalslides = 10;
        var syncedSecondary = true;
      
        bigimage
        .owlCarousel({
          items: 1,
          slideSpeed: 2000,
          nav: true,
          autoplay: false,
          dots: false,
          loop: true,
          responsiveRefreshRate: 200,
          navText: [
            '<i class="fa fa-angle-left" aria-hidden="true"></i>',
            '<i class="fa fa-angle-right" aria-hidden="true"></i>'
          ]
        })
        .on("changed.owl.carousel", syncPosition);
      
        thumbs
        .on("initialized.owl.carousel", function() {
          thumbs
            .find(".owl-item")
            .eq(0)
            .addClass("current");
        })
        .owlCarousel({
          items: 4,
          dots: true,
          nav: true,
          margin: 10,
          navText: [
            '<i class="fa fa-angle-left" aria-hidden="true"></i>',
            '<i class="fa fa-angle-right" aria-hidden="true"></i>'
          ],
          smartSpeed: 200,
          slideSpeed: 500,
          slideBy: 4,
          responsiveRefreshRate: 100
        })
        .on("changed.owl.carousel", syncPosition2);
      
        function syncPosition(el) {
          //if loop is set to false, then you have to uncomment the next line
          //var current = el.item.index;
      
          //to disable loop, comment this block
          var count = el.item.count - 1;
          var current = Math.round(el.item.index - el.item.count / 2 - 0.5);
      
          if (current < 0) {
            current = count;
          }
          if (current > count) {
            current = 0;
          }
          //to this
          thumbs
            .find(".owl-item")
            .removeClass("current")
            .eq(current)
            .addClass("current");
          var onscreen = thumbs.find(".owl-item.active").length - 1;
          var start = thumbs
          .find(".owl-item.active")
          .first()
          .index();
          var end = thumbs
          .find(".owl-item.active")
          .last()
          .index();
      
          if (current > end) {
            thumbs.data("owl.carousel").to(current, 100, true);
          }
          if (current < start) {
            thumbs.data("owl.carousel").to(current - onscreen, 100, true);
          }
        }
      
        function syncPosition2(el) {
          if (syncedSecondary) {
            var number = el.item.index;
            bigimage.data("owl.carousel").to(number, 100, true);
          }
        }
      
        thumbs.on("click", ".owl-item", function(e) {
          e.preventDefault();
          var number = $(this).index();
          bigimage.data("owl.carousel").to(number, 300, true);
        });
    });
      

    // product view mode change js
    $('.product-view-mode').on('click', 'a', function (e) {
        e.preventDefault();
        var shopProductWrap = $('.shop-product-wrap');
        var viewMode = $(this).data('target');
        $('.product-view-mode a').removeClass('active');
        $(this).addClass('active');
        shopProductWrap.removeClass('grid list').addClass(viewMode);
    });

    // model option start here
    $('.view-modal').on('click', function () {
        $('.modal').addClass('show');
    });

    $('.close').on('click', function () {
        $('.modal').removeClass('show');
    });

    // shop cart + - start here
    var CartPlusMinus = $('.cart-plus-minus');
    CartPlusMinus.prepend('<div class="dec qtybutton">-</div>');
    CartPlusMinus.append('<div class="inc qtybutton">+</div>');
    $(".qtybutton").on("click", function() {
        var $button = $(this);
        var oldValue = $button.parent().find("input").val();
        if ($button.text() === "+") {
            var newVal = parseFloat(oldValue) + 1;
        } else {
            // Don't allow decrementing below zero
            if (oldValue > 0) {
                var newVal = parseFloat(oldValue) - 1;
            } else {
                newVal = 1;
            }
        }
        $button.parent().find("input").val(newVal);
    });

})(jQuery);
