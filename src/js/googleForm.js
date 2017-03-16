/**
 * Created by XuanVinh on 3/17/2017.
 */
$(document).ready(function() {
    $('select').material_select();
    $('.datepicker').pickadate({
        selectMonths: true,
        selectYears: 15
    });
    $.validator.setDefaults({
        ignore: []
    });
    $("form").validate({
        submitHandler: function(form) {
            console.log(form);
            return;
        },
        errorElement: 'div',
        errorPlacement: function(error, element) {
            var placement = $(element).data('error');
            if (placement) {
                $(placement).append(error)
            } else {
                error.insertAfter(element);
            }
        }
    });

});
