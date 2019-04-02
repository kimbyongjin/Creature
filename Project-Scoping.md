# Notes for my implementation of a CRUDdy app.

  - starting with basic framework, build upon the web app using local storage
  - make it resemble the kind of format as an old java or flash game.
  - windowed area where creature will live
  - side menu that displays current creature stats
  - unable to add fetures until they are given access through evolution
  - or, other fetures are provided through in-game currency
  - examples of small-box game-window style
    > Arcuz
    > Armor Games
    > Miniclip
  - 


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
  ### Basic Formatting
    [x] Create a simple player box with colored square 'creature' in the center, at the bottom of the screen, padding to keep it off the border.
    [x] Add page background color.
    [x] Create basic flexbox environment for body and player box.
    [x] Create creature div
    [x] Nested flexbox inside creature div for facial features
    [x] Simple eye vs more facial fetures?
    [] Player box background color, border, shape, size, picture vs color?

  ### Creture Fetures
    Attributes: 
      [] Hunger -> grows with time & decreases with interaction 'feed'
      [] Happiness -> degrades with time & increases with interaction 'play'
      [] Septic -> grows with time & decreases with interaction 'bath'
      [] halflife -> degrades with time & increases with interaction 'irradiate'

    Interactions:
      [] feed -> decreases hunger - increase septic
      [] play -> increases happiness - increase septic
      [] bath -> decreases septic - decrease halflife
      [] irradiate -> increases haflife - cost money?

  ### Basic setTimeout functionality
    Set game tick value of 1 tick to equal 1000 ms standard
    Functions to move creature by manipulating CSS after a set timeout.
      explore animation vs manipulate flexbox properties
    Functions to degrade attributes with a set timeout
    Function to generate random value
    Change colors at random times, like eye color
    Generate currency?

  ### Interaction Triggers
    Irradiate:
      [] change creature and feature colors
    Feed:
      [] change position
    Bath:
      [] wash of blue across screen
    Irradiate:
      [] wash of orange/yellow across screen
    