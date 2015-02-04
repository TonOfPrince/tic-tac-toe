var ticTacToe = angular.module('ticTacToeApp', [
    'ui.router'
  ])

.controller('MainCtrl', function($scope) {
  // gives the human player the first turn
	var playerTurn = true;
  // var move = 1;
  // initializes a tic-tac-toe board
  var board = [
    [0,0,0],
    [0,0,0],
    [0,0,0]
  ];

  // map board decision to display
  var mappingObject = {
    '0,0' : '#topLeft',
    '0,1' : '#topMiddle',
    '0,2' : '#topRight',
    '1,0' : '#middleLeft',
    '1,1' : '#middleMiddle',
    '1,2' : '#middleRight',
    '2,0' : '#bottomLeft',
    '2,1' : '#bottomMiddle',
    '2,2' : '#bottomRight'
  }

  var mappingRow = {
    'topLeft' : 0,
    'topMiddle' : 0,
    'topRight' : 0,
    'middleLeft' : 1,
    'middleMiddle' : 1,
    'middleRight' : 1,
    'bottomLeft' : 2,
    'bottomMiddle' : 2,
    'bottomRight' : 2
  }

  var mappingColumn = {
    'topLeft' : 0,
    'topMiddle' : 1,
    'topRight' : 2,
    'middleLeft' : 0,
    'middleMiddle' : 1,
    'middleRight' : 2,
    'bottomLeft' : 0,
    'bottomMiddle' : 1,
    'bottomRight' : 2
  }

  // determines if the human player has won
  var humanWins = function() {
    // human player wins by having all three spaces in the top row
    if (board[0][0] === 1 && board[0][1] === 1 && board[0][2] === 1) {
      return true;
    }
    // human player wins by having all three spaces in the middle row
    if (board[1][0] === 1 && board[1][1] === 1 && board[1][2] === 1) {
      return true;
    }
    // human player wins by having all three spaces in the bottom row
    if (board[2][0] === 1 && board[2][1] === 1 && board[2][2] === 1) {
      return true;
    }
    // human player wins by having all three spaces in the left column
    if (board[0][0] === 1 && board[1][0] === 1 && board[2][0] === 1) {
      return true;
    }
    // human player wins by having all three spaces in the middle column
    if (board[0][1] === 1 && board[1][1] === 1 && board[2][1] === 1) {
      return true;
    }
    // human player wins by having all three spaces in the right column
    if (board[0][2] === 1 && board[1][2] === 1 && board[2][2] === 1) {
      return true;
    }
    // human player wins by having all three spaces in the diagonal from top left to bottom right
    if (board[0][0] === 1 && board[1][1] === 1 && board[2][2] === 1) {
      return true;
    }
    // human player wins by having all three spaces in the diagonal from top right to bottom left
    if (board[0][2] === 1 && board[1][1] === 1 && board[2][0] === 1) {
      return true;
    }
    // otherwise human player has not won
    return false;
  }

  // determines if the computer player has won
  var computerWins = function() {
    // computer player wins by having all three spaces in top
    if (board[0][0] === 2 && board[0][1] === 2 && board[0][2] === 2) {
      return true;
    }
    // computer player wins by having all three spaces in middle
    if (board[1][0] === 2 && board[1][1] === 2 && board[1][2] === 2) {
      return true;
    }
    // computer player wins by having all three spaces in bottom
    if (board[2][0] === 2 && board[2][1] === 2 && board[2][2] === 2) {
      return true;
    }
    // computer player wins by having all three spaces in left column
    if (board[0][0] === 2 && board[1][0] === 2 && board[2][0] === 2) {
      return true;
    }
    // computer player wins by having all three spaces in middle column
    if (board[0][1] === 2 && board[1][1] === 2 && board[2][1] === 2) {
      return true;
    }
    // computer player wins by having all three spaces in right column
    if (board[0][2] === 2 && board[1][2] === 2 && board[2][2] === 2) {
      return true;
    }
    // computer player wins by having all three spaces in diagonal from top left to bottom right
    if (board[0][0] === 2 && board[1][1] === 2 && board[2][2] === 2) {
      return true;
    }
    // computer player wins by having all three spaces in diagonal from top right to bottom left
    if (board[0][2] === 2 && board[1][1] === 2 && board[2][0] === 2) {
      return true;
    }
    // otherwise computer player has not won
    return false;
  }

  // checks to see if every spot on the board is taken
  var fullBoard = function() {
    if (board[0,0] === 1 || board[0,0] === 2 &&
        board[0,1] === 1 || board[0,1] === 2 &&
        board[0,2] === 1 || board[0,2] === 2 &&
        board[1,0] === 1 || board[1,0] === 2 &&
        board[1,1] === 1 || board[1,1] === 2 &&
        board[1,2] === 1 || board[1,2] === 2 &&
        board[2,0] === 1 || board[2,0] === 2 &&
        board[2,1] === 1 || board[2,1] === 2 &&
        board[2,2] === 1 || board[2,1] === 2) {
      return true;
    }
    return false;
  }

  // determines if the game is over
  var gameOver = function() {
    // game is over if either the computer or human wins or the board is full
    if (computerWins() || humanWins() || fullBoard()) {
      return true;
    }
    // otherwise game is not over
    return false;
  }

  // toggles the human player's marking on the space given by row and index
  var humanSpaceToggle = function(row, index) {
    if (board[row][index] === 0) {
      board[row][index] = 1;
    } else if (board[row][index] === 1) {
      board[row][index] = 0;
    }
  }

  // toggles the computer player's marking on the space given by row and index
  var computerSpaceToggle = function(row, index) {
    if (board[row][index] === 0) {
      board[row][index] = 2;
    } else if (board[row][index] === 2) {
      board[row][index] = 0;
    }
  }

  // runs a simulation of every human players next move
  var humanPlayerSimulator = function(row, column) {
    var points = 0;
    for (var i = 0; i < board[0].length; i++) {
      for (var j= 0; j < board.length; j++) {
        if (board[i][j] === 0 && !gameOver()) {
          humanSpaceToggle(i,j);
          if (humanWins()) {
            points -= 1;
          } else if (computerWins()) {
            points += 1;
          } else if (fullBoard()) {
            console.log('full board');
          } else {
            points += computerPlayerSimulator(i,j);
          }
          humanSpaceToggle(i,j);
        }
      }
    }
    return points;
  }

  // runs a simulation of every possible next computer player move
  var computerPlayerSimulator = function(row, column) {
    var points = 0;
    for (var i = 0; i < board[0].length; i++) {
      for (var j= 0; j < board.length; j++) {
        if (board[i][j] === 0 && !gameOver()) {
          computerSpaceToggle(i,j);
          if (humanWins()) {
            points -= 1;
          } else if (computerWins()) {
            points += 1;
          } else if (fullBoard()) {
            console.log('full board')
          } else {
            points+= humanPlayerSimulator(i,j);
          }
          computerSpaceToggle(i,j);
        }
      }
    }
    return points;
  }

  // decides where to put the next piece based off of best outcome of simulation
  var decisionSimultaion = function() {
    var max = Number.NEGATIVE_INFINITY;
    var row = 0;
    var column = 0;
    var simulationResult = max;
    for (var i = 0; i < board[0].length; i++) {
      for (var j= 0; j < board.length; j++) {
        if (board[i][j] === 0 && !gameOver()) {
          computerSpaceToggle(i,j)
          var simulationResult = humanPlayerSimulator(i,j);
          computerSpaceToggle(i,j)
          // console.log(simulationResult);
          if (simulationResult > max) {
            max = simulationResult;
            row = i;
            column = j;
          }
        }
      }
    }
    computerSpaceToggle(row, column);
    $(mappingObject[row +','+column]).text('O');
    $(mappingObject[row +','+column]).addClass('picked');

  }

	// var computerMove = function(event) {
 //    if ($(event.target).hasClass('center')) {
 //      $('#topLeft').text('O');
 //    }
	// }

  $scope.playerMove = function(event) {
    if (playerTurn && !$(event.target).hasClass('picked')) {
      // console.log(angular.element(event.srcElement));
      // console.log($(event.target).hasClass('edge'));
      console.log($(event.target).context.id);
      board[mappingRow[$(event.target).context.id]][mappingColumn[$(event.target).context.id]];
      $(event.target).text('X');
      // denotes a square as already being chosen
      $(event.target).addClass('picked');
      console.log($(event.target).text());
      playerTurn = false;
      // computerMove(event);
      decisionSimultaion();
      playerTurn = true;
    }
  }
})
.factory()
.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'views/home.html',
      controller: 'MainCtrl'
    })
})
