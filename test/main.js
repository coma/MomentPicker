test('basic', function() {

    var date = moment();

    var picker = $('#picker').MomentPicker();
    var header = picker.children('div.header');
    var body = picker.children('div.body');

    ok(header.length === 1, 'Has a header.');
    ok(header.length === 1, 'Has a body.');

    var next = header.children('a.next');
    var prev = header.children('a.prev');
    var current = header.children('a.current');

    ok(next.length === 1, 'Header has a next button.');
    ok(prev.length === 1, 'Header has a prev button.');
    ok(current.length === 1, 'Header has a current button.');

    var years = body.children('a');

    ok(years.length === 12, 'Body has 12 years.');
    equal(years.first().text(), date.year() - 3, 'First year is 3 years before the current year.');
    equal(years.last().text(), date.year() + 8, 'Last year is 8 years after the current year.');

    next.click();
    years = body.children('a');

    ok(years.length === 12, 'Body has 12 years.');
    equal(years.first().text(), date.year() + 9, 'First year is 9 years after the current year.');
    equal(years.last().text(), date.year() + 20, 'Last year is 20 years after the current year.');

    prev.click();
    years = body.children('a');

    ok(years.length === 12, 'Body has 12 years.');
    equal(years.first().text(), date.year() - 3, 'First year is 3 years before the current year.');
    equal(years.last().text(), date.year() + 8, 'Last year is 8 years after the current year.');
});