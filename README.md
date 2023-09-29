# Scrimba Snake Game
This game was part of what is now a deprecated lesson in the web development/javascript course

## Basics
The game is an HTML/CSS/Javascript project
- Player uses arrow keys to change the snake's direction
- Snake tries to eat apples for score.  
- With each apple the snake grows longer and moves faster

## Internal game design
The game maintains an internal grid driven by the javascript "width" constant. The total grid has "width squared" positions, represented in an array.
A 2nd array represents the size and location of the snake.
Visually, each square in the grid is 20x20 px.  Therefore the dimensions of the actual game grid, controlled by the .grid style require lenght and width to be 20 x "width" constant.  The game is coded to use width = 20, so the style requires a 20px per block (times javascript width. This is why the css .grid style has a length and width of 400. Any changes to the js width would require a corresponding alteration to the css style.
This could have been made variable with javascript, but I chose to simply hard code these values in the index.js and index.css.

The game loop is based on javascript timer that starts with an interval of 850ms. It calls the move() function each time.  Move evaluates the direction and location of the snake head within the grid, and moves it in the same direction, determining if the snake has hit walls or its own body.

With each keystroke, the direction of the snake is changed, and this will be evaluated and updated at the next interval.


## Additions
- Used a google "Game" font to make the UI more reflective of a game
- Various configuration variables allowed for the grid to be easily widened/shrunk.  The original grid was 10x10, but I decided to double it to 20x20.
- I used fontawesome fonts for the apple and snake body
- The primary non-visual enhancement to the base game, is the implementation of the snake's body segments. Each body segment has its movement represented visually by a directional arrow, so the player has a clear idea of where the snake is going and where each segment of the body is moving.

## Notes
- When I created this game I was on a "code js with no semicolons" kick, but I decided subsequently that is anti-pattern, and semi-colons should always be used.

## Demo
[Netlify Hosted](https://effortless-narwhal-5156fc.netlify.app/)