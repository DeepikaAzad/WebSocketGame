let angularApp = angular.module('homeApp', ['ngRoute']);

angularApp.config(function ($routeProvider) {
      $routeProvider
            .when('/', {
                  templateUrl: 'index.html',
                  controller: 'MyController'
            })
            .otherwise({
                  redirectTo: '/'
            })
});

function MyController($scope, $interval) {
      // Create WebSocket connection.
      const socket = new WebSocket('ws://localhost:3000');

      // Connection opened
      socket.addEventListener('open', function (event) {
            console.log('Connected to websocket')
      });

      // Listen for messages
      socket.addEventListener('message', function (event) {
            console.log('Message from server ', event.data);
            document.getElementById("randomValue").innerHTML = event.data;
            $scope.randomValue = event.data;
      });

      let count = 0
      let unattemptCount = 0;
      $scope.score = 0;
      $scope.disableBtn = $scope.win = false;
      const intervalTime = 6000;
      const timerCount = document.getElementById('timer');
      const showUnattemptedCount = document.getElementById("unattemptCount")
      let timerId, timeLeft;

      // Below method send random string and chek if unattemted value and not matched value
      $scope.startPlay = () => {
            timeLeft = intervalTime / 1000 - 1;
            timerId = $interval(countdown, 1000);
            document.getElementById("randomValue").innerHTML = '';
            $scope.disableBtn = false;
            unattemptCount = 0;
            $scope.userInput = '';
            $scope.score = 0
            $scope.interval = $interval(matchUserInput, intervalTime);
      }

      // Check if given string not matched
      const matchUserInput = () => {
            count++;
            $scope.calculateUnattemptCount();
            socket.send(count);
            if($scope.userInput.length != 0) {
                  $scope.calculateScore($scope.userInput)
                  $scope.userInput = '';
            }
      }

      // Calculate score
      $scope.calculateScore = function (val) {
            if (val == $scope.randomValue) {
                  console.log('true');
                  $scope.score++;
            } else if (val != $scope.randomValue) {
                  console.log('false');
                  $scope.score--;
            }
            $scope.endGame();
      }

      // Calculate continuous 3 attempt missed.
      $scope.calculateUnattemptCount = () => {
            if ($scope.userInput.length == 0) {
                  unattemptCount++;
                  showUnattemptedCount.innerHTML = 3 - unattemptCount;
                  if (unattemptCount == 3) {
                        console.log("Unattempt count " + unattemptCount);
                        $scope.endGame();
                  }
            } else {
                  unattemptCount = 0;
            }
      }

      // Show count down of X timer
      const countdown = () => {
            if (timeLeft == -1) {
                  $interval.cancel(timerId);
            } else {
                  timerCount.innerHTML = timeLeft + ' seconds remaining';
                  timeLeft--;
            }
      }

      /**
       * Game end on following conditions:
       * Case 1: 3 continuous attempt missed.
       * Case 2: Failed on -3 points.
       * Case 3: Win on 10 points. 
       */
      $scope.endGame = () => {
            if (unattemptCount >= 3 || $scope.score >= 10 || $scope.score <= -3) {
                  $scope.disableBtn = true;
                  $scope.win = $scope.score >= 10 ? true : false;
                  $interval.cancel($scope.interval);
                  $interval.cancel(timerId);
            }
      }
}

angularApp.controller('MyController', MyController);