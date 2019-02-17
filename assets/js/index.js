(function ($) {
  $.fn.menumaker = function () {
    var cssmenu = $(this);
    return this.each(function () {
      cssmenu.prepend('<i id="menu-button" class="fas fa-bars"></i>');
      $(this).find("#menu-button").on('click', function () {
        $(this).toggleClass('menu-opened');
        var mainmenu = $(this).next('ul');
        if (mainmenu.hasClass('open')) {
          mainmenu.hide().removeClass('open');
        }
        else {
          mainmenu.show().addClass('open');
        }
      });

      cssmenu.find('li ul').parent().addClass('has-sub');

      multiTg = function () {
        cssmenu.find(".has-sub").prepend('<span class="submenu-button"></span>');
        cssmenu.find('.submenu-button').on('click', function () {
          $(this).toggleClass('submenu-opened');
          if ($(this).siblings('ul').hasClass('open')) {
            $(this).siblings('ul').removeClass('open').hide();
          }
          else {
            $(this).siblings('ul').addClass('open').show();
          }
        });
      };
      multiTg();

      resizeFix = function () {
        if ($(window).width() > 768) {
          cssmenu.find('ul').show();
        }
        if ($(window).width() <= 768) {
          cssmenu.find('ul').hide().removeClass('open');
        }
      };
      resizeFix();
      return $(window).on('resize', resizeFix);
    });

  };
})(jQuery);

$(document).ready(function () {


  /**
   * Responsive Navigation
   */
  var nav = $('.g-nav');
  $(nav).menumaker();

  $('#menu-toggle').on('click', function (e) {
    var duration = 200;
    nav.slideToggle(duration);
    $(document).on('click', function () {
      nav.slideUp(duration);
    });
    e.stopPropagation();
  });

  nav.on('click', function (e) {
    e.stopPropagation();
  });

  /*
  *  Header Bar
  */
  if ($(window).width() > 695) {
    var header = $('.g-header');
    var headerHeight = header.outerHeight();
    var themeStyle = $('.g-banner').attr('data-theme');
    var scFlag = $(document).scrollTop();
    var currentWidth = $(window).width();
    var catalog = $('.toc-container');
    if (currentWidth > 1200) {
      catalog.show();
    }

    $(document).scroll(function () {
      var scrollTop = $(this).scrollTop();
      var navClassName = 'nav-' + themeStyle;

      if (scrollTop > headerHeight) {
        if (scrollTop > 3 * headerHeight) {
          header.addClass('headerUp');
        }
        nav.addClass(navClassName);
      } else {
        header.removeClass('headerUp');
        nav.removeClass(navClassName);
      }

      // scroll action
      if (scFlag > scrollTop) {
        header.addClass('headerDown');
      } else {
        header.removeClass('headerDown');
      }
      scFlag = scrollTop;

      // catalog
      if (currentWidth > 1100) {
        if (scrollTop > 500) {
          catalog.addClass('fixed');
        } else {
          catalog.removeClass('fixed');
        }
      }
    });
  }

  /*
  * Post Cover Resize
  */
  function postCover(img, container) {
    var imgWidth = img.width();
    var containerWidth = container.width();
    var imgHeight = img.height();
    var containerHeight = container.height();

    if (imgHeight < containerHeight) {
      img.css({
        'width': 'auto',
        'height': '100%'
      });
      imgWidth = img.width(),
        containerWidth = container.width();
      var marginLeft = (imgWidth - containerWidth) / 2;
      img.css('margin-left', '-' + marginLeft + 'px');
    } else {
      var marginTop = (containerHeight - imgHeight) / 2;
      img.css('margin-top', marginTop + 'px');
    }

    img.fadeIn();
  }

  /**
   * The Post Navigator
   */
  $('.read-next-item section').each(function () {
    var n = $(this).height();
    var rn = $('.read-next-item').height();
    $(this).css('margin-top', (rn - n) / 2 + 'px');
    $(this).fadeIn();
  });

  $('.read-next-item img').each(function () {
    postCover($(this), $('.read-next-item'));
  });

  /**
   * Pagination
   */
  function pagination() {
    var total = parseInt($('#total_pages').val());
    var current = parseInt($('#current_pages').val());
    var baseUrl = $('#base_url').val();
    var limit = 3;

    var link_html = '';

    for (var i = current - limit; i < current; i++) {
      if (i > 0 && i !== 1) {
        link_html += '<a href="' + baseUrl + 'page' + i + '" class="page-link page-num">' + i + '</a>';
      } else if (i === 1) {
        link_html += '<a href="' + baseUrl + '" class="page-link page-num">' + i + '</a>';
      }
    }

    link_html += '<span class="page-link page-num active">' + current + '</span>';

    for (var j = current + 1; j <= current + limit; j++) {
      if (j <= total) {
        link_html += '<a href="' + baseUrl + 'page' + j + '" class="page-link page-num">' + j + '</a>';
      }
    }

    $('#page-link-container').html(link_html);
  }
  pagination();

  /**
   * Search
   */
  function Search() {
    var self = this;
    var input = $('#search_input');
    var result = $('.search_result');

    input.focus(function () {
      $('.icon-search').css('color', '#3199DB');
      result.show();
    });

    input.keyup(debounce(this.autoComplete));

    $(document).click(function (e) {
      if (e.target.id === 'search_input' || e.target.className === 'search_result' || e.target.className === 'search_item') {
        return;
      }
      $('.icon-search').css('color', '#CAD3DC');
      result.hide();
    });
  }

  Search.prototype.autoComplete = function () {
    var keywords = this.value.toLowerCase();

    if (keywords.length) {
      $('.icon-search').css('color', '#3199DB');
    } else {
      $('.icon-search').css('color', '#CAD3DC');
    }

    $.getJSON('../../search.json').done(function (data) {
      var html = '';
      for (var i in data) {
        var item = data[i];
        var title = item.title;
        var tags = item.tags;
        var url = item.url;

        var k = title + tags;
        if (keywords !== '' && k.toLowerCase().indexOf(keywords) >= 0) {
          html += '<a class="search_item" href="' + item.url + '">' + item.title + '</a>';
        }
      }
      $('.search_result').html(html);
    });
  };

  function debounce(fn, delay) {
    var timer;
    delay = delay || 120;

    return function () {
      var ctx = this;
      var args = arguments;
      var later = function () {
        fn.apply(ctx, args);
      };
      clearTimeout(timer);
      timer = setTimeout(later, delay);
    };
  }

  new Search();

  /**
   * Copy and copyright
   */
  function setClipboardData(str) {
    var date = new Date();
    str += '\n\nCopyright ' + date.getFullYear() + ' l’article appartient à son auteur.\nPour toute reproduction à titre commerciale, veuillez contacter l\'auteur pour obtenir son autorisation.\nDans le cas d’une utilisation sans but mercantile veuillez indiquer la source de l’article.\nOriginal: ' + location.href;

    $('.post-content').on('copy', function (e) {
      var data = window.clipboardData || e.originalEvent.clipboardData;
      data.setData('text/plain', str);
      e.preventDefault();
    });
  }
  $('.post-content').on('mouseup', function (e) {
    var txt = window.getSelection();
    if (txt.toString().length >= 30) {
      setClipboardData(txt);
    }
  });

});
