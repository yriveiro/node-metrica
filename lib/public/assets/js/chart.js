var chart = new Highcharts.Chart({
    chart: {
        renderTo: 'graph',
        defaultSeriesType: 'spline',
        marginRight: 10,
        events: {
            load: function () {
                server.emit('chat-start', {'id': 123, 'graph': 'mem'});
            }
        }
    },
    title: {
        text: ''
    },
    xAxis: {
        type: 'datetime',
        tickPixelInterval: 150
    },
    yAxis: {
        min: 0,
        max: 100,
        title: {
            text: 'MEM USED - %'
        },
        plotLines: [{
            value: 0,
            width: 1,
            color: '#808080'
        }],
        plotBands: [
            { // highlight area
                from: 90,
                to: 100,
                color: 'rgba(255, 0, 0, 0.2)',
                label: {
                    text: 'Critical',
                    style: {
                        color: '#606060'
                    }
                }
            },
            {
                from: 80,
                to: 90,
                color: 'rgba(255, 165, 0, 0.2)',
                label: {
                    text: 'Warning',
                    style: {
                        color: '#606060'
                    }
                }
            }
        ]
    },
    tooltip: {
        formatter: function () {
            return '<b>' + this.series.name + '</b><br/>' + Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' + Highcharts.numberFormat(this.y, 2);
        }
    },
    legend: {
        enabled: false
    },
    exporting: {
        enabled: false
    },
    plotOptions: {
        spline: {
            dataLabels: {
                enabled: true,
                borderColor: 'black',
                backgroundColor: 'rgba(255, 69, 0, 0.5)',
                borderRadius: 25,
                borderWidth: 1,
                padding: 10,
                y: -5,
                x: -5,
                style: {
                    fontWeight: 'bold'
                },
                formatter: function () {
                    if (!this.series.inc) {
                        this.series.inc = 1;
                    }

                    if (this.series.inc >= parseInt(this.series.data.length)) {
                        this.series.inc = 0;
                        return this.point.y;
                    }

                    this.series.inc++;
                }
            },
            marker: {
                enabled: false
            }
        }
    },
    series: [{
        name: '% MEM',
        data: (function() {
            var data = [];

            for (var i = 0; i < 25; i++) {
                data.push({
                    x: (new Date()).getTime(),
                    y: 0
                });
            }

            return data;
        })()
    }]
});
