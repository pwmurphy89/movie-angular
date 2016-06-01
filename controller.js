var myApp = angular.module('myApp',[]);

myApp.controller("myController", function($scope, $http){
	var baseURL = "https://api.themoviedb.org/3/";
	var apiKey = "?api_key=29a7409539eac140137d9aa6c20ab279";
	var searchQuery;

	var runQuery = function(searchQuery){
		$http ({
	  		method: 'GET',
	 		url: baseURL + searchQuery + apiKey
		}).then(function successCallback(response) {
			var movieData = response.data.results;
			var data = [];
			for (var i = 0; i < movieData.length; i++){
				data.push({name: movieData[i].title,
							path: movieData[i].poster_path})
			}
			$scope.data = data;
		}, function errorCallback(response) {
	  		console.log("ERROR");
	  	});
	}

	runQuery("movie/now_playing");

	$scope.topRated = function(){
		runQuery("movie/top_rated");
	};
	$scope.upcoming = function(){
		runQuery("movie/upcoming");
	};
	$scope.nowPlaying = function(){
		runQuery("movie/now_playing");
	};
	$scope.popular = function(){
		runQuery("movie/popular");
	};

	$scope.search = function(){

		var searchTerm = "search/" + $scope.selectedItem;
		var searchURL = baseURL + searchTerm + apiKey + "&query=" + $scope.searchType;
		console.log(searchURL);
		$http ({
	  		method: 'GET',
	 		url: searchURL
		}).then(function successCallback(response) {
			if($scope.selectedItem == 'person'){
				var personData = response.data.results;
				var data = [];
				for (var i = 0; i < personData.length; i++){
					data.push({name: personData[i].name,
								path: personData[i].profile_path})
				}
				$scope.data = data;
			}else{
				var movieData = response.data.results;
				var data = [];
				for (var i = 0; i < movieData.length; i++){
					data.push({name: movieData[i].title,
								path: movieData[i].poster_path})
				}
				$scope.data = data;
			}
		}, function errorCallback(response) {
	  		console.log("ERROR");
	  	});
	}
});