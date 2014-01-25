test('events', function() {

    var events = [
        'ready',
        'renderYears',
        'render',
        'renderMonths',
        'render',
        'renderDays',
        'render',
        'pick',
        'renderDays',
        'render'
    ];

    var names = [];
    $.each(events, function(i, name) {

        if (names.indexOf(name) < 0) {

            names.push(name);
        }
    });

    expect(3 * events.length);

    var picker = $('#picker').on(names.join(' '), function(event) {

        strictEqual(event.type, events.shift(), 'Event fired.');
        ok(picker.is(this), 'Callback context is the picker DOM node.');
        deepEqual(picker.data('MomentPicker'), event.api, 'Event has an api reference.');
    });

    picker
        .MomentPicker()
        .find('div.body a:first')
        .click()
        .end()
        .find('div.body a:first')
        .click()
        .end()
        .find('div.body a:first')
        .click();
});