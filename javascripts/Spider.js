var Spider = (function () {
    function cls (name, params) {
        var self = this;
        var project = {
            label: name,
            fillColor: 'rgba(50, 50, 50, 0.1)',
            strokeColor: 'rgba(50, 50, 50, 0.4)',
            pointColor: 'rgba(50, 50, 50, 0.4)',
            pointStrokeColor: '#aaa',
            pointHighlightFill: '#fff',
            pointHighlightStroke: '#888',
            data: [
                params.event,
                params.request,
                params.model,
                params.logic,
                params.view
            ]
        };
        var charData = {
            labels: ['Event', 'Request', 'Model', 'Logic', 'View'],
            datasets: [project]
        };
        var ctx = document.getElementById('canvas').getContext('2d');
        self.chart = new Chart(ctx).Radar(charData, {
            responsive: true,
            scaleFontSize: 10,
            scaleOverride: true,
            scaleSteps : 5,
            scaleStepWidth : 20,
            angleLineWidth: 4,
            pointDotRadius: 6,
            pointDotStrokeWidth: 3
        });
    }

    cls.prototype.update = function (params) {
        var self = this;
        var chart = self.chart;
        var points = chart.datasets[0].points;
        points[0].value = params.event || points[0].value;
        points[1].value = params.request || points[1].value;
        points[2].value = params.model || points[2].value;
        points[3].value = params.logic || points[3].value;
        points[4].value = params.view || points[4].value;

        chart.update();
    };

    return cls;
})();