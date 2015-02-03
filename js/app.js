var ticTacToe = angular.module('ticTacToeApp', [
    'ui.router'
  ])

.controller('MainCtrl', function($scope) {
  // gives the human player the first turn
	var playerTurn = true;
  // var move = 1;
  // initializes a tic-tac-toe board
  var board = [[0,0,0],
               [0,0,0],
               [0,0,0]];

	var computerMove = function(event) {
    if (moveNum === 1) {
      if ($(event.target).hasClass('center')) {
        $('#topLeft').text('O');
      }
    }
	}
  var bestComputerMove = function() {

  }
  var computerWins = function() {
    // if ()
  }
  var humanWins = function() {

  }
  $scope.playerMove = function(event) {
    if (playerTurn && !$(event.target).hasClass('picked')) {
      // console.log(angular.element(event.srcElement));
      console.log($(event.target).hasClass('edge'));
      $(event.target).text('X');
      // denotes a square as already being chosen
      $(event.target).addClass('picked')
      console.log($(event.target).text());
      playerTurn = false;
      computerMove(event);
      move++;
      playerTurn = true;
    }
  }
})

.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'views/home.html',
      controller: 'MainCtrl'
    })
})
