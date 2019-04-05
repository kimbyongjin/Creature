/*
Creature 
  By Daniel Kim
*/

$(document).ready(function () {

  // Loads empty for new user or recalls save state for current user
  loadLocalStorage();
  
  /*
  Set default / saved state on page load
  */

  // Populate page for appropriate 
  var setDefault = function() {
    if (localStorage.getItem('Stage of Evolution') === null) {
      $(btnStart).appendTo('.button-container');
    }
    if (localStorage.getItem('Stage of Evolution') === '0') {
      $('.button-container').append(btnCull, btnIrradiate);
      $('#creature').append(imgEgg);
      degradeHalfLife();
    }
    if (localStorage.getItem('Stage of Evolution') === '1') {
      $('.button-container').append(btnCull, btnIrradiate, btnPlay, btnFeed, btnBath);
      $('#creature').append(imgChick);
      $('#creature').css('height', '150px');
      $('#creature').css('width', '150px');
      moveCreature();
      degradeHalfLife();
      degradeHappiness();
      getHungry();
      getSeptic();
    }
    if (localStorage.getItem('Stage of Evolution') === '2') {
      $('.button-container').append(btnCull, btnIrradiate, btnPlay, btnFeed, btnBath);
      $('#creature').append(imgAdolescent);
      $('#creature').css('height', '260px');
      $('#creature').css('width', '155px');
      moveCreature();
      degradeHalfLife();
      degradeHappiness();
      getHungry();
      getSeptic();
    }
    if (localStorage.getItem('Stage of Evolution') === '3') {
      $('.button-container').append(btnCull, btnIrradiate, btnPlay, btnFeed, btnBath);
      $('#creature').append(imgRooster);
      $('#creature').css('height', '230px');
      $('#creature').css('width', '230px');
      moveCreature();
      degradeHalfLife();
      degradeHappiness();
      getHungry();
      getSeptic();
    }
  }

  setDefault(); // load stored progress
  
  /*
  Interaction buttons
  */

  // Button Start
  $('.button-container').on('click', '#btn-start', function(e) {
    $('#btn-start').detach();
    $('.button-container').append(btnCull);
    $('.button-container').append(btnIrradiate);
    $('#creature').append(imgEgg);
    createEntry('Strength of Will', 0);
    createEntry('Stage of Evolution', evolutionStage);
    createEntry('Half-Life', 70);
      
    loadLocalStorage();
    setTimeout(degradeHalfLife, 45000);
    setTimeout(generateWill, 60000); // begin 'will' generation
  });
  
  // Button Cull
  $('.button-container').on('click', '#btn-cull', function(e) {
    console.log('clicked')
    alert('Culling your creature will reset all progress and cannot be undone!')
    localStorage.clear();
    location.reload();
  });
  
  // Button Irradiate
  $('.button-container').on('click', '#btn-irradiate', function(e) {
    var currentHalfLife = JSON.parse(localStorage.getItem('Half-Life'));
    var currentWill = JSON.parse(localStorage.getItem('Strength of Will'));
    if (currentWill > 9) {
      if (currentHalfLife <= 87) {
        currentHalfLife += 13;
        updateEntry('Half-Life', JSON.stringify(currentHalfLife))
      } else {
        updateEntry('Half-Life', 100);
      }
      currentWill -= 9;
      updateEntry('Strength of Will', JSON.stringify(currentWill));
    }
    
    loadLocalStorage();
  });
  
  // Button Play
  $('.button-container').on('click', '#btn-play', function(e) {
    var currentHappiness = JSON.parse(localStorage.getItem('Happiness'));
    var currentWill = JSON.parse(localStorage.getItem('Strength of Will'));
    if (currentWill > 6) {
      if (currentHappiness <= 89) {
        currentHappiness += 11;
        // play message / sprite
        updateEntry('Happiness', JSON.stringify(currentHappiness));
      } else {
        updateEntry('Happiness', '100');
      }
      currentWill -= 6;
      updateEntry('Strength of Will', JSON.stringify(currentWill));
    }
    
    loadLocalStorage()
  });
  
  // Button Feed
  $('.button-container').on('click', '#btn-feed', function(e) { // feeding decreases hunger 
    var currentHunger = JSON.parse(localStorage.getItem('Hunger'));
    var currentWill = JSON.parse(localStorage.getItem('Strength of Will'));
    if (currentWill > 7) {
      if (currentHunger >= 9) {
        currentHunger -= 9;
        // feed message / sprite
        updateEntry('Hunger', JSON.stringify(currentHunger))
      } else {
        updateEntry('Hunger', '0');
      }
      currentWill -= 7;
      updateEntry('Strength of Will', JSON.stringify(currentWill));
    }
    
    loadLocalStorage()
  });
  
  // Button Bath
  $('.button-container').on('click', '#btn-bath', function(e) {
    var currentSeptic = JSON.parse(localStorage.getItem('Septic'));
    var currentWill = JSON.parse(localStorage.getItem('Strength of Will'));
    if (currentWill > 11) {
      if (currentSeptic >= 13) {
        currentSeptic -= 13;
        // play message / sprite
        updateEntry('Septic', JSON.stringify(currentSeptic));
      } else {
        updateEntry('Septic', '0');
      }
      currentWill -= 11;
      updateEntry('Strength of Will', JSON.stringify(currentWill));
    }
    
    loadLocalStorage();
  });
  
  /*
  App timer and status checker
  */

  var evolutionStage = 0;
  var sessionTime = 0

  var gameTick = function() { // establishes session time and game tick interval on page load
    console.log('session time: ' + sessionTime)
    var currentHappiness = JSON.parse(localStorage.getItem('Happiness'));
    var currentHunger = JSON.parse(localStorage.getItem('Hunger'));
    var currentSeptic = JSON.parse(localStorage.getItem('Septic'));
    sessionTime++
    setTimeout(gameTick, 1000);

    // need to add death case and death messages

    if (localStorage.getItem('Half-Life') === '100') {
      if (localStorage.getItem('Stage of Evolution') === '0') {
        updateEntry('Half-Life', 20);
        updateEntry('Stage of Evolution', '1')
        evolutionStage++;
        evolveToChick();
        loadLocalStorage();
      }
      if (currentHappiness >= 75 && currentHunger <= 35 && currentSeptic <= 40) {
        if (localStorage.getItem('Stage of Evolution') === '1') {
          updateEntry('Half-Life', 20);
          updateEntry('Stage of Evolution', '2');
          evolutionStage++;
          loadLocalStorage();
          evolveToAdolescent();
        } else if (localStorage.getItem('Stage of Evolution') === '2') {
          updateEntry('Half-Life', 20);
          updateEntry('Stage of Evolution', '3');
          evolutionStage++;
          loadLocalStorage();
          evolveToRooster();
        }
      }
    }
  }
    
  gameTick(); // initiate game time and check on game tick for evolution criteria
  
});
// end Document.ready initialization

/*
HTML elements
*/

// buttons
var btnStart = '<button class="button" id="btn-start">Start</button>';
var btnCull = '<button class="button" id="btn-cull">Cull</button>';
var btnIrradiate = '<button class="button" id="btn-irradiate">Irradiate</button>';
var btnPlay = '<button class="button" id="btn-play">Play</button>';
var btnFeed = '<button class="button" id="btn-feed">Feed</button>';
var btnBath = '<button class="button" id="btn-bath">Bath</button>';

// creature images
var imgEgg = '<img id="egg" src="images/egg.png">';
var imgChick = '<img id="chick" src="images/chicks-349035_1280.png">';
var imgAdolescent = '<img id="adolescent" src="images/new-hampshire-3185210_1920.png">';
var imgRooster = '<img id="rooster" src="images/cock-3864764_1920.png">';

/*
Evolution functionality
*/

var evolveToChick = function() {
  $('#egg').detach();
  $('#creature').append(imgChick);
  $('.button-container').append(btnPlay, btnFeed, btnBath);
  $('#creature').css('height', '150px');
  $('#creature').css('width', '150px');
  createEntry('Happiness', 50);
  createEntry('Hunger', 50);
  createEntry('Septic', 50);
  moveCreature();
  degradeHappiness();
  getHungry();
  getSeptic();
}

var evolveToAdolescent = function() {
  $('#chick').detach();
  $('#creature').append(imgAdolescent);
  $('#creature').css('height', '260px');
  $('#creature').css('width', '155px');
}

var evolveToRooster = function() {
  $('#adolescent').detach();
  $('#creature').append(imgRooster);
  $('#creature').css('height', '230px');
  $('#creature').css('width', '230px');
}

/*
Update storage 
*/

var loadLocalStorage = function () {
  var keys = Object.keys(localStorage)
var htmlString = '';
for (var i = 0; i < keys.length; i++) {
  htmlString += `<tr><td>${keys[i]}</td><td>${localStorage[keys[i]]}</tr></tr>`;
}
$('tbody').html(htmlString)
};

// would like to use status bar a little, with some text fading implementation
var updateStatusLabel = function(message) {
	$('#statusLabel').text('Status: ' + message);
}

/*
jQuery animation based on session time
*/

var moveCreature = function() { // random movement every 1.5 game ticks.
  $('.play-screen-container').css('justify-content', randomJustify);
  $('#creature').css('transform', randomMirror);
  $('#creature').css('padding', randomPadding);
  setTimeout(moveCreature, 1500);
}

var randomPadding = function() { // random padding
  var paddingCheck = generateRandom(216);
  return paddingCheck + 'px';
}

var randomJustify = function() { // random flex position
  var justifyCheck = generateRandom(3);
  if (justifyCheck === 0) {
    return 'center';
  }
  if (justifyCheck === 1) {
    return 'flex-end';
  }
  return 'flex-start';
}

var randomMirror = function() { // generate random creture direction
  var mirrorCheck = generateRandom(2);
  if (mirrorCheck === 0) {
    return 'scaleX(-1)'
  }
  return 'scaleX(1)'
}


/*
Attribute degredation and need incrementation
*/

var generateWill = function() {
  var currentWill = JSON.parse(localStorage.getItem('Strength of Will'));
  if (currentWill < 100) {
    currentWill += 1;
    updateEntry('Strength of Will', JSON.stringify(currentWill));
  }

  console.log('generate Will');
  loadLocalStorage();
  setTimeout(generateWill, 60000);
}

var degradeHalfLife = function() {
  var currentHalfLife = JSON.parse(localStorage.getItem('Half-Life'));
  if (currentHalfLife > 0) {
    currentHalfLife -= 1;
    updateEntry('Half-Life', JSON.stringify(currentHalfLife));
  }

  console.log('degrade half-life')
  loadLocalStorage();
  setTimeout(degradeHalfLife, 63000);
}

var degradeHappiness = function() {
  var currentHappiness = JSON.parse(localStorage.getItem('Happiness'));
  if (currentHappiness > 0) {
    currentHappiness -= 1;
    updateEntry('Happiness', JSON.stringify(currentHappiness));
  }

  console.log('degrade happy')
  loadLocalStorage()
  setTimeout(degradeHappiness, 53000);
}

var getHungry = function() {
  var currentHunger = JSON.parse(localStorage.getItem('Hunger'));
  if (currentHunger < 100) {
    currentHunger += 1;
    updateEntry('Hunger', JSON.stringify(currentHunger));
  }

  console.log('get hungry')
  loadLocalStorage()
  setTimeout(getHungry, 58000);
}

var getSeptic = function() {
  var currentSeptic = JSON.parse(localStorage.getItem('Septic'));
  if (currentSeptic < 100) {
    currentSeptic += 1;
    updateEntry('Septic', JSON.stringify(currentSeptic));
  }

  console.log('get septic')
  loadLocalStorage();
  setTimeout(getSeptic, 65000);
}

/*
Local storage manipulation stuff
*/

//create new entry
var createEntry = function(key, value) {
	return localStorage.setItem(key, value);
}

// update existing entry

var updateEntry = function(key, value) {
	return localStorage.setItem(key, value);
}

//delete existing entry
var removeEntry = function(key) {
	return localStorage.removeItem(key);
}

/*
Random val generation functions
*/

var generateRandom = function(max) { // return a random integer between 0 (inclusive) and max (exclusive)
  return Math.floor(Math.random() * Math.floor(max));
}

var randomColor = function() { // generates random hex color value including #
  var hexNum = Math.floor(Math.random() * 16777215).toString(16);
  return '#' + hexNum;
}
