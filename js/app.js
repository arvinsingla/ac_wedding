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
