var myNinjaApp = angular.module('myNinjaApp',['ngRoute','ngAnimate']);
myNinjaApp.config(['$routeProvider',function($routeProvider){
  $routeProvider
  .when('/home',{
    templateUrl:'views/home.html',
    controller:'NinjaController'
  })
  .when('/directory',{
    templateUrl:'views/directory.html',
    controller:'NinjaController'
  })
  .when('/update',{
    templateUrl:'views/update.html',
    controller:'NinjaController'
  })
  .otherwise({
    redirectTo:'/home'
  });
}]);
myNinjaApp.directive('randomNinja',[function(){
  return {
    restrict: 'E',
    scope:{
      ninjas: '=',
      title:'='
    },
    templateUrl:'views/random.html',
    transclude: true,
    replace:true,
    controller:function($scope){
      $scope.random = Math.floor(Math.random()*4)
    }
  };
}])
myNinjaApp.controller('NinjaController',['$scope','$http',function($scope,$http){


  $scope.removeNinja=function(ninja){
    var removedNinja  = $scope.ninjas.indexOf(ninja)
    $scope.ninjas.splice(removedNinja,1)
  };
  $scope.addNinja = function(){
    $scope.ninjas.push({
      name:$scope.newninja.name,
      belt:$scope.newninja.belt,
      rate: parseInt($scope.newninja.rate),
      available:true
    });
    $scope.newninja.name = "";
    $scope.newninja.belt="";
    $scope.newninja.rate="";
  };
  $scope.updateNinja = function(){
    for(var i = 0;i<$scope.ninjas.length;i++){
      if($scope.ninjas[i].name == $scope.oldName){
        $scope.ninjas[i].name = $scope.newName;
        break;
      }
    }
    var onSuccess = function (data, status, headers, config) {
      $scope.data = data;
  };

  var onError = function (data, status, headers, config) {
      $scope.error = status;
  }

  $http.post('data/ninjas.json', $scope.ninjas)
       .success(onSuccess)
       .error(onError);
    $scope.oldName = "";
    $scope.newName = "";
  }; 
  $http.get('data/ninjas.json').success(function(data){
    $scope.ninjas=data
  })
}]);