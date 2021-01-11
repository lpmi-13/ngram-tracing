resizePdfFrame = function() {
  // find any embed tags and maximize them 
  var $pdfFrame = $("iframe#pdfFrame");
  if($pdfFrame.length) {
      
    if ( $pdfFrame.hasClass("pdfFrameHidden") ) {
        $pdfFrame.hide();
        
        var html = '<p>Your PDF download will start shortly...</p>';
        html += '<p><small>Problems with the download? Please use this <a href="' + $pdfFrame.attr('src') + '">direct link</a>.</small></p>';
        
        $pdfFrame.after(html);
        return;
    }
      
    var $body = $("html");
    var $footer = $("#footer");
    $body.css("overflow", "hidden");
    var w = $body.innerWidth();
    var h = $(window).height();
    var pos = $pdfFrame.position();
    $pdfFrame.css('height', h - pos.top - 25) // - $footer.outerHeight() - $pdfFrame.outerHeight())
             .css('width', w - 140)

    setTimeout(function() {
      $pdfFrame.get(0).contentWindow.focus()
    }, 500);
    

  }
}

initPdfViewer = function() {
  var use_viewer;
  var use_google;
  
  var href = $("a#pdfFrame").attr('href');
  
  if ( ! href ) {
      return;
  }
  
  if ( $.browser.msie ) {
    // assume Acrobat is installed; may not be entirely true
    var check = null;
    var c;
    try {
      check = new window.ActiveXObject("AcroPDF.PDF");
    } catch(c) {
      try {
        check = new window.ActiveXObject("PDF.PdfCtrl");
      } catch(c) {}
    }
    use_viewer = ( check != null );
    use_google = ! use_viewer;
  } else if ( $.browser.safari && navigator.userAgent.indexOf("Chrome") < 0 ) {
    // assume this is Safari, not Chrome
    use_viewer = true;
    use_google = false;
  } else {
    use_viewer = false;
    var plugins = navigator.plugins;
    for(var i = 0; i < plugins.length; i++) {
      var plugin = plugins[i];
      for(var ii = 0; ii < plugin.length; ii++) {
        if ( plugin[ii].type == "application/pdf" ) {
          use_viewer = true;
          break;
        }
      }
    }
    use_google = ! use_viewer;
  }
  
  if ( window.location.search.indexOf("debug=embed") >= 0 ) {
    use_google = true;
  }

  if ( use_google ) {
    
    installPdfViewer(href, 1, '#pdfFrame');

  } else {
    
    installPdfViewer(href, 0, '#pdfFrame');
    
    $("<button>Print PDF</button>").insertAfter("select[name=view]").click(function() {
      $("#pdfFrame").get(0).contentWindow.print();
      return false;
    })
    
  }
}

installPdfViewer = function(href, use_google, selector) {
  // if ( use_google ) {
  //   href = window.location.protocol + "//docs.google.com/viewer?embedded=true&url=" 
  //          + "http://" + window.location.hostname + href;    
  // }
  
  var klass = "";
  if ( use_google ) {
      klass = 'class="pdfFrameHidden"';
  }
  
  $(selector).replaceWith('<iframe id="pdfFrame" ' + klass + ' src="' + href + '"></iframe>');
  resizePdfFrame();
}


$(document).ready(function() {

  $(window).resize(function() {
    resizePdfFrame();
  })
  
  initPdfViewer();
  
})
