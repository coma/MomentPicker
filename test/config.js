test('config', function() {

    var config = {
        date: moment()
            .add('d', Math.round(365 * Math.random()))
            .startOf('day')
    };

    var picker = $('#picker').MomentPicker(config);
    var api = picker.data('MomentPicker');
    var header = picker.children('div.header');
    var body = picker.children('div.body');

    strictEqual(api.val().format(), config.date.format(), 'Initial date is correct.');
});