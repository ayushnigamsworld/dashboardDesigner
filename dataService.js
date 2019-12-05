angular.module('app')
.factory('DataService', function() {
  return {
    doughnutChart: {
      options: doughnutChartOptions
    },
    bar: {
      options: discreteBarChartOptions
    },
    pie: {
      options: pieChartOptions
    },
    barRotated: {
      options: scatterChartOptions
    }
  };


	/**
	 *  Data & Options Generators
	 */
	function doughnutChartOptions() {
	  return {
                 tooltip: {
                     trigger: 'item',
                     formatter: "{a} <br/>{b}: {c} ({d}%)"
                 },
                 legend: {
                     orient: 'vertical',
                     x: 'left',
                     data:['Available','Away','Busy','Active']
                 },
                 series: [
                     {
                         name:'DoughnutChart',
                         type:'pie',
                         radius: ['50%', '70%'],
                         avoidLabelOverlap: false,
                         label: {
                             normal: {
                                 show: false,
                                 position: 'center'
                             },
                             emphasis: {
                                 show: true,
                                 textStyle: {
                                     fontSize: '30',
                                     fontWeight: 'bold'
                                 }
                             }
                         },
                         labelLine: {
                             normal: {
                                 show: false
                             }
                         },
                         data:[
                             {value:5, name:'Available'},
                             {value:3, name:'Away'},
                             {value:2, name:'Busy'},
                             {value:1, name:'Active'}
                         ]
                     }
                 ]
             };

	}

	function discreteBarChartOptions() {
	  return {
            tooltip: {},
            legend: {
                data:[]
            },
            xAxis: {
                data: []
            },
            yAxis: {},
            series: [{
                type: 'bar',
                data: []
            }]
        };
	}

  function pieChartOptions() {
    return {
    backgroundColor: '#2c343c',
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    series : [
        {
            name:'Pie Chart',
            type:'pie',
            radius : '55%',
            center: ['50%', '50%'],
            data:[
                {value:35, name:'Handled Calls'},
                {value:40, name:'Inbound Calls'},
                {value:4, name:'Outbound Calls'},
                {value:44, name:'Total Calls'}
            ].sort(function (a, b) { return a.value - b.value; }),
            roseType: 'radius',
            label: {
                normal: {
                    textStyle: {
                        color: 'rgba(255, 255, 255, 0.3)'
                    }
                }
            },
            labelLine: {
                normal: {
                    lineStyle: {
                        color: 'rgba(255, 255, 255, 0.3)'
                    },
                    smooth: 0.2,
                    length: 10,
                    length2: 20
                }
            },
            itemStyle: {
                normal: {
                    color: '#c23531',
                    shadowBlur: 200,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            },

            animationType: 'scale',
            animationEasing: 'elasticOut',
            animationDelay: function (idx) {
                return Math.random() * 200;
            }
        }
    ]
};
  }

  function scatterChartOptions() {
    return {
              xAxis: {},
              yAxis: {},
              series: [{
                  symbolSize: 20,
                  data: [
                      [10.0, 8.04],
                      [8.0, 6.95],
                      [13.0, 7.58],
                      [9.0, 8.81],
                      [11.0, 8.33],
                      [14.0, 9.96],
                      [6.0, 7.24],
                      [4.0, 4.26],
                      [12.0, 10.84],
                      [7.0, 4.82],
                      [5.0, 5.68]
                  ],
                  type: 'scatter'
              }]
          };
  }

});
