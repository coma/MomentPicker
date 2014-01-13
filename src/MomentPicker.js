(function($, undefined) {

    var pluginName = 'MomentPicker';

    $.fn[pluginName] = function(options) {

        var plugin = $(this).data(pluginName);

        if(plugin) {

            return plugin;
        }

        var defaults = {
            date: moment().startOf('day')
        };

        return this.each(function() {

            var settings = $.extend({}, defaults, options);

            var api;
            var showedDate = settings.date;
            var currentDate = showedDate.clone();
            var picker = $(this);
            var level = 0;

            picker.html([
                '<div class="header">',
                    '<a class="prev"></a>',
                    '<a class="current"></a>',
                    '<a class="next"></a>',
                '</div>',
                '<div class="body"></div>'
            ].join(''));

            var header = picker.children('div.header');
            var body = picker.children('div.body');
            var next = header.children('a.next');
            var prev = header.children('a.prev');
            var currentLevel = header.children('a.current');

            var falsy = function() {

                return false;
            };

            var dayBeforeMin = falsy,
                dayAfterMax = falsy,
                monthBeforeMin = falsy,
                monthAfterMax = falsy,
                yearBeforeMin = falsy,
                yearAfterMax = falsy,
                getMin = falsy,
                getMax = falsy;

            if (settings.hasOwnProperty('min')) {

                (function() {

                    if (settings.min instanceof Function) {

                        getMin = settings.min;

                    } else {

                        var min = moment(settings.min);

                        if (moment.isMoment(min)) {

                            min.startOf('day');
                            getMin = function() {

                                return min.clone();
                            };
                        }
                    }

                    yearBeforeMin = function(year) {

                        return year < getMin().year();
                    };

                    monthBeforeMin = function(date) {

                        return date.clone().startOf('month') < getMin().startOf('month');
                    };

                    dayBeforeMin = function(date) {

                        return date < getMin();
                    };
                })();
            }

            if (settings.hasOwnProperty('max')) {

                (function() {

                    if (settings.max instanceof Function) {

                        getMax = settings.max;

                    } else {

                        var max = moment(settings.max);

                        if (moment.isMoment(max)) {

                            max.startOf('day');
                            getMax = function() {

                                return max.clone();
                            };
                        }
                    }

                    yearAfterMax = function(year) {

                        return year > getMax().year();
                    };

                    monthAfterMax = function(date) {

                        return date.clone().endOf('month') > getMax().endOf('month');
                    };

                    dayAfterMax = function(date) {

                        return date > getMax();
                    };
                })();
            }

            var allowedYear = function(year) {

                return !yearBeforeMin(year) && !yearAfterMax(year);
            };

            var allowedDay = function(date) {

                return !dayBeforeMin(date) && !dayAfterMax(date);
            };

            var allowedMonth = function(date) {

                return !monthBeforeMin(date) && !monthAfterMax(date);
            };

            var val = function() {

                if (arguments.length > 0) {

                    var date = moment(arguments[0]);

                    if (moment.isMoment(date)) {

                        date.startOf('day');

                        if (allowedDay(date)) {

                            currentDate = date;
                        }
                    }

                    return api;
                }

                return currentDate.clone();
            };

            var renderYears = function() {

                var a = showedDate.year();
                var b = a + 12;
                var html = '';

                currentLevel.text(a + ' - ' + (b - 1));

                while (a < b) {

                    var classes = a !== currentDate.year() ? [] : ['current'];
                    var type = allowedYear(a) ? 'a' : 'span';

                    html += '<' + type + ' data-year="' + a + '" class="' + classes.join(' ') + '">' + a + '</' + type + '>';
                    a++;
                }

                body.html(html);
            };

            var renderMonths = function() {

                var a = showedDate.clone().startOf('y');
                var b = a.clone().add('M', 12);
                var html = '';

                currentLevel.text(a.year());

                while (a < b) {

                    var classes = a.format('M-YYYY') !== currentDate.format('M-YYYY') ? [] : ['current'];
                    var type = allowedMonth(a) ? 'a' : 'span';

                    html += '<' + type + ' data-month="' + a.format('M-YYYY') + '" class="' + classes.join(' ') + '">' + a.format('MMM') + '</' + type + '>';
                    a.add('M', 1);
                }

                body.html(html);
            };

            var renderDays = function() {

                var a = showedDate.clone().startOf('w');
                var b = a.clone().add('w', 1);
                var html = '<div class="week">';

                currentLevel.text(showedDate.format('MMMM YYYY'));

                while (a < b) {

                    html += '<span>' + a.format('ddd') + '</span>';
                    a.add('d', 1);
                }

                html += '</div>';

                a = showedDate.clone().startOf('M').startOf('w');
                b = a.clone().add('d', 42);
                html += '<div class="month">';

                while (a < b) {

                    var classes = a.format('D-M-YYYY') !== currentDate.format('D-M-YYYY') ? [] : ['current'];
                    var type = allowedDay(a) ? 'a' : 'span';

                    html += '<' + type + ' data-day="' + a.format('D-M-YYYY') + '" class="' + classes.join(' ') + '">' + a.date() + '</' + type + '>';
                    a.add('d', 1);
                }

                html += '</div>';

                body.html(html);
            };

            var args = [
                {years: 12},
                {years: 1},
                {months: 1}
            ];

            var renderer = [renderYears, renderMonths, renderDays];

            var render = function() {

                renderer[level]();
            };
            
            next.click(function() {

                showedDate.add(args[level]);
                render();
            });

            prev.click(function() {

                showedDate.subtract(args[level]);
                render();
            });

            currentLevel.click(function() {

                level = Math.max(0, --level);
                render();
            });

            body.on('click', 'a[data-year]', function() {

                showedDate.year($(this).data('year'));
                level = 1;
                render();
            });

            body.on('click', 'a[data-month]', function() {

                var date = moment($(this).data('month'), 'M-YYYY');
                showedDate.month(date.month()).year(date.year());
                level = 2;
                render();
            });

            body.on('click', 'a[data-day]', function() {

                currentDate = moment($(this).data('day'), 'D-M-YYYY');
                showedDate = currentDate.clone();
                render();
            });

            api = {
                val: val
            };

            picker.data(pluginName, api);

            render();
        });
    };
})(jQuery);
