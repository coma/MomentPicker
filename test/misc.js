test('misc', function() {

    var date = moment('2014-01-01');

    var config = {
        date: date
    };

    var picker = $('#picker').MomentPicker(config);

    picker
        .data('MomentPicker')
        .renderDays();

    var a = date
        .clone()
        .startOf('week');

    var b = a
        .clone()
        .add('d', 2);

    while (a < b) {

        ok(picker.find('[data-day="' + a.format('D-M-YYYY') + '"]').hasClass('prev'), 'Days from prev month.');
        a.add('d', 1);
    }

    a = date
        .clone()
        .endOf('month')
        .add('d', 1);

    b = a
        .clone()
        .add('d', 8);

    while (a < b) {

        ok(picker.find('[data-day="' + a.format('D-M-YYYY') + '"]').hasClass('next'), 'Days from next month.');
        a.add('d', 1);
    }
});