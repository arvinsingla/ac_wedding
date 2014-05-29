// Foundation JavaScript
// Documentation can be found at: http://foundation.zurb.com/docs
$(document).foundation();

(function ($) {

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
