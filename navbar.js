
navbar = {
  /************
   * Settings *
   ************/
  list_tag: 'ol',
  nav_id: 'navbar',
  
  
  /*************
   * Functions *
   *************/
  get_html: function() {
    var open_tag = '<' + navbar.list_tag + '>';
    var close_tag = '</' + navbar.list_tag + '>';
    var all_txt = '';
    var prev_level = 0;
    var hs = $('.text_cell_render').find('h1,h2,h3,h4,h5');
    for (i=0; i<hs.length; i++) {
      x = hs[i]
      level = parseInt(x.tagName.substr(1));
      txt = '<li><a href=#' + x.id + '>' + x.innerText.replace(/¶$/, '') + '</a></li>';
      diff = level - prev_level;
      for (j=0; j<diff; j++) {
        txt = open_tag + txt;
      }
      for (j=diff; j<0; j++) {
        txt = close_tag + txt;
      }
      prev_level = level
      all_txt += txt
    }
    all_txt += close_tag
    return all_txt;
  },

  rebuild: function() {
    var nav_obj = $('#'+navbar.nav_id);  
    nav_obj.html(navbar.get_html());
  },

  first_build: function() {
    navbar.rebuild();
    
    requirejs(['base/js/events'], function (events) {
      events.on('rendered.MarkdownCell delete.Cell', navbar.rebuild);
    });
  },
  
  init: function() {
    // Wrap the main content to allow the resizable nav-bar
    $('#site').wrap('<div id="main_wrapper"><div id="split_wrapper"><div id="site_wrapper"></div></div></div>');
    $('<div id="nav_wrapper"><div id="'+navbar.nav_id+'"><small>Loading...</small></div><div id="nav_toggle"></div></div>').insertBefore('#site_wrapper');
    
    $(window).resize(function() {
      $('#nav_wrapper').height($(window).height() - $('#header').height());
    });
    
    $('#nav_toggle').click(function() {$('#nav_wrapper').toggleClass('collapsed')});

    
    requirejs(['base/js/events'], function (events) {
      events.one('kernel_idle.Kernel', navbar.first_build);
    });
  },
}

if ($('body').hasClass('notebook_app')) {
  navbar.init();
}
