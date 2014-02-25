(function($, undefined) {

    var pluginName = 'MomentPicker';
    var today = moment().startOf('day');
    var defaults = {
        date : today,
        level: 0,
        style: {
            selected: 'selected',
            current : 'current'
        }
    };

    $.fn[pluginName] = function(options) {

        var plugin = $(this).data(pluginName);

        if(plugin) {

            return plugin;
        }

        return this.each(function() {

            var api;
            var settings = $.extend(true, {}, defaults, options);
            var showedDate = settings.date;
            var selectedDate = showedDate.clone();
            var picker = $(this);
            var _level = settings.level;

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

            var emit = function(name) {

                var event = $.Event(name);
                event.api = api;
                picker.trigger(event);
            };

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

                            selectedDate = date;
                            emit('pick');
                            showedDate = selectedDate.clone();
                            render();
                        }
                    }

                    return api;
                }

                return selectedDate.clone();
            };

            var renderYears = function() {

                var a = showedDate.year();
                var b = a + 12;
                var html = '';

                currentLevel.text(a + ' - ' + (b - 1));

                while (a < b) {

                    var classes = [];

                    if (a === today.year()) {

                        classes.push(settings.style.current);
                    }

                    if (a === selectedDate.year()) {

                        classes.push(settings.style.selected);
                    }

                    var type = allowedYear(a) ? 'a' : 'span';

                    html += '<' + type + ' data-year="' + a + '" class="' + classes.join(' ') + '">' + a + '</' + type + '>';
                    a++;
                }

                body.html(html);
                emit('renderYears');
            };

            var renderMonths = function() {

                var a = showedDate.clone().startOf('y');
                var b = a.clone().add('M', 12);
                var html = '';

                currentLevel.text(a.year());

                while (a < b) {

                    var classes = [];

                    if (a.format('M-YYYY') === today.format('M-YYYY')) {

                        classes.push(settings.style.current);
                    }

                    if (a.format('M-YYYY') === selectedDate.format('M-YYYY')) {

                        classes.push(settings.style.selected);
                    }

                    var type = allowedMonth(a) ? 'a' : 'span';

                    html += '<' + type + ' data-month="' + a.format('M-YYYY') + '" class="' + classes.join(' ') + '">' + a.format('MMM') + '</' + type + '>';
                    a.add('M', 1);
                }

                body.html(html);
                emit('renderMonths');
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
                var isNext = false;

                while (a < b) {

                    var classes =  [];

                    if (a.format('D-M-YYYY') === today.format('D-M-YYYY')) {

                        classes.push(settings.style.current);
                    }

                    if (a.format('D-M-YYYY') === selectedDate.format('D-M-YYYY')) {

                        classes.push(settings.style.selected);
                    }

                    var type = allowedDay(a) ? 'a' : 'span';

                    if (a.month() !== showedDate.month()) {

                        classes.push(isNext ? 'next' : 'prev');

                    } else {

                        isNext = true;
                    }

                    html += '<' + type + ' data-day="' + a.format('D-M-YYYY') + '" class="' + classes.join(' ') + '">' + a.date() + '</' + type + '>';
                    a.add('d', 1);
                }

                html += '</div>';

                body.html(html);
                emit('renderDays');
            };

            var args = [
                {years: 12},
                {years: 1},
                {months: 1}
            ];

            var renderer = [renderYears, renderMonths, renderDays];

            var render = function() {

                if (arguments.length > 0) {

                    _level = Math.max(arguments[0], settings.level);
                }

                picker.removeClass('top');

                if (_level === settings.level) {

                    picker.addClass('top');
                }

                renderer[_level]();
                emit('render');
            };

            var showNext = function() {

                showedDate.add(args[_level]);
                render();
                emit('showNext');
            };

            var showPrev = function() {

                showedDate.subtract(args[_level]);
                render();
                emit('showPrev');
            };
            
            next.click(showNext);
            prev.click(showPrev);

            currentLevel.click(function() {

                render(Math.max(0, --_level));
            });

            body.on('click', 'a[data-year]', function() {

                showedDate.year($(this).data('year'));
                render(1);
            });

            body.on('click', 'a[data-month]', function() {

                var date = moment($(this).data('month'), 'M-YYYY');
                showedDate.month(date.month()).year(date.year());
                render(2);
            });

            body.on('click', 'a[data-day]', function() {

                val(moment($(this).data('day'), 'D-M-YYYY'));
            });

            api = {
                val: val,
                next: showNext,
                prev: showPrev,
                renderYears: function () { render(0); },
                renderMonths: function () { render(1); },
                renderDays: function () { render(2); }
            };

            picker.data(pluginName, api);

            emit('ready');
            render();
        });
    };
})(jQuery);
