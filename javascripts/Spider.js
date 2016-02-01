var Spider = (function () {
    function cls (name, params) {
        var self = this;
        var ctx = document.getElementById('canvas').getContext('2d');
        self.chart = new Chart(ctx);

        self.chartData = {
            labels: ['Event', 'Request', 'Model', 'Logic', 'View'],
            datasets: [_createDataset(name, params)]
        };

        self.options = {
            responsive: true,
            scaleFontSize: 10,
            scaleOverride: true,
            scaleSteps : 5,
            scaleStepWidth : 20,
            angleLineWidth: 4,
            pointDotRadius: 4,
            pointDotStrokeWidth: 2,
            multiTooltipTemplate: '<%if (datasetLabel){%><%=datasetLabel%>: <%}%><%= value %>'
        };
    }

    cls.prototype.render = function (options) {
        var self = this;
        self.radar = self.chart.Radar(self.chartData, options || self.options);
        return self;
    };

    cls.prototype.append = function (name, params, color) {
        var self = this;
        self.chartData.datasets.push(_createDataset(name, params, color));
        return self;
    };

    cls.prototype.remove = function (name) {
        var self = this;
        var datasets = self.chartData.datasets;
        for (var index = 0; index < datasets.length; index++) {
            if (datasets[index].label == name) {
                datasets.splice(index, 1);
                index = datasets.length;
            }
        }

        return self;
    };

    cls.prototype.update = function (params) {
        var self = this;
        var radar = self.radar;
        var points = radar.datasets[0].points;
        var data = self.chartData.datasets[0].data;
        data[0] = points[0].value = params.event || points[0].value;
        data[1] = points[1].value = params.request || points[1].value;
        data[2] = points[2].value = params.model || points[2].value;
        data[3] = points[3].value = params.logic || points[3].value;
        data[4] = points[4].value = params.view || points[4].value;

        radar.update();

        return self;
    };

    function _createDataset (name, params, color) {
        var rgb = _rgb(color || '#333333');
        return {
            label: name,
            fillColor: 'rgba(' + rgb.normal + ', 0.1)',
            strokeColor: 'rgba(' + rgb.lighten + ', 0.7)',
            pointColor: 'rgba(' + rgb.darken + ', 0.5)',
            pointStrokeColor: 'rgba(' + rgb.lighten + ', 0.8)',
            pointHighlightFill: '#fff',
            pointHighlightStroke: 'rgba(' + rgb.normal + ', 0.8)',
            data: [
                params.event,
                params.request,
                params.model,
                params.logic,
                params.view
            ]
        };
    }

    function _rgb (color) {
        var rgb;
        if (color.indexOf('rgb') >= 0) {
            rgb = color.match(/\d{1,3}/g);
        } else {
            rgb = color.replace(/[\d\w]{2}/g, function ($1) { return '|' + $1 }).split('|').slice(1);
        }
        
        return {
            normal: rgb.map(_hex2deci).join(','),
            lighten: rgb.map(function (color) { return _hex2deci(color, 1.4); }).join(','),
            darken: rgb.map(function (color) { return _hex2deci(color, 0.6); }).join(','),
        };
    }

    function _hex2deci (hex, power) {
        var deci = ('0x' + hex - 0).toString(10);
        var result = deci * (power || 1);
        return Math.ceil(result > 255 ? 255 : result);
    }

    return cls;
})();