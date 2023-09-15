$(document).ready(function() {
    var scrolling = false;
    var sections = $('.section');
    var currentIndex = 0;

    $(window).on('wheel', function(event) {
        event.preventDefault();

        if (scrolling) return;

        var delta = event.originalEvent.deltaY;

        if (delta < 0 && currentIndex > 0) {
            currentIndex--;
        } else if (delta > 0 && currentIndex < sections.length - 1) {
            currentIndex++;
        }

        scrollToSection(currentIndex);
    });

    function scrollToSection(index) {
        scrolling = true;

        $('html, body').animate({
            scrollTop: sections.eq(index).offset().top
        }, {
            duration: 800,
            easing: 'swing',
            complete: function() {
                scrolling = false;
            }
        });
    }
});
// Отключение стандартной обработки событий скроллинга браузером
window.addEventListener('wheel', function(e) {
    e.preventDefault();
}, { passive: false });

Math.easeInOutSine = function (t, b, c, d) {
    return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
  };
  var easing = Math.easeInOutSine,
      $target = $('#target'),
      position = $target.position(),
      width = $target.width(),
      height = 100;
  $target.html($target.text().split('').map(
    function(char){
      return '<span>'+char+'</span>';
    }
  ).join(''));
  var $chars = $target.children();
  $chars.each(function(){
    var $char = $(this),
        w = $char.width(),
        l = $char.position().left,
        offset = easing(l, 0, height, width),
        skew = offset - easing(w + l, 0, height, width),
        angle = Math.atan(skew/w) * 180 / Math.PI;
    offset = -offset;
    $char.css({
      transform: 'translateY('+offset+'px) skewY('+angle+'deg)'
    });
  });
  $target.css({
    paddingTop: height
  });