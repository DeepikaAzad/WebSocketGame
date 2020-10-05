# Websocket Game Demo
 
System Requirements: Node 6.x+
  
To run the project:
1. npm install
2. By default, the application is launched 3000 port.
3. Run command `node index`. 
4. Go to Browser and hit http://localhost:3000/

Features:
1. Server provide instruction to user to enter same instruction within 5 seconds.
2. User will get 1 point on match, -1 on not match and 0 on timeout.
3. The game is over when the score reaches either +10 points or -3 points.
4. The game is also over if the client does not respond for 3 continuous instructions.
5. **User can not copy and paste the given instruction.**
6. The client will also know the timeout value for each instruction received.
7. Updated score would be shown on screen.
 
Technology:
* Express
* Websocket
* Angular 1.4 - I am not well-versed with Angular2.
 
Known Issues:
* Implemented very basic frontend.
 
Please feel free to contact me with any queries.
 
Deepika Azad
azaddeepika05@gmail.com


