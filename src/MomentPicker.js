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

            var val = function() {

                if (arguments.length > 0) {

                    var date = moment(arguments[0]);

                    if (moment.isMoment(date)) {

                        currentDate = date.startOf('day');
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

                    var c = a !== currentDate.year() ? '' : ' class="current"';

                    html += '<a data-year="' + a + '"' + c + '>' + a + '</a>';
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

                    var c = a.format('M-YYYY') !== currentDate.format('M-YYYY') ? '' : ' class="current"';

                    html += '<a data-month="' + a.format('M-YYYY') + '"' + c + '>' + a.format('MMM') + '</a>';
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

                    var c = a.format('D-M-YYYY') !== currentDate.format('D-M-YYYY') ? '' : ' class="current"';

                    html += '<a data-day="' + a.format('D-M-YYYY') + '"' + c + '>' + a.date() + '</a>';
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

            body.on('click', '[data-year]', function() {

                currentDate.year($(this).data('year'));
                showedDate = currentDate.clone();
                level = 1;
                render();
            });

            body.on('click', '[data-month]', function() {

                var date = moment($(this).data('month'), 'M-YYYY');
                currentDate.month(date.month()).year(date.year());
                showedDate = currentDate.clone();
                level = 2;
                render();
            });

            body.on('click', '[data-day]', function() {

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
