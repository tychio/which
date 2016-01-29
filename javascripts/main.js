(function ($) {
    var spider = new Spider('Your Project', {
        event: 50,
        request: 50,
        model: 50,
        logic: 50,
        view: 50,
    }).render();

    $('#project input').on('change', function () {
        var settings = {};
        var $range = $(this);
        settings[$range.attr('name')] = $range.val();

        spider.update(settings);
    });

    $('#frameworks .badge').on('click', function () {
        var $badge = $(this);
        if ($badge.hasClass('active')) {
            $badge.removeClass('active');
        } else {
            $badge.addClass('active');
            var name = $badge.text();
            var color = $badge.css('backgroundColor');
            var params = $badge.data('params').split(',');
            spider.append(name, {
                event: params[0],
                request: params[1],
                model: params[2],
                logic: params[3],
                view: params[4]
            }, color).render();
        }
    });

})(jQuery);