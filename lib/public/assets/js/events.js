 var server = io.connect("http://localhost:3001");

server.on('chart-new-data', function(data) {
    var x = (new Date()).getTime();
    var y = 0;

    if (data.code !== 500) {
        y = data.metrics["percentage-use"] * 100;
    }

    chart.series[0].addPoint([x, y], true, true);
});
