$( document ).ready(function() {
  $('textarea').on('keyup', function() {
    var max = 140;
    var length =  max-($(this).val().length);
    $(this).parent().find('.counter').text(length);
    if (length <= 0) {
      $(this).parent().find('.counter').addClass('redmax');
    } else {
      $(this).parent().find('.counter').removeClass('redmax');
    }
  });
});
