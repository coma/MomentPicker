(function($, _, undefined) {

    var pluginName = 'MomentPicker';

    $.fn[pluginName] = function(options) {

        var plugin = $(this).data(pluginName);

        if(plugin) {

            return plugin;
        }

        return this.each(function() {

            var date = moment();
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
            var current = header.children('a.current');

            var renderYears = function() {

                var a = date.year();
                var b = a + 12;
                var html = '';

                while (a < b) {

                    html += '<a data-year="' + a + '">' + a + '</a>';
                    a++;
                }

                body.html(html);
            };

            var renderMonths = function() {

                var a = date.month();
                var b = a + 12;
                var html = '';

                while (a < b) {

                    html += '<a data-month="' + a + '">' + a + '</a>';
                    a++;
                }

                body.html(html);
            };

            var renderDays = function() {


            };

            var levels = ['year', 'month', 'day'];
            var renderer = [renderYears, renderMonths, renderDays];

            var render = function() {

                renderer[level]();
            };
            
            next.click(function() {
                
                date.add(levels[level], 12);
                render();
            });

            prev.click(function() {

                date.subtract(levels[level], 12);
                render();
            });

            render();
        });
    };
})(jQuery, moment);
