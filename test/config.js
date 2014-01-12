test('config', function() {

    var date = moment().startOf('day');
    var picker = $('#picker').MomentPicker();
    var api = picker.data('MomentPicker');
    var header = picker.children('div.header');
    var body = picker.children('div.body');
});