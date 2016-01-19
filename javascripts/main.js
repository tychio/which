(function () {
    var project = {
        label: 'Your Project',
        fillColor: 'rgba(50, 50, 50, 0.1)',
        strokeColor: 'rgba(50, 50, 50, 0.4)',
        pointColor: 'rgba(50, 50, 50, 0.4)',
        pointStrokeColor: '#aaa',
        pointHighlightFill: '#fff',
        pointHighlightStroke: '#888',
        data: [60,60,60,60,60]
    };
    var charData = {
        labels: ['Event', 'Request', 'Model', 'Logic', 'View'],
        datasets: [project]
    };
    var ctx = document.getElementById('canvas').getContext('2d');
    var spidar = new Chart(ctx).Radar(charData, {
        responsive: true,
        showTooltips: false,
        scaleFontSize: 10,
        angleLineWidth: 4,
        pointDotRadius: 6,
        pointDotStrokeWidth: 3
    });
})();