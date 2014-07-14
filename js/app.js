// Foundation JavaScript
// Documentation can be found at: http://foundation.zurb.com/docs
$(document).foundation();

// jQuery specific functionality for the front end.
(function ($) {

  var position;

  // Open external links in a new window.
  $("a[href^='http']").attr("target","_blank");

  $('.modal').css('z-index', -1);

  // Modal open (button)
  $('a.button-modal').click(function(e) {
    e.preventDefault();
    position = $(window).scrollTop();
    var $modalContent = $('.modal');
    $modalContent.css('z-index', 1000);
    $(this).toggleClass('open');
    $('body').toggleClass('locked');
    $modalContent.toggleClass('open');
    setTimeout(function(){
      $('.row').css('display', 'none');
    }, 1000);
  });

  // Modal close (X)
  $('.close').click(function(e) {
    $('.row').css('display', 'block');
    $('body').scrollTop(position);
    var $button = $('a.button-modal.open');
    var $modalContent = $(this).parent();
    $button.toggleClass('open');
    $modalContent.toggleClass('open');
    $('body').toggleClass('locked');
    setTimeout(function(){
      $modalContent.css('z-index', -1);
    }, 1000);
  });

  // Function to lock the RSVP form and display thank you message.
  var rsvpLock = function() {
    $('form#rsvp-form input').attr('disabled', 'disabled');
    $('form#rsvp-form select').attr('disabled', 'disabled');
    $('form#rsvp-form label').attr('disabled', 'disabled');
    $('form#rsvp-form input[type="submit"]').addClass('complete').attr('value', 'Thanks for RSVPING!');
  }

  // Check the RSVP cookie and lock the form if set.
  var myCookie = document.cookie.replace(/(?:(?:^|.*;\s*)rsvp\s*\=\s*([^;]*).*$)|^.*$/, "$1");
  if (myCookie) {
    rsvpLock();
    $('label').hide();
    $('input[name="name"]').hide();
    $('input[name="email"]').hide();
    $('input[name="phone"]').hide();
    $('select[name="plusone"]').hide();
    $('select[name="meal"]').hide();
  } else {
    // Initially hide the extra fields.
    $('input[name="name"]').hide();
    $('input[name="email"]').hide();
    $('input[name="phone"]').hide();
    $('select[name="plusone"]').hide();
    $('select[name="meal"]').hide();
    $('input[type="submit"][name="rsvp-submit"]').hide();
  }

  // RSVP Form validation and submission.
  $('form#rsvp-form').ajaxForm().validate({
    submitHandler: function(form) {
      $(form).ajaxSubmit({
        type: 'POST',
        url: 'https://mandrillapp.com/api/1.0/messages/send.json',
        beforeSerialize: function($form, options) {
          // Manually fetch the data from the form.
          var name = $('input[name="name"]').val();
          var going = $('input[type="radio"][name="going"]:checked').val();
          var email = $('input[name="email"]').val();
          var phone = $('input[name="phone"]').val();
          var plusone = $('select[name="plusone"]').val();
          var meal = $('select[name="meal"]').val();
          options.data.message.subject = "RSVP from " + name;
          options.data.message.html = "name: " + name + '<br/>';
          options.data.message.html += "going: " + going + '<br/>';
          options.data.message.html += "email: " + email + '<br/>';
          options.data.message.html += "phone: " + phone + '<br/>';
          options.data.message.html += "plusone: " + plusone + '<br/>';
          options.data.message.html += "meal: " + meal + '<br/>';
        },
        data: {
          'key': '444nOhDtNECZLeNBUr-8Sg',
          'message': {
            'from_email': 'us@andrewandclaudia.us',
            'to': [
                {
                  'email': 'us@andrewandclaudia.us',
                  'name': 'Claudia & Andrew'
                },
              ],
            'autotext': 'true',
          }
        },
        success: function(response) {
          if (response.length && response[0].status == 'sent') {
            rsvpLock();
            document.cookie="rsvp=true";
          }
        }
      });
    },
    errorPlacement: function(error,element) {
      return true;
    }
  });

  var rebuildForm = function() {
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
  }
  rebuildForm();

  // Show and add validation for fields based on user choice.
  $('input[type="radio"][name="going"]').click(function() {
    if ($(this).val() == 'yes') {
      $('input[name="name"]').fadeIn().rules("add", { required: true });
      $('input[name="email"]').fadeIn().rules("add", { required: true, email: true });
      $('input[name="phone"]').fadeIn().rules("add", { required: true });
      $('select[name="plusone"]').fadeIn().rules("add", { required: true });
      $('select[name="meal"]').fadeIn().rules("add", { required: true });
    } else {
      $('input[name="name"]').fadeIn().rules("add", { required: true });
      $('input[name="email"]').fadeIn().rules("add", { required: true, email: true });
      $('input[name="phone"]').fadeIn().rules("add", { required: true });
      $('select[name="plusone"]').fadeOut().rules("remove");
      $('select[name="meal"]').fadeOut().rules("remove");
    }
    $('input[type="submit"][name="rsvp-submit"]').fadeIn();
    rebuildForm();
  });

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
    'Wine, Cheese and Chocolate outings.',
    'Attending orchestra, jazz and bluegrass concerts'
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
      }, 1500);
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

  var changeButtonText = function() {
    if (!matchMedia(Foundation.media_queries['large']).matches && !matchMedia(Foundation.media_queries['medium']).matches) {
      $('.row.intro a.button-modal').html('<span>Howdy! RSVP here</span><span>We promise a great time!</span>');
    } else {
      $('.row.intro a.button-modal').html('<span>Howdy! Go ahead and RSVP here</span><span>We promise you an awesome time!</span>');
    }
  }
  changeButtonText();

  // Throttled resize function
  $(window).on('resize orientationchange', Foundation.utils.throttle(function(e){
    avatarSetup();
    bridesmaidsSetup();
    changeButtonText();
  }, 300));

  // Add the loaded class when the page has fully loaded.
  $(window).bind("load", function() {
    $('body').addClass('loaded');
    FastClick.attach(document.body);
    bridesmaidsSetup();
  });

}(jQuery));
