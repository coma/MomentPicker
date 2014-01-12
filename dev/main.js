$(function() {

    var date = moment();

    $('#picker').MomentPicker({
        min: date,
        max: date.clone().add('y', 5)
    });
});