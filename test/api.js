test('api', function() {

    var date = moment('2014-01-01');

    var config = {
        date: date,
        min: date.clone().subtract('y', 1),
        max: date.clone().add('y', 1)
    };

    var picker = $('#picker').MomentPicker(config);
    var api = picker.data('MomentPicker');
    var header = picker.children('div.header');
    var body = picker.children('div.body');

    ok(body.find('[data-year="2015"]').is('a'));
    ok(body.find('[data-year="2016"]').is('span'));

    api.max(config.max.add('y', 1));

    ok(body.find('[data-year="2015"]').is('a'));
    ok(body.find('[data-year="2016"]').is('a'));
    ok(body.find('[data-year="2017"]').is('span'));
});