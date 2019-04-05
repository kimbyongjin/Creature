# Creature
  by Daniel Kim,
  April 4, 2019

# Notes for my implementation of a CRUDdy app.

  - starting with basic framework, build upon the web app using local storage
  - make it resemble the kind of format as an old java or flash game.
  - windowed area where creature will live
  - side menu that displays current creature stats
  - unable to add fetures until they are given access through evolution
  - or, other fetures are provided through in-game currency
  - examples of small-box game-window style


## Designs
  - tomagachi-like app with screen images and sprites.
    - Will need to implement animation
    - sounds?
    - animate images vs color boxes
    - embedded music?
    - sound fx?
    - loading screen
    - currency to spend on food / toys

## Fetures
  - Local storage web-animal
    > Persistent creature attributes
      - hunger
      - happiness
      - energy
      - play
      - response
      - age / evolution
      - health
      - size
      - birth / death

    > Colorful user-interface
      - dynamic background

    > Time decaying atributes.
      - stages of growth
      - hunger / requiring the need for attention
      - 

    > Time generating attributes
      - in-game currency
      - relative creature age
      - creature evolution

## Resources:
  - JS
    - MDN
    - C3 documentation
    >

  - CSS
    > flexbox documentation
    >


## Code I will need:

  - JS:
    - jQuery
    - underscore
    - C3?
      > on-click triggers
        - sounds
        - purchases
        - evolution
    - heavy use of setTimeout() functionality
    > 

  - CSS:
    - jQuery
    - flexbox
    > 

  - HTML:
    - jQuery
    - animation tehniques
    - embeedded sounds

# Action Plan:

  ### Essentials
    [x] Initialization of app for first-time users
      [x] on Document.ready => detect local storage
      [x] Initialize statrup framework
      [x] Populate local storage with necessary startup elements to allow app progression
    
    [x] Allow clearLocalStorage() to delete app progress and start over.
      [x] initial clear and page reload
      [] Warning and 2-step varification
      [s] Possible recovery? Too complicated



  ### Basic Formatting
    [x] Create a simple player box with colored square 'creature' in the center, at the bottom of the screen, padding to keep it off the border.
    [x] Add page background color.
    [x] Create basic flexbox environment for body and player box.
    [x] Create creature div
    [x] Nested flexbox inside creature div for facial features
    [x] Simple eye vs more facial fetures?
    [x] Player box background color, border, shape, size, picture vs color?
    [x] Reformat table
    [] Reformat buttons to images
    [x] Reformat status message
    [] Variable background image
      [] scaling issues due to differently sized images?
      [] color scheme?
    [] Better background color/ image for document body
    [] General UI improvements
    [] Button graphics, shadowing, motion, 
    [] Hover characteristics for interactive elements
    [] User customization?
      [] Creature name
      [x] Welcome message
      [x] Startup instructions
      [] User feedback

  ### Creture Fetures
    Attributes: 
      [x] Hunger -> grows with time & decreases with interaction 'feed'
      [x] Happiness -> degrades with time & increases with interaction 'play'
      [x] Septic -> grows with time & decreases with interaction 'bath'
      [x] halflife -> degrades with time & increases with interaction 'irradiate'

    Interactions:
      [x] feed -> decreases hunger - increase septic*
      [x] play -> increases happiness - increase septic*
      [x] bath -> decreases septic - decrease halflife*
      [x] irradiate -> increases haflife - cost money?*

  ### Basic setTimeout functionality
    [x] Set game tick value of 1 tick to equal 1000 ms standard
    [x] Functions to move creature by manipulating CSS after a set timeout.
      explore animation vs manipulate flexbox properties
    [x] Functions to degrade attributes with a set timeout
    [x] Function to generate random value
    [x] Function to generate random hex color
    [] Change colors at random times, like eye color
    [x] Generate currency? 'Will'

  ### Interaction Triggers
    Irradiate:
      [] change creature and feature colors
    Feed:
      [] change position
    Bath:
      [] wash of blue across screen
    Irradiate:
      [] wash of orange/yellow across screen
  
  ### Balancing
    [] Needs more balancing!
    [x] Attribute degredation / need:
    [x] Cost in 'Will' to perform tasks
      - Does the 'Will' generation happen quickly enough to keep the creature alive?
      - Does the offset of irradiation and bathing match the need of the creture to stay alive?

  ### Evolution
    [x] How many stages? 3, or 4 including an egg
    [x] Start with an egg that doesn't move
    [] Egg hatches into a random creture with its own evolution path.
    [] Different attrributres and difficulties for each creature path?
    [x] On evolution, add essential elements for particular evolutionary stage.
    [x] Death
    [x] On 'Cull' => clear local storage and force reolad page


NOTES:
updateStatusLabel function adds a status message to the div with ID #status label
 - need text fade and general styling

