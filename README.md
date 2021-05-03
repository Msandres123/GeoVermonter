# Geo Vermonter

<https://geoguessr.com/> is a game built using Google Maps

In this project we will build our own version of the game using locations inside Vermont.

First, clone the starter project from the github classroom link

`cd` into the repo directory you just cloned down and then run `npm install`

# Tech:

* web layout and UI with React
* embedding maps APIs
* geocoding APIs
* Passing props and setting State in React

# Game Rules:

* before the game begins the user should see a map of Vermont zoomed out just enough to view the whole state (zoom level ~8 on a map with a 600px height)
* when the player starts a game, they are dropped into a random spot inside Vermont
* the initial score is 100
* the zoom level is 18 and there are no streets or markers, only satellite imagery
* the map does **not** support zoom out, or slippy click-and-drag-to-move -- all movements must be deliberate, by clicking one of the north / south / east / west movement buttons
* every time the user clicks a movement button, the map moves a fixed amount in that direction, and the score is decreased by 1
* when the player clicks "Guess!" they can choose a county from a popup menu
* if the guess is correct then:
  * the game displays "You win!" 
  * their final score is logged [how?] 
  * the Info box is filled in with the correct latitude and longitude
   
> How do we get the nested list of Vermont towns and counties?

## Basic Layout

* Sketch out wireframes for a page with the following page elements. 

|Selector|Description|
|---|---|
|`map`| shows the current map (initally the entire state of Vermont) |
|`nav`| top of page, placeholder for "about" and "high scores" and such |
|`info`| contains fields for... |
|  `latitude`, `long`, `county`, `town` | read-only text fields |
| `north`, `south`, `east`, `west` | buttons for movement |
|`start`, `guess`, `quit` | buttons labeled "Start a Game", "Guess the Spot", "I Give Up!" respectively - all disabled for now |
|`score`| text field |

* Then code the layout in React with placeholder information
* Run the React server with the command `npm start` to see your application

## State of the State

Using [leaflet.js](https://leafletjs.com/) and [React Leaflet](https://react-leaflet.js.org/) a map of the state of Vermont has been created using the [Isri.WorldImagery tileset](https://leaflet-extras.github.io/leaflet-providers/preview/).

The map should be at a *fixed* zoom level (8 is pretty good for a map that's 600px high), enough to show just the boundaries of the state and not much more.

The boundaries of Vermont are specified in the `border.js` file

# Stories

## Game On

**Given** a page with a map, Start, Quit, and Guess buttons

**When** the user clicks *Start a Game*

**Then** the Start button is disabled

**And** the Guess button is enabled

**And** the Quit button is enabled

## Random Spot

**Given** the game has not been started

**When** the user clicks *Start a Game*

**Then** the app chooses a random lat/long position *inside the boundaries of Vermont* 

  * [leaflet-pip](https://github.com/mapbox/leaflet-pip) is a library for finding out whether a point is inside a polygon

**And** zooms and centers the map to that location, with a *different fixed zoom level* of 18

**And** displays question marks inside the lat, long, county, and town fields

> optionally: it displays a small map of Vermont counties on the side, e.g. https://geology.com/county-map/vermont-county-map.gif

## I Give Up!

**Given** the game has been started

**When** the user clicks the "I Give Up" button

**Then** the app displays the lat/long position inside the `info` panel

**And** uses *geocoding* to look up the town and county, and displays those inside the `info` panel

## Guess the County

**Given** the game has been started

**When** the user clicks the Guess button

**Then** the user sees a *modal dialog box* asking "What county are we in?" with a [popup list of all Vermont counties](https://en.wikipedia.org/wiki/List_of_counties_in_Vermont)

**And** two buttons ("Guess" and "Cancel")

<hr/>

**When** the user selects the correct county and clicks "Guess"

**Then** the game *fills in* that county name in the Info box (instead of a question mark) (as well as the other geocoded information)

**And** informs the user "Correct!"

<hr/>

**When** the user selects an incorrect county 

**Then** The game *subtracts* 10 from score

**And** informs the user "Wrong!"

**And** the dialog box disappears

<hr/>

**When** the user clicks "Cancel"

**Then** the dialog box disappears with no change to score

## Move

**Given** the game has been started

**When** the user clicks the "North" button

**Then** the map scrolls a fixed distance to the north (~.002 degrees lat or long should be a good distance)

**And** the score is reduced by 1 point

>and likewise for East, South, and West buttons

## Return

**Given** the user has started the game

**And** moved from their initial location

**When** the user clicks the "Return" button

**Then** the game scrolls back to the starting spot, with no change in score

## Breadcrumbs

**When** the user clicks a movement button

**Then** the map draws a dotted line between the previous map center and the new map center

**And** keeps showing the dotted line during the rest of game

# Icebox

## Save Score (local)

**When** the user wins a game

**Then** the game asks the user for their name (or remembers from earlier)

**And** saves the name and score to a list of games

<hr/>

**When** the user selects "high scores" from the nav bar

**Then** the app shows a list of all games, in score order (top to bottom)

> For the first pass, use [LocalStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) so it persists across game sessions.  **BEWARE** that the values can only be strings, so you must use `JSON.stringify` on the way in and `JSON.parse` on the way out.

## Previous Games:

**Given** the game is over

**When** the game is saved, don't just save the name and score: all the info, including spot and all moves taken, and any guesses, should be saved as well

**Then** viewing old games, the user can select one and see the above info


## View Replay

**Given** the user is viewing previous games

**When** the user selects 'view replay' on a game

**Then** the game shows a replay at a speed of 1 move per second

## Challenge Mode

  * Guess the town, not the county
  * Daily Challenge - every user uses the same point
  * Burlington Challenge - guess the neighborhood
# GeoVermonter
