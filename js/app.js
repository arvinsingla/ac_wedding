// Foundation JavaScript
// Documentation can be found at: http://foundation.zurb.com/docs
$(document).foundation();

// jQuery specific fixes for the front end.
(function ($) {

  // Enable lazy loading for images.
  /*
  $('img.bttrlazyloading').bttrlazyloading({
    animation: 'fadeIn',
    backgroundcolor: 'transparent'
  });
  var s = skrollr.init({
    forceHeight: true,
    render: function(data) {
      //Debugging - Log the current scroll position.
    }
  });

*/
  // Modal open (button)
  $('a.button-modal').click(function(e) {
    e.preventDefault();
    var pos = $(this).offset();
    var $modalContent = $('.modal');
    $(this).toggleClass('open');
    $('body').toggleClass('locked');
    $modalContent.toggleClass('open');
  });

  // Modal close (X)
  $('.close').click(function(e) {
    var $button = $('a.button-modal.open');
    var pos = $button.offset();
    var $modalContent = $(this).parent();
    $button.toggleClass('open');
    $modalContent.toggleClass('open');
    $('body').toggleClass('locked');
  });

  // Set height for registry columns
  /*
  var leftHeight = $('.registry-left').outerHeight();
  console.log(leftHeight);
  $('.registry-right').css('height', leftHeight + 'px');
  $('.registry-left').css('height', leftHeight + 'px');
  */

  // Avatar swap
  var avatarSetup = function() {
    if (!matchMedia(Foundation.media_queries['large']).matches) {
      $('img.avatar').on('click', function() {
        if ($(this).data('person') == 'andrew') {
          $('.claudia-avatar img').addClass('inactive');
          $('.claudia-text').addClass('hide');
          $('.andrew-avatar img').removeClass('inactive');
          $('.andrew-text').removeClass('hide');
        } else {
          $('.claudia-avatar img').removeClass('inactive');
          $('.claudia-text').removeClass('hide');
          $('.andrew-avatar img').addClass('inactive');
          $('.andrew-text').addClass('hide');
        }
      });
      $('img.avatar').first().trigger('click');
    } else {
      $('.claudia-avatar img').removeClass('inactive');
      $('.claudia-text').removeClass('hide');
      $('.andrew-avatar img').removeClass('inactive');
      $('.andrew-text').removeClass('hide');
      $('img.avatar').off();
    }
  }
  // Initial run of avatar swap
  avatarSetup();

  // Custom quotes
  var quotes = [
    '“Omg you gaiz are like so cute. I wish I could own a Way-Way and be as amazing as you!”',
    '"This is a test"',
    '"This is another test"'
  ];
  // randomize the order
  quotes.sort(function() { return 0.5 - Math.random() });
  var quotePosition = 0;
  $('.about-us-content blockquote').html(quotes[quotePosition]).click(function() {
    if (quotePosition == ((quotes.length) - 1)) {
      quotePosition = 0;
    } else {
      quotePosition++;
    }
    // Fade out the text, update it and fade it back in.
    $(this).fadeOut(function() {
      $(this).html(quotes[quotePosition]).fadeIn()
    });
  });

  // Ensure textfields in a group properly overlap vertically.
  $('.text-group input').each(function(index) {
    if (index) {
      $(this).css('top', '-' + index + 'px');
    }
  });

  // Ensure textfields in a group properly overlap horizontally.
  $('.radio-group label').each(function(index) {
    if (index) {
      $(this).css('left', '-' + index + 'px');
    }
  });

  // Ensure radio group border changes when highlighted
  $('.radio-group input').change(function(e) {
    $(this).parents('.radio-group').addClass('selected');
  })

  // Select list: Add class when selected
  $('select').change(function(e) {
    if ($(this).val() !== "") {
      $(this).addClass('selected');
    }
    else {
      $(this).removeClass('selected');
    }
  });


  var bridesmaidsSetup = function() {
    // Handle the bridesmaids functionality based on device size.
    if (matchMedia(Foundation.media_queries['large']).matches) {
      // Destroy carousel if present
      $("#bridesmaids-carousel").trigger('destroy');
      $(".row-bridesmaids .row-content").stick_in_parent({
        offset_top: 100
      });
      setTimeout(function(){
        $(document.body).trigger("sticky_kit:recalc");
      }, 1000);
    } else {
      // Remove sticky text.
      $(".row-bridesmaids .row-content").trigger("sticky_kit:detach");
      // This is where the swipe slider goes.
      $('#bridesmaids-carousel').owlCarousel({
        center: true,
        loop: true,
        margin: 10,
        autoWidth: true,
        responsive : {
          // breakpoint from 0 up
          0 : {
            items: 1,
          },
          // breakpoint from 768 up
          768 : {
            items: 3,
          }
        }
      });
    }
  }
  bridesmaidsSetup();

  // Throttled resize function
  $(window).on('resize orientationchange', Foundation.utils.throttle(function(e){
    avatarSetup();
    bridesmaidsSetup();
    console.log('Resized');
  }, 300));

  $('.curtains').curtain();

}(jQuery));

/*
(function() {
  var docElem = window.document.documentElement, didScroll, scrollPosition;

  // trick to prevent scrolling when opening/closing button
  function noScrollFn() {
    window.scrollTo( scrollPosition ? scrollPosition.x : 0, scrollPosition ? scrollPosition.y : 0 );
    console.log("noScroll");
  }

  function noScroll() {
    window.removeEventListener( 'scroll', scrollHandler );
    window.addEventListener( 'scroll', noScrollFn );
  }

  function scrollFn() {
    window.addEventListener( 'scroll', scrollHandler );
  }

  function canScroll() {
    window.removeEventListener( 'scroll', noScrollFn );
    scrollFn();
  }

  function scrollHandler() {
    if( !didScroll ) {
      didScroll = true;
      setTimeout( function() { scrollPage(); }, 60 );
    }
    console.log("scrollHandler");
  };

  function scrollPage() {
    scrollPosition = { x : window.pageXOffset || docElem.scrollLeft, y : window.pageYOffset || docElem.scrollTop };
    didScroll = false;
  };

  scrollFn();

  var el = document.querySelector( '.morph-button' );

  new UIMorphingButton( el, {
    closeEl : '.icon-close',
    onBeforeOpen : function() {
      // don't allow to scroll
      noScroll();
    },
    onAfterOpen : function() {
      // can scroll again
      canScroll();
      // add class "noscroll" to body
      classie.addClass( document.body, 'noscroll' );
      // add scroll class to main el
      classie.addClass( el, 'scroll' );
    },
    onBeforeClose : function() {
      // remove class "noscroll" to body
      classie.removeClass( document.body, 'noscroll' );
      // remove scroll class from main el
      classie.removeClass( el, 'scroll' );
      // don't allow to scroll
      noScroll();
    },
    onAfterClose : function() {
      // can scroll again
      canScroll();
    }
  } );
})();


// Angular JS Application
(function() {
  angular.module('weddingApp', ['ngCurtain']);
})();


*/
//var weddingApp = angular.module('weddingApp', ['ngCurtain']);

/*
nameApp.controller('NameCtrl', function ($scope){
  $scope.firstName = 'John';

  $scope.$watch('lastName', function(newValue, oldValue){
    console.log('new value is ' + newValue);
  });

  setTimeout(function(){
    $scope.lastName = 'Smith';
    $scope.$apply();
  }, 1000);
});
*/
