
navbar = {
  /************
   * Settings *
   ************/
  list_tag: 'ol',
  nav_id: 'navbar',
  
  
  /*************
   * Functions *
   *************/
  scrollTo: function(o) {
    console.log('Object is: '+o.innerText);
    var s = $.escapeSelector(o.innerText.replace(/ /g, '-'));
    var allHeaders = $('[id='+s+']');  // All headers containing this text
    if (allHeaders.length > 1) {
      // There are multiple headers containing the same text. Cannot use anchors; must scroll with JS.
      var idx = $('#'+navbar.nav_id+' [href=\\#'+s+']').index(o);  // Which one am I?
      allHeaders[idx].scrollIntoView();
      history.pushState("", document.title, window.location.pathname + window.location.search); // Remove hash from URL
      return false;
    } else {
      // One unique header - scroll using default behavior of anchors
      return true;
    }
  },
  
  setCookie: function(key, value, expiry) {
    var expires = new Date();
    expires.setTime(expires.getTime() + (expiry * 24 * 60 * 60 * 1000));
    document.cookie = key + '=' + value + ';expires=' + expires.toUTCString() + ';samesite=lax';
  },
  
  getCookie: function(key) {
    var keyValue = document.cookie.match('(^|;) ?' + key + '=([^;]*)(;|$)');
    return keyValue ? keyValue[2] : null;
  },
  
  eraseCookie: function(key) {
    var keyValue = navbar.getCookie(key);
    navbar.setCookie(key, keyValue, '-1');
  },
  
  get_html: function() {
    var open_tag = '<' + navbar.list_tag + '>';
    var close_tag = '</' + navbar.list_tag + '>';
    var all_txt = '';
    var prev_level = 0;
    var hs = $('.text_cell_render').find('h1,h2,h3,h4,h5');
    for (i=0; i<hs.length; i++) {
      x = hs[i]
      level = parseInt(x.tagName.substr(1));
      diff = level - prev_level;
      if (diff > 1) {
        // Case of level skipping (e.g. h4 after h2)
        txt = '<li>&nbsp;</li>';  // Add empty list item
        i--;  // This step will be repeated, but with one extra parent in between
        level = prev_level + 1;  // We now simulate a higher level (in our example, h3)
        diff--;
      } else {
        txt = '<li><a href=#' + x.id + ' onclick="return navbar.scrollTo(this);">' + x.innerText.replace(/¶$/, '') + '</a></li>';
      }
      if (diff > 0) {
        all_txt = all_txt.slice(0,-5);  // Remove '</li>' sufix
        txt = open_tag + txt;
      }
      for (j=diff; j<0; j++) {
        txt = close_tag + '</li>' + txt;
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
    
    // Check of there is a cookie marking navbar as collapsed
    if (navbar.getCookie('navbar_collapsed') == "true"){
      $('#nav_wrapper').addClass('collapsed');
    }
    
    $(window).resize(function() {
      $('#nav_wrapper').height($(window).height() - $('#header').height());
    });
    
    $('#nav_toggle').click(function() {
      var collapsed = $('#nav_wrapper').toggleClass('collapsed').hasClass('collapsed');
      navbar.setCookie('navbar_collapsed', collapsed, 1000);  // Store collapse state in cookie
    });

    
    requirejs(['base/js/events'], function (events) {
      events.one('kernel_idle.Kernel', navbar.first_build);
    });
  },

}

if ($('body').hasClass('notebook_app')) {
  navbar.init();
}
