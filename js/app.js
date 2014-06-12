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

  // Allow avatars to swap out text on mobile form factors
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
  }

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

  // Ensure each row has a higher z-index then the one below it.
  $('div.row').each(function(index) {
    $(this).css('z-index', 100 - index);
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

}(jQuery));


/*
// Angular JS Application
(function() {
  angular.module('weddingApp', ['ngCurtain']);
})();

/*
//var weddingApp = angular.module('weddingApp', ['ngCurtain']);

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
