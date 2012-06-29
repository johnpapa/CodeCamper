define('wijmo.gauge.defaults',
    ['jquery'],
    function($) {
        $(document).ready(function() {
            var radialGaugeOptions = $.wijmo.wijradialgauge.prototype.options;

            // override only the settings we want to change for this app
            radialGaugeOptions.cap.radius = 2;
            radialGaugeOptions.cap.style = {
                fill: '#000',
                stroke: 'none'
            };
            radialGaugeOptions.pointer.style = {
                fill: '#000',
                stroke: 'none'
            };
            radialGaugeOptions.pointer.shape = 'rect';
            radialGaugeOptions.face.style = {
                fill: 'none',
                stroke: 'none'
            };
            radialGaugeOptions.startAngle = -45;
            radialGaugeOptions.sweepAngle = 270;
            radialGaugeOptions.tickMajor.style = {
                fill: '#fff',
                stroke: 'none'
            };
            radialGaugeOptions.tickMajor.offset = 15;
            radialGaugeOptions.tickMajor.interval = 25;
            radialGaugeOptions.tickMinor.style = {
                fill: '#fff',
                stroke: 'none'
            };
            radialGaugeOptions.tickMinor.offset = 15;
            radialGaugeOptions.tickMinor.interval = 5;
            radialGaugeOptions.labels.visible = true;
            radialGaugeOptions.labels.offset = -10;
            radialGaugeOptions.labels.style = {
                fill: "#000",
                "font-size": "13px",
                "font-weight": "100",
                "font-family": 'Segoe UI Light'
            };
            radialGaugeOptions.height = 200;
            radialGaugeOptions.width = 200;
            radialGaugeOptions.radius = 100;
            radialGaugeOptions.ranges = [{
                    startWidth: 18,
                    endWidth: 18,
                    startValue: 0,
                    endValue: 100,
                    startDistance: 0.7,
                    endDistance: 0.7,
                    style: {
                        fill: "0-#119EDA-#194D7B",
                        stroke: "none",
                        opacity: 1
                    }
                }, {
                    startWidth: 18,
                    endWidth: 18,
                    startValue: 90,
                    endValue: 100,
                    startDistance: 0.7,
                    endDistance: 0.7,
                    style: {
                        fill: "#f58a00",
                        stroke: "none",
                        opacity: 1
                    }
                }];

            // apply default options to the radial gauge
            $.extend($.wijmo.wijradialgauge.prototype.options, radialGaugeOptions);
        });
    });