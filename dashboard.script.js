angular.module('app')

.controller('DashboardCtrl', ['$scope', '$timeout', 'DataService', '$http', '$interval',
	function($scope, $timeout,DataService, $http, $interval) {
	    $scope.widgetOptions =[];
        $scope.widgetData =[];
        $scope.widgetJsonData = [];
        $scope.selectWidget = "";
        /*var stop;

          stop = $interval(function() {
                $http({
           			  method: 'GET',
           			  url: 'https://dashboard.slate-platform.com/api/public/dashing/widgets'
           			}).then(function successCallback(response) {
           				console.log(response);
           				for(var i=0; i<response.data.data.length; i++){
           					var options;
           					var widgetName = response.data.data[i].name;
           					var chart = response.data.data[i].chart;
           						var options = DataService[chart].options();
           						var colArr = new Array();
           						var valArr = new Array();
           						$http({
           						  method: 'GET',
           						  url: response.data.data[i].api
           						}).then(function successCallback(response) {
           							console.log(response);

           							for(var name in response.data.data){
           								colArr.push(name);
           								valArr.push(response.data.data[name]);
           							}
           							options.xAxis.data = colArr;
           							options.series[0].data = valArr;
                              $scope.widgetOptions = options;

           						  }, function errorCallback(response) {
           							console.log("error");
           						  });

           				}
           			  }, function errorCallback(response) {

           			  });
          }, 5000);
*/
		$scope.gridsterOptions = {
			margins: [20, 20],
			columns: 9,
			draggable: {
			    enabled: true,
				handle: 'h3'
			},
			resizable: {
               enabled: true,
               handles: ['n', 'e', 's', 'w', 'ne', 'se', 'sw', 'nw'],
               start: function(event, $element, widget) {}, // optional callback fired when resize is started,
               resize: function(event, $element, widget) {
               var dom = document.getElementById(widget.domId);
               var chart = echarts.getInstanceByDom(dom);
               chart.resize({
                // height:$(dom).parent().height()
               });
                    console.log(widget);
               }, // optional callback fired when item is resized,
               stop: function(event, $element, widget) {} // optional callback fired when item is finished resizing
            },
		};

		$scope.dashboards = {
			'1': {
				id: '1',
				name: 'Home',
				widgets: []
			},
			'2': {
				id: '2',
				name: 'Other',
				widgets: [{
					col: 1,
					row: 1,
					sizeY: 1,
					sizeX: 2,
					name: "Other Widget 1"
				}, {
					col: 1,
					row: 3,
					sizeY: 1,
					sizeX: 1,
					name: "Other Widget 2"
				}]
			}
		};


		$http({
			  method: 'GET',
			  url: 'https://dashboard.slate-platform.com/api/public/dashing/widgets'
			}).then(function successCallback(response) {
				for(let i=0; i<response.data.data.length; i++){
					let options;
					let widgetName = response.data.data[i].name;
					let chart = response.data.data[i].chart;
					$scope.widgetData.push(chart);
					$scope.widgetJsonData.push(response.data.data[i]);
						options = DataService[chart].options();
						let colArr = new Array();
						let valArr = new Array();
						if(response.data.data[i].table_name != ""){
						    let newData = {};
						    newData["tableName"] = response.data.data[i].table_name;
						    newData["aggFunction"] = response.data.data[i].aggfunction;
						    newData["aggColumn"] = response.data.data[i].aggcolumn;
						    newData["groupColumn"] = response.data.data[i].groupcolumn;

                           $http.post(response.data.data[i].api, newData).then(function (response) {
                           // This function handles success
                                console.log(response);

                           }, function (response) {

                           // this function handles error

                           });
						} else{
								$http({
                                  method: 'GET',
                                  url: response.data.data[i].api
                                }).then(function successCallback(response) {
                                    console.log(response);

                                    for(var name in response.data.data){
                                        if(options.series[0].type == 'line'){
                                            colArr.push(response.data.data[name].agentName);
                                            valArr.push(name);
                                        } else{
                                            colArr.push(name);
                                            valArr.push(response.data.data[name]);
                                        }

                                    }
                                    options.xAxis.data = colArr;
                                    options.series[0].data = valArr;

                                    $scope.dashboards["1"].widgets.push({
                                    col: i,
                                    row: 0,
                                    sizeY: 3,
                                    sizeX: 3,
                                    name: widgetName,
                                    chart: {
                                      options: options,
                                      api: {}
                                    }
                                });

                                  }, function errorCallback(response) {
                                    console.log("error");
                                  });
						}


				}
				$scope.widgets = $scope.widgetData;

			  }, function errorCallback(response) {

			  });
 $scope.widgetChange = function() {
      $scope.selectWidget =  $scope.selectedWidget;

        };
		$scope.clear = function() {
			$scope.dashboard.widgets = [];
		};

		$scope.addWidget = function() {
		 var widgetName = $scope.selectWidget;
		// 	var options = DataService[widgetName].options();
            var colArr = new Array();
			var valArr = new Array();

			$http({
            			  method: 'GET',
            			  url: 'https://dashboard.slate-platform.com/api/public/dashing/widgets'
            			}).then(function successCallback(response) {
            				console.log(response);
            				for(var i=0; i<response.data.data.length; i++){
            					var options;
            					var widgetName = response.data.data[i].name;
            					var chart = response.data.data[i].chart;
            						var options = DataService[chart].options();
            						var colArr = new Array();
            						var valArr = new Array();
            						$http({
            						  method: 'GET',
            						  url: response.data.data[i].api
            						}).then(function successCallback(response) {
            							console.log(response);

            							for(var name in response.data.data){
            								colArr.push(name);
            								valArr.push(response.data.data[name]);
            							}
            							options.xAxis.data = colArr;
            							options.series[0].data = valArr;
            							    $scope.dashboard.widgets.push({
                                                         col: 0,
                                                        row: 0,
                                                        sizeY: 3,
                                                        sizeX: 3,
                                                        name: widgetName,
                                                        chart: {
                                                          options: options,
                                                          api: {}
                                                        }

                                        			});

            						  }, function errorCallback(response) {
            							console.log("error");
            						  });

            				}
            			  }, function errorCallback(response) {

            			  });
		};

$scope.renderWidget = function($index,widget){
	  // wait for dom render
	  setTimeout(function(){
	      widget.domId = 'widget-container-'+$index;
	      widget.id = $index;
		  var myChart = echarts.init(document.getElementById(widget.domId));

        // specify chart configuration item and data

        // use configuration item and data specified to show chart
		try{
			myChart.setOption(widget.chart.options);
           /* if($scope.widgetOptions){
                myChart.setOption($scope.widgetOptions);
            } else{
                    myChart.setOption(widget.chart.options);
            }*/
		}catch(ex){

		}
	  },200);
  }
		$scope.$watch('selectedDashboardId', function(newVal, oldVal) {
			if (newVal !== oldVal) {
				$scope.dashboard = $scope.dashboards[newVal];
			} else {
				$scope.dashboard = $scope.dashboards[1];
			}
		});

		// init dashboard
		$scope.selectedDashboardId = '1';

	}
])

.controller('CustomWidgetCtrl', ['$scope', '$modal',
	function($scope, $modal) {

		$scope.remove = function(widget) {
			$scope.dashboard.widgets.splice($scope.dashboard.widgets.indexOf(widget), 1);
		};

		$scope.openSettings = function(widget) {
			$modal.open({
				scope: $scope,
				templateUrl: 'widget_settings.html',
				controller: 'WidgetSettingsCtrl',
				resolve: {
					widget: function() {
						return widget;
					}
				}
			});
		};

	}
])

.controller('WidgetSettingsCtrl', ['$scope', '$timeout', '$rootScope', '$modalInstance', 'widget',
	function($scope, $timeout, $rootScope, $modalInstance, widget) {
		$scope.widget = widget;

		$scope.form = {
			name: widget.name,
			sizeX: widget.sizeX,
			sizeY: widget.sizeY,
			col: widget.col,
			row: widget.row
		};

		$scope.sizeOptions = [{
			id: '1',
			name: '1'
		}, {
			id: '2',
			name: '2'
		}, {
			id: '3',
			name: '3'
		}, {
			id: '4',
			name: '4'
		}];

		$scope.dismiss = function() {
			$modalInstance.dismiss();
		};

		$scope.remove = function() {
			$scope.dashboard.widgets.splice($scope.dashboard.widgets.indexOf(widget), 1);
			$modalInstance.close();
		};

		$scope.submit = function() {
			angular.extend(widget, $scope.form);

			$modalInstance.close(widget);
		};

	}
])

// helper code
.filter('object2Array', function() {
	return function(input) {
		var out = [];
		for (i in input) {
			out.push(input[i]);
		}
		return out;
	}
});
