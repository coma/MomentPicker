test('basic', function() {

    var date = moment().startOf('day');
    var picker = $('#picker').MomentPicker();
    var api = picker.data('MomentPicker');
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

    strictEqual(api.val().format(), date.format(), 'Current date is correct.');

    var years = body.children();

    strictEqual(years.length, 12, 'Body has 12 years.');
    equal(years.first().text(), date.year(), 'First year is the current year.');
    equal(years.last().text(), date.year() + 11, 'Last year is 11 years after the current year.');
    ok(years.first().hasClass('selected'), 'The current year has the current class.');
    strictEqual(current.text(), date.year() + ' - ' + (date.year() + 11), 'Current years shows first and last.');

    next.click();
    years = body.children();
    date.add('y', 12);

    strictEqual(years.length, 12, 'Body has 12 years.');
    equal(years.first().text(), date.year(), 'First year is 12 years after the current year (next clicked).');
    equal(years.last().text(), date.year() + 11, 'Last year is 23 years after the current year (next clicked).');
    ok(years.filter('.selected').length === 0, 'The current year is not here.');
    strictEqual(current.text(), date.year() + ' - ' + (date.year() + 11), 'Current years shows first and last.');

    prev.click();
    years = body.children();
    date.subtract('y', 12);

    strictEqual(years.length, 12, 'Body has 12 years.');
    equal(years.first().text(), date.year(), 'First year is the current year (prev clicked).');
    equal(years.last().text(), date.year() + 11, 'Last year is 11 years after the current year (prev clicked).');
    ok(years.first().hasClass('selected'), 'The current year has the current class.');
    strictEqual(current.text(), date.year() + ' - ' + (date.year() + 11), 'Current years shows first and last.');

    years.eq(2).click();
    date.add('y', 2);
    var months = body.children();

    strictEqual(months.length, 12, 'Body has 12 months.');
    strictEqual(months.first().text(), 'Jan', 'First month is january.');
    strictEqual(months.last().text(), 'Dec', 'Last month is december.');
    equal(current.text(), date.year(), 'Current year shows the year.');

    next.click();
    months = body.children();
    date.add('y', 1);

    strictEqual(months.length, 12, 'Body has 12 months.');
    strictEqual(months.first().text(), 'Jan', 'First month is january.');
    strictEqual(months.last().text(), 'Dec', 'Last month is december.');
    ok(months.filter('.selected').length === 0, 'The current month is not here.');
    equal(current.text(), date.year(), 'Current year shows the year.');

    prev.click();
    months = body.children();
    date.subtract('y', 1);

    strictEqual(months.length, 12, 'Body has 12 months.');
    strictEqual(months.first().text(), 'Jan', 'First month is january.');
    strictEqual(months.last().text(), 'Dec', 'Last month is december.');
    equal(current.text(), date.year(), 'Current year shows the year.');

    months.eq(2).click();
    date.month(2);
    var week = body.children('div.week');
    var month = body.children('div.month');

    ok(week.length === 1, 'Body has week days.');
    strictEqual(week.children().length, 7, 'Week has 7 days.');
    ok(month.length === 1, 'Body has month days.');
    strictEqual(month.children().length, 42, '42 month days are shown.');
    strictEqual(current.text(), date.format('MMMM YYYY'), 'Current month-year is correct.');

    next.click().click();
    week = body.children('div.week');
    month = body.children('div.month');
    date.add('M', 2);

    ok(week.length === 1, 'Body has week days.');
    strictEqual(week.children().length, 7, 'Week has 7 days.');
    ok(month.length === 1, 'Body has month days.');
    strictEqual(month.children().length, 42, '42 month days are shown.');
    ok(month.children('.selected').length === 0, 'The current day is not here.');

    prev.click().click();
    week = body.children('div.week');
    month = body.children('div.month');
    date.subtract('M', 2);

    ok(week.length === 1, 'Body has week days.');
    strictEqual(week.children().length, 7, 'Week has 7 days.');
    ok(month.length === 1, 'Body has month days.');
    strictEqual(month.children().length, 42, '42 month days are shown.');
    strictEqual(current.text(), date.format('MMMM YYYY'), 'Current month-year is correct.');

    next.click();
    var day = body.find('div.month > a:eq(7)');
    date = day.data('day');
    day.click();

    ok(api.val().format('D-M-YYYY') === date, 'The selected date is correct.');

    current.click();
    months = body.children();
    date = api.val();

    strictEqual(months.length, 12, 'Body has 12 months.');
    strictEqual(months.first().text(), 'Jan', 'First month is january.');
    strictEqual(months.last().text(), 'Dec', 'Last month is december.');
    ok(months.filter('.selected').text() === date.format('MMM'), 'The current month has the current class.');
    equal(current.text(), date.year(), 'Current year shows the year.');

    current.click();
    years = body.children();

    strictEqual(years.length, 12, 'Body has 12 years.');
    equal(years.first().text(), date.year(), 'First year is the current year.');
    equal(years.last().text(), date.year() + 11, 'Last year is 11 years after the current year.');
    ok(years.first().hasClass('selected'), 'The current year has the current class.');
    strictEqual(current.text(), date.year() + ' - ' + (date.year() + 11), 'Current years shows first and last.');

    current.click();
    years = body.children();

    strictEqual(years.length, 12, 'Body has 12 years.');
    equal(years.first().text(), date.year(), 'First year is the current year.');
    equal(years.last().text(), date.year() + 11, 'Last year is 11 years after the current year.');
    ok(years.first().hasClass('selected'), 'The current year has the current class.');
    strictEqual(current.text(), date.year() + ' - ' + (date.year() + 11), 'Current years shows first and last.');
});