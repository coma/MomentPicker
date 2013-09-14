(function($, _, undefined) {

    $.fn.MomentPicker = function(options) {

        var pluginName = 'MomentPicker';
        var plugin = $(this).data(pluginName);

        if(plugin) {

            return plugin;
        }

        return this.each(function() {

            var defaults = {};

            var picker = $(this);
            var data = picker.data('momentpicker');
            var settings = $.extend(defaults, data, options);
            var datePicked = _().startOf('day');
            var dateShowed = datePicked.clone();

            picker.html([
                '<div class="header">',
                '<a href="#" class="prev"></a>',
                '<a href="#" class="title"></a>',
                '<a href="#" class="next"></a>',
                '</div>',
                '<div class="dates">',
                '</div>',
            ].join(''));

            var prev = picker.find('a.prev');
            var next = picker.find('a.next');
            var title = picker.find('a.title');
            var dates = picker.find('div.dates');

            var renderDays = function() {

                var weekDays = [];
                var a = _().startOf('week');
                var b = _().endOf('week');

                while(a <= b) {

                    weekDays.push(a.format('[<th>]dd[</th>]'));
                    a.add('d', 1);
                };

                var monthDays = [];
                var days, i;
                a = dateShowed.clone().startOf('month').startOf('week');
                b = dateShowed.clone().endOf('month').endOf('week');

                while(a <= b) {

                    days = [];

                    for(i = 0; i < weekDays.length; i++) {


                        days.push(dateShowed.month() !== a.month() ? '<b>' + a.date() + '</b>' : '<a href="#" rel="' + a.date() + '">' + a.date() + '</a>');

                        a.add('d', 1);
                    }

                    monthDays.push('<tr><td>' + days.join('</td><td>') + '</td></tr>');
                }

                dates.html([
                    '<table>',
                    '<thead>',
                    '<tr>',
                    weekDays.join(''),
                    '</tr>',
                    '</thead>',
                    '<tbody>',
                    monthDays.join(''),
                    '</tbody>',
                    '</table>'
                ].join(''));
            };

            var render = function() {

                renderDays();
            };

            var api = {
                render: render
            };

            picker.data(pluginName, api);
            render();
        });
    };
})(jQuery, moment);
