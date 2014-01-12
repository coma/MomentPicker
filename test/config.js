test('config', function() {

    var random = function() {

        return Math.round(365 * Math.random());
    };

    var date = moment()
        .add('d', random())
        .startOf('day');

    var config = {
        date: date,
        min: date.clone().subtract('d', random()),
        max: date.clone().add('d', random())
    };

    var picker = $('#picker').MomentPicker(config);
    var api = picker.data('MomentPicker');
    var header = picker.children('div.header');
    var body = picker.children('div.body');

    strictEqual(api.val().format(), date.format(), 'Initial date is correct.');

    api.val(config.min.clone().subtract('d', 1));

    strictEqual(api.val().format(), date.format(), 'Current date is correct.');

    api.val(config.max.clone().add('d', 1));

    strictEqual(api.val().format(), date.format(), 'Current date is correct.');
});