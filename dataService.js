angular.module('app')
.factory('DataService', function() {
  return {
    bar: {
      options: barChartOptions
    },
    funnel: {
      options: funnelChartOptions
    },
    area:{
        options: areaChartOptions
    },
    pie:{
        options: pieChartOptions
    },
    barRotated:{
        options: barChartRotatedOptions
    },
    line:{
        options: lineChartOptions
    }
  };


	/**
	 *  Data & Options Generators
	 */
	function barChartOptions() {
	  return   {
                  xAxis: {
                      type: 'category',
                      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                  },
                  yAxis: {
                      type: 'value'
                  },
                  series: [{
                      data: [120, 200, 150, 80, 70, 110, 130],
                      type: 'bar'
                  }]
              };
	}

	function funnelChartOptions() {
	  return {
                 title: {
                     text: '???',
                     subtext: '????'
                 },
                 tooltip: {
                     trigger: 'item',
                     formatter: "{a} <br/>{b} : {c}%"
                 },
                 toolbox: {
                     feature: {
                         dataView: {readOnly: false},
                         restore: {},
                         saveAsImage: {}
                     }
                 },
                 legend: {
                     data: ['??','??','??','??','??']
                 },
                 calculable: true,
                 series: [
                     {
                         name:'???',
                         type:'funnel',
                         left: '10%',
                         top: 60,
                         //x2: 80,
                         bottom: 60,
                         width: '80%',
                         // height: {totalHeight} - y - y2,
                         min: 0,
                         max: 100,
                         minSize: '0%',
                         maxSize: '100%',
                         sort: 'descending',
                         gap: 2,
                         label: {
                             show: true,
                             position: 'inside'
                         },
                         labelLine: {
                             length: 10,
                             lineStyle: {
                                 width: 1,
                                 type: 'solid'
                             }
                         },
                         itemStyle: {
                             borderColor: '#fff',
                             borderWidth: 1
                         },
                         emphasis: {
                             label: {
                                 fontSize: 20
                             }
                         },
                         data: [
                             {value: 60, name: '??'},
                             {value: 40, name: '??'},
                             {value: 20, name: '??'},
                             {value: 80, name: '??'},
                             {value: 100, name: '??'}
                         ]
                     }
                 ]
             };
	}

	function areaChartOptions() {
    	  return  {
                  xAxis: {
                      type: 'category',
                      boundaryGap: false,
                      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                  },
                  yAxis: {
                      type: 'value'
                  },
                  series: [{
                      data: [820, 932, 901, 934, 1290, 1330, 1320],
                      type: 'line',
                      areaStyle: {}
                  }]
              };
    	}

    	function pieChartOptions() {
          return  {
                               title: {
                                   text: 'Agent Status',
                                   subtext: 'Status Over Time',
                                   x: 'center'
                               },
                               tooltip: {
                                   trigger: 'item',
                                   formatter: "{a} <br/>{b} : {c} ({d}%)"
                               },
                               legend: {
                                   orient: 'vertical',
                                   left: 'left',
                                   data: ['Available', 'Active', 'Busy', 'Away', 'Offline']
                               },
                               series: [
                                   {
                                       name: 'Agent Status',
                                       type: 'pie',
                                       radius: '55%',
                                       center: ['50%', '60%'],
                                       data: [
                                           {value: 335, name: 'Available'},
                                           {value: 310, name: 'Active'},
                                           {value: 234, name: 'Busy'},
                                           {value: 135, name: 'Away'},
                                           {value: 1548, name: 'Offline'}
                                       ],
                                       itemStyle: {
                                           emphasis: {
                                               shadowBlur: 10,
                                               shadowOffsetX: 0,
                                               shadowColor: 'rgba(0, 0, 0, 0.5)'
                                           }
                                       }
                                   }
                               ]
                           };
                 }

     function barChartRotatedOptions() {
              return  {
                          dataset: {
                              source: [
                                  ['score', 'amount', 'product'],
                                  [89.3, 58212, 'Matcha Latte'],
                                  [57.1, 78254, 'Milk Tea'],
                                  [74.4, 41032, 'Cheese Cocoa'],
                                  [50.1, 12755, 'Cheese Brownie'],
                                  [89.7, 20145, 'Matcha Cocoa'],
                                  [68.1, 79146, 'Tea'],
                                  [19.6, 91852, 'Orange Juice'],
                                  [10.6, 101852, 'Lemon Juice'],
                                  [32.7, 20112, 'Walnut Brownie']
                              ]
                          },
                          grid: {containLabel: true},
                          xAxis: {name: 'amount'},
                          yAxis: {type: 'category'},
                          visualMap: {
                              orient: 'horizontal',
                              left: 'center',
                              min: 10,
                              max: 100,
                              text: ['High Score', 'Low Score'],
                              // Map the score column to color
                              dimension: 0,
                              inRange: {
                                  color: ['#D7DA8B', '#E15457']
                              }
                          },
                          series: [
                              {
                                  type: 'bar',
                                  encode: {
                                      // Map the "amount" column to X axis.
                                      x: 'amount',
                                      // Map the "product" column to Y axis
                                      y: 'product'
                                  }
                              }
                          ]
                      };
            }

            function lineChartOptions() {
              return  {
                          xAxis: {
                              type: 'category',
                              data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                          },
                          yAxis: {
                              type: 'value'
                          },
                          series: [{
                              data: [820, 932, 901, 934, 1290, 1330, 1320],
                              type: 'line'
                          }]
                      };
              }
});
