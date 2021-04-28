$(document).ready(function(){
    $("div.hide").hide();

$("h3").click(function () {
    $(this).next("div.hide").slideToggle("slow");
});

$("button.hide").click(function () {
    $(this).parents("div.hide").slideToggle("slow");
});
});