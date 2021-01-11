$(document).ready(function() {

  // just change all the forms
  $("select[name=seq],input[name=seq]").each(function() {
    var $seq = $(this);
    var form = $seq.parents("form").get(0);
    var href = $(form).attr('action');
    if ( href.indexOf("/cgi/") < 0 || href.indexOf("/idx") > -1 ) {
        // rewritten URL
        form._old_submit = form.submit;
        form.submit = function() {
          var seq = $seq.val();
          href += "/" + seq;
          $(this).attr('action', href);
          //$seq.attr('name', '');
          $seq.attr('disabled', true);
          this._old_submit(arguments);
        }
    }
  })
  
})
