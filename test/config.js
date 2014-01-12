test('config', function() {

    var date = moment()
        .add('d', Math.round(365 * Math.random()))
        .startOf('day');

    var config = {
        date: date
    };

    var picker = $('#picker').MomentPicker(config);
    var api = picker.data('MomentPicker');
    var header = picker.children('div.header');
    var body = picker.children('div.body');

    strictEqual(api.val().format(), date.format(), 'Initial date is correct.');
});