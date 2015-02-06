/* Unbeatable Tic-Tac-Toe Module */

var ticTacToe = angular.module('ticTacToeApp', [
    'ui.router'
  ])

/* Unbeatable Tic-Tac-Toe Controller */

.controller('MainCtrl', function($scope, MainFactory) {

  // extends factory returned functions to the scope
  angular.extend($scope, MainFactory);

  // resets board every time the page is entered
  $scope.resetBoard();
})

/* Unbeatable Tic-Tac-Toe Factory */

.factory('MainFactory', function() {

  /* Initializing Variables */

  // gives the human player the first turn
  var playerTurn = true;

  // initializes a tic-tac-toe board
  var board = [
    [0,0,0],
    [0,0,0],
    [0,0,0]
  ];

  /* Mapping Objects */

  // map board's squares to display
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

  // map square's id to appropriate row
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

  // map square's id to appropriate column
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

  /* Functions Determining End Game */

  // determines if the human player (player === 1) has won
  // or if the computer player (player === 2) has won
  var playerWins = function(player) {
        // player wins by having all three spaces in the top row
    if ((board[0][0] === player && board[0][1] === player && board[0][2] === player) ||
        // player wins by having all three spaces in the middle row
        (board[1][0] === player && board[1][1] === player && board[1][2] === player) ||
        // player wins by having all three spaces in the bottom row
        (board[2][0] === player && board[2][1] === player && board[2][2] === player) ||
        // player wins by having all three spaces in the left column
        (board[0][0] === player && board[1][0] === player && board[2][0] === player) ||
        // player wins by having all three spaces in the middle column
        (board[0][1] === player && board[1][1] === player && board[2][1] === player) ||
        // player wins by having all three spaces in the right column
        (board[0][2] === player && board[1][2] === player && board[2][2] === player) ||
        // player wins by having all three spaces in the diagonal from top left to bottom right
        (board[0][0] === player && board[1][1] === player && board[2][2] === player) ||
        // player wins by having all three spaces in the diagonal from top right to bottom left
        (board[0][2] === player && board[1][1] === player && board[2][0] === player)) {
      return true;
    }
    // otherwise human player has not won
    return false;
  }

  // checks to see if every spot on the board is taken
  var fullBoard = function() {
    if (board[0][0] !== 0 &&
        board[0][1] !== 0 &&
        board[0][2] !== 0 &&
        board[1][0] !== 0 &&
        board[1][1] !== 0 &&
        board[1][2] !== 0 &&
        board[2][0] !== 0 &&
        board[2][1] !== 0 &&
        board[2][2] !== 0) {
      return true;
    }
    return false;
  }

  // determines if the game is over
  var gameOver = function() {
    // game is over if either the computer or human wins or the board is full
    if (playerWins(2) || playerWins(1) || fullBoard()) {
      return true;
    }
    // otherwise game is not over
    return false;
  }

  /* Toggling Marker Functions */

  // toggles the human (player === 1) or computer (player === 2) player's marking on the space given by row and index
  var playerSpaceToggle = function(row, index, player) {
    if (board[row][index] === 0) {
      board[row][index] = player;
    } else if (board[row][index] === player) {
      board[row][index] = 0;
    }
  }

  /* Simulator Functions */

  // runs a simulation of every possible next human players move
  var humanPlayerSimulator = function() {
    var min = Number.POSITIVE_INFINITY;
    for (var i = 0; i < board[0].length; i++) {
      for (var j = 0; j < board.length; j++) {
        if (board[i][j] === 0 && !gameOver()) {
          playerSpaceToggle(i,j,1);
          if (playerWins(1)) {
            min = Number.NEGATIVE_INFINITY;
          } else if (!fullBoard()) {
            var humanTester = computerPlayerSimulator();
            if (humanTester < min) {
              min = humanTester;
            }
          }
          playerSpaceToggle(i,j,1);
        }
      }
    }
    return min;
  }

  // runs a simulation of every possible next computer player move
  var computerPlayerSimulator = function() {
    var max = Number.NEGATIVE_INFINITY;
    for (var i = 0; i < board[0].length; i++) {
      for (var j = 0; j < board.length; j++) {
        if (board[i][j] === 0 && !gameOver()) {
          playerSpaceToggle(i,j,2);
          if (playerWins(2)) {
            max = Number.POSITIVE_INFINITY;
          } else if (!fullBoard()) {
            var computerTester = humanPlayerSimulator();
            if (computerTester > max) {
              max = computerTester;
            }
          }
        playerSpaceToggle(i,j,2);
        }
      }
    }
    return max;
  }

  // simulation for computer to decide which space to choose
  var decisionSimultaion = function() {
    if (!gameOver()) {
      var row = -1;
      var column = -1;
      // calculates optimal move
      var max = Number.NEGATIVE_INFINITY;
      for (var i = 0; i < board[0].length; i++) {
        for (var j = 0; j < board.length; j++) {
          if (board[i][j] === 0 && !gameOver()) {
            playerSpaceToggle(i,j,2);
            if (playerWins(2)) {
              max = Number.POSITIVE_INFINITY;
              row = i;
              column = j;
            } else if (!fullBoard()) {
              var decisionTester = humanPlayerSimulator();
              if (decisionTester > max) {
                max = decisionTester;
                row = i;
                column = j;
              }
            }
          playerSpaceToggle(i,j,2);
          }
        }
      }
      // adds marker to display and updates board
      playerSpaceToggle(row, column, 2);
      $(mappingObject[row +','+column]).children().text('O');
      $(mappingObject[row +','+column]).addClass('picked');
    }
  }

  /* Functions Called From HTML */

  // action for human player making a move
  var playerMove = function(event) {
    // player's marker is put if game is on-going, spaces are available, and it's the player's turn
    if (playerTurn && !$(event.target).hasClass('picked') && !gameOver()) {
      playerTurn = false;
      board[mappingRow[$(event.target).context.id]][mappingColumn[$(event.target).context.id]] = 1;
      $(event.target).children().text('X');
      $(event.target).addClass('picked');
      // computer's marker is determined and placed
      decisionSimultaion();
      playerTurn = true;
    }
  }

  // clears the board for a new game
  var resetBoard = function() {
    $('i').text('');
    for (var i = 0; i < board[0].length; i++) {
      for (var j= 0; j < board.length; j++) {
        $(mappingObject[i +','+j]).removeClass('picked');
        board[i][j] = 0;
      }
    }
  }

  // checks to see if there is a tie
  var tie = function () {
    return fullBoard() && !playerWins(2);
  }

  /* Factory Return */

  return {
    playerWins: playerWins,
    playerMove: playerMove,
    resetBoard: resetBoard,
    tie: tie
  }
})

/* Angular SPA Routing */

.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'views/home.html',
      controller: 'MainCtrl'
    })
    .state('docs', {
      url: '/docs',
      templateUrl: 'docs/js/app.js.html'
    })
})
