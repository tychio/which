(function ($) {
    var spider = new Spider('Your Project', {
        event: 50,
        request: 50,
        model: 50,
        logic: 50,
        view: 50,
    });

    $('#project input').on('change', function () {
        var settings = {};
        var $range = $(this);
        settings[$range.attr('name')] = $range.val();

        spider.update(settings);
    });
})(jQuery);