$(document).ready(function(){
  $( "header .btn_menu" ).click(function(event) {
   if ($(this).hasClass('is_active')) {
      $(this).removeClass('is_active');
      $(".menu_list").removeClass("show");

  }else{
      $(this).addClass('is_active');
       $(".menu_list").addClass("show");
  }
});
});