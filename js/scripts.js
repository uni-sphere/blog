// CUSTOM KEYSOFT SCRIPTS

(function($) {

  "use strict";

    $(function(){
      $("#typed").typed({
        stringsElement: $('#typed-strings'),
        loop: true,
        startDelay: 1000,
        backDelay: 800,
        typeSpeed: 20,
        backSpeed: 30,
        callback: function() {
          // $('#typed').addClass("hidden")
          // $('.typed-cursor').addClass("hidden")
          // $('#intro-leading-fixed').removeClass("dual-intro")
          // document.getElementById("intro-leading-fixed").textContent="With Unisphere you can.";
        },
      });
    });

  // CHECK IF ELEMENT IS IN VIEW

  $.belowthefold = function(element, settings) {
    var fold = $(window).height() + $(window).scrollTop();
    return fold <= $(element).offset().top - settings.threshold;
  };
  $.abovethetop = function(element, settings) {
    var top = $(window).scrollTop();
    return top >= $(element).offset().top + $(element).height() - settings.threshold;
  };
  $.rightofscreen = function(element, settings) {
    var fold = $(window).width() + $(window).scrollLeft();
    return fold <= $(element).offset().left - settings.threshold;
  };
  $.leftofscreen = function(element, settings) {
    var left = $(window).scrollLeft();
    return left >= $(element).offset().left + $(element).width() - settings.threshold;
  };
  $.inviewport = function(element, settings) {
    return !$.rightofscreen(element, settings) && !$.leftofscreen(element, settings) && !$.belowthefold(element, settings) && !$.abovethetop(element, settings);
  };
  $.extend($.expr[':'], {
    "below-the-fold": function(a, i, m) {
      return $.belowthefold(a, {
        threshold: 0
      });
    },
    "above-the-top": function(a, i, m) {
      return $.abovethetop(a, {
        threshold: 0
      });
    },
    "left-of-screen": function(a, i, m) {
      return $.leftofscreen(a, {
        threshold: 0
      });
    },
    "right-of-screen": function(a, i, m) {
      return $.rightofscreen(a, {
        threshold: 0
      });
    },
    "in-viewport": function(a, i, m) {
      return $.inviewport(a, {
        threshold: 0
      });
    }
  });

  // FORM VALIDATION

  $(".subscribe-form input").jqBootstrapValidation({
    preventSubmit: true,
      submitSuccess: function($form, event) {
      var email = $("input").val();
      event.preventDefault(); // prevent default submit behaviour
      $.ajax({
        success: function() {
          Rollbar.info("Newsletter request",{email: email});
          $('#subscribe-success').html("<div class='alert alert-success'>");
          $('#subscribe-success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
            .append("</button>");
          $('#subscribe-success > .alert-success')
            .append("<strong>You have been subscribed! </strong>");
          $('#subscribe-success > .alert-success')
            .append('</div>');
        }
      })

    }
  });

  $("#contactForm input, #contactForm textarea").jqBootstrapValidation({
    preventSubmit: true,
    submitError: function($form, event, errors) {
      // additional error messages or events
    },
    submitSuccess: function($form, event) {
      event.preventDefault(); // prevent default submit behaviour
      // get values from FORM
      var name = $("input#name").val();
      var email = $("input#email").val();
      var message = $("textarea#message").val();
      $.ajax({
        success: function() {
          Rollbar.info("Contact request",{email: email, name: name, message: message});
          // Success message
          $('#success').html("<div class='alert alert-success'>");
          $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
            .append("</button>");
          $('#success > .alert-success')
            .append("<strong>Your message has been sent! </strong>");
          $('#success > .alert-success')
            .append('</div>');

          //clear all fields
          $('#contactForm').trigger("reset");
        }
      })
    },
    filter: function() {
      return $(this).is(":visible");
    },
  });


  // HEADER PARTICLES EFFECT

  if ($(window).width() > 960) {

    particlesJS("particles-js", {
      "particles": {
        "number": {
          "value": 80,
          "density": {
            "enable": false,
            "value_area": 1800
          }
        },
        "color": {
          "value": "#ffffff"
        },
        "shape": {
          "type": "circle",
          "stroke": {
            "width": 0,
            "color": "#000000"
          },
          "polygon": {
            "nb_sides": 3
          },
          "image": {
            "src": "img/github.svg",
            "width": 100,
            "height": 100
          }
        },
        "opacity": {
          "value": 0.5,
          "random": false,
          "anim": {
            "enable": false,
            "speed": 1,
            "opacity_min": 0.2,
            "sync": false
          }
        },
        "size": {
          "value": 3,
          "random": true,
          "anim": {
            "enable": false,
            "speed": 20,
            "size_min": 0.1,
            "sync": false
          }
        },
        "line_linked": {
          "enable": true,
          "distance": 250,
          "color": "#ffffff",
          "opacity": 0.2,
          "width": 2
        },
        "move": {
          "enable": true,
          "speed": 1,
          "direction": "none",
          "random": false,
          "straight": false,
          "out_mode": "out",
          "bounce": false,
          "attract": {
            "enable": false,
            "rotateX": 600,
            "rotateY": 1200
          }
        }
      },
      "interactivity": {
        "detect_on": "window",
        "events": {
          "onhover": {
            "enable": false,
            "mode": "grab"
          },
          "onclick": {
            "enable": false,
            "mode": "push"
          },
          "resize": true
        },
        "modes": {
          "grab": {
            "distance": 180,
            "line_linked": {
              "opacity": 1
            }
          },
          "bubble": {
            "distance": 400,
            "size": 40,
            "duration": 2,
            "opacity": 8,
            "speed": 3
          },
          "repulse": {
            "distance": 200,
            "duration": 0.4
          },
          "push": {
            "particles_nb": 4
          },
          "remove": {
            "particles_nb": 2
          }
        }
      },
      "retina_detect": true
    });

  }

  // PRELOADER      

  $(window).load(function() {
    $('#preloader').fadeOut('slow', function() {
      $(this).remove();
    });
  });


  // MAIN MENU TOGGLE AND SMOOTH SCROLL


  $('.navbar-collapse ul li a').on( 'click' , function() {
    $('.navbar-toggle:visible').click();
  });

  $(function() {
    $('a.page-scroll').on('click', function(event) {
      var $anchor = $(this);
      $('html, body').stop().animate({
        scrollTop: $($anchor.attr('href')).offset().top - 20
      }, 1500, 'easeInOutExpo');
      event.preventDefault();
    });
  });

  $('body').scrollspy({
    offset: 64,
    target: '.navbar-fixed-top'
  });

  // ANIMATED MENU

  var cbpAnimatedHeader = (function() {

    var docElem = document.documentElement,
      header = document.querySelector('.navbar-default'),
      didScroll = false,
      changeHeaderOn = 50;

    function init() {
      window.addEventListener('scroll', function(event) {
        if (!didScroll) {
          didScroll = true;
          setTimeout(scrollPage, 100);
        }
      }, false);
      window.addEventListener('load', function(event) {
        if (!didScroll) {
          didScroll = true;
          setTimeout(scrollPage, 100);
        }
      }, false);
    }

    function scrollPage() {
      var sy = scrollY();
      if (sy >= changeHeaderOn) {
        classie.add(header, 'navbar-shrink');
      } else {
        classie.remove(header, 'navbar-shrink');
      }
      didScroll = false;
    }

    function scrollY() {
      return window.pageYOffset || docElem.scrollTop;
    }

    init();

  })();


})(jQuery);