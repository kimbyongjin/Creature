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
  
  // Welcome message
  var welcomeMsg1 = '<p>If this is your first time trying creature, be warned.</p>';
  var welcomeMsg2 = '<p>Death can come swiftly, and without warning!</p>';
  var welcomeMsg3 = '<p>You will be awarded for your patience, love and care.</p>';
  var welcomeMsg4 = '<p>You will be penalized for your laziness and neglect.</p>';
  var welcomeMsg5 = '<p>Do you have the Strength of Will to succeed?</p>';
  var welcomeMsg6 = '<p>Give it time...</p>';
  var welcomeMsg7 = '<p id="start-line">Press Start to begin!</p>';

  // Populate page for appropriate 
  var setDefault = function() {
    $('.play-screen-container').css('background-image', "url('images/Wheat_Fields_at_Auvers_Under_Clouded_Sky_1890_Vincent_van_Gogh.jpg')");
    if (localStorage.getItem('Stage of Evolution') === null) {
      $('.button-container').append(btnStart);
      $('#status-label').append(welcomeMsg1);
      $('#status-label').append(welcomeMsg2);
      $('#status-label').append(welcomeMsg3);
      $('#status-label').append(welcomeMsg4);
      $('#status-label').append(welcomeMsg5);
      $('#status-label').append(welcomeMsg6);
      $('#status-label').append(welcomeMsg7);
    }
    if (localStorage.getItem('Stage of Evolution') === '0') {
      $('.button-container').append(btnCull, btnIrradiate);
      $('#creature').append(imgEgg);
      degradeHalfLife();
      setTimeout(generateWill, 60000);
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
      setTimeout(generateWill, 60000);
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
      setTimeout(generateWill, 60000);
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
      setTimeout(generateWill, 60000);
    }
  }

  // Load stored progress or initialize beginning screen for new user and on-death restart / voluntary cull restart
  setDefault(); 
  
  /*
  Interaction buttons
  */

  // Button Start
  $('.button-container').on('click', '#btn-start', function(e) {
    $('#btn-start').detach();
    $('#status-label').detach();
    $('.button-container').append(btnCull);
    $('.button-container').append(btnIrradiate);
    $('#creature').append(imgEgg);
    createEntry('Strength of Will', 0);
    createEntry('Stage of Evolution', 0);
    createEntry('Half-Life', 70);
      
    loadLocalStorage();
    setTimeout(degradeHalfLife, 45000); // begin half-life degredation
    setTimeout(generateWill, 60000); // begin 'will' generation
  });
  
  // Button Cull
  $('.button-container').on('click', '#btn-cull', function(e) {
    alert('Culling your creature will reset all progress and cannot be undone!')
    localStorage.clear();
    location.reload();
  });
  
  // Button Irradiate
  $('.button-container').on('click', '#btn-irradiate', function(e) {
    var currentHalfLife = JSON.parse(localStorage.getItem('Half-Life'));
    var currentWill = JSON.parse(localStorage.getItem('Strength of Will'));
    if (currentWill >= 9) {
      if (currentHalfLife <= 86) {
        currentHalfLife += 14;
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
    if (currentWill >= 6) {
      if (currentHappiness <= 87) {
        currentHappiness += 13;
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
    if (currentWill >= 7) {
      if (currentHunger >= 12) {
        currentHunger -= 12;
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
    if (currentWill >= 11) {
      if (currentSeptic >= 14) {
        currentSeptic -= 14;
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

  // establishes session time and game tick interval on page load
  // establishes death check for depleated stats and excessive need
  // throws an alert on death and evolution.
  var gameTick = function() { 
    console.log('session time: ' + sessionTime);
    var currentWill = JSON.parse(localStorage.getItem('Strength of Will'));
    var currentHalfLife = JSON.parse(localStorage.getItem('Half-Life'));
    var currentHappiness = JSON.parse(localStorage.getItem('Happiness'));
    var currentHunger = JSON.parse(localStorage.getItem('Hunger'));
    var currentSeptic = JSON.parse(localStorage.getItem('Septic'));
    sessionTime++
    setTimeout(gameTick, 1000);

    // Death
    if (currentHalfLife === 0) {
      alert('Your dull little creature froze to death!\nAlways remember to irradiate regularly.\nTry again!\n ')
      localStorage.clear();
      location.reload();
    }
    if (currentHappiness === 0) {
      alert('Your neglected little creature died of lonelieness!\nMake sure to keep your creature entertained.\nTry again!\n ')
      localStorage.clear();
      location.reload();
    }
    if (currentHunger === 100) {
      alert('Your ravenous little creature died of hunger!\nDon\'t forget to feed the little one.\nTry again!\n \n ')
      localStorage.clear();
      location.reload();
    }
    if (currentSeptic === 100) {
      alert('Your filthy little creature died of septic shock!\nMake sure to keep your little friend bathed.\nTry again!\n ')
      localStorage.clear();
      location.reload();
    }

    // Evolution
    if (localStorage.getItem('Half-Life') === '100') {
      if (localStorage.getItem('Stage of Evolution') === '0') {
        updateEntry('Half-Life', '20');
        updateEntry('Stage of Evolution', '1')
        evolveToChick();
        loadLocalStorage();
        alert('Your egg hatched!\n \nMeet your new baby chick!\n ');
      }
      if (currentHappiness >= 75 && currentHunger <= 35 && currentSeptic <= 40) {
        if (localStorage.getItem('Stage of Evolution') === '1') {
          updateEntry('Half-Life', '20');
          updateEntry('Stage of Evolution', '2');
          loadLocalStorage();
          evolveToAdolescent();
          alert('Your chick grew up into an adolescent!\n');
        } else if (localStorage.getItem('Stage of Evolution') === '2') {
          updateEntry('Half-Life', '20');
          updateEntry('Stage of Evolution', '3');
          loadLocalStorage();
          evolveToRooster();
          alert('Your young chicken is now a fully grown rooster!\n');
        }
      }
    }

    // Long session bonuses aproximately every 2.2 hours of active session time
    if (sessionTime % 9000 === 0) {
      currentWill += 10;
      updateEntry('Strength of Will', JSON.stringify(currentWill));

      alert('Your patience is admirable!\nYou are awarded a bonus of 10 Will\nYour current session time is ' + ((sessionTime / 60) / 60).toFixed(2) + ' hours!');
      console.log('generate bonus Will! -> session time: ' + sessionTime);
      loadLocalStorage();
    }
  }
    
  gameTick(); // initiate game time and check on game tick for evolution criteria
  
});
// Global use variable for time stamping triggers
var sessionTime = 0;

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
  createEntry('Happiness', '52');
  createEntry('Hunger', '43');
  createEntry('Septic', '29');
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

// update page with current local storage keys / values
var loadLocalStorage = function () {
  var keys = Object.keys(localStorage)
  var htmlString = '';
  for (var i = 0; i < keys.length; i++) {
    htmlString += `<tr><td>${keys[i]}</td><td>${localStorage[keys[i]]}</tr></tr>`;
  }
  $('tbody').html(htmlString)
}

// would like to use status bar a little, with some text fading implementation
var updateStatusLabel = function(message) {
	$('#statusLabel').text('Status: ' + message);
}

/*
jQuery animation based on session time
*/

// random movement every 1.2 game ticks
var moveCreature = function() {
  $('.play-screen-container').css('justify-content', randomJustify);
  $('#creature').css('transform', randomMirror);
  $('#creature').css('padding', randomPadding);
  setTimeout(moveCreature, 1200);
}

// random padding
var randomPadding = function() {
  var paddingCheck = generateRandom(216);
  return paddingCheck + 'px';
}

// random flex position
var randomJustify = function() {
  var justifyCheck = generateRandom(3);
  if (justifyCheck === 0) {
    return 'center';
  }
  if (justifyCheck === 1) {
    return 'flex-end';
  }
  return 'flex-start';
}

// generate random creture direction
var randomMirror = function() {
  var mirrorCheck = generateRandom(2);
  if (mirrorCheck === 0) {
    return 'scaleX(-1)';
  }
  return 'scaleX(1)';
}


/*
Attribute degredation and need incrementation functions
*/

var generateWill = function() {
  var currentWill = JSON.parse(localStorage.getItem('Strength of Will'));
  if (currentWill < 100) {
    currentWill += 1;
    updateEntry('Strength of Will', JSON.stringify(currentWill));
  }

  console.log('generate Will -> session time: ' + sessionTime);
  loadLocalStorage();
  setTimeout(generateWill, 30000);
}

var degradeHalfLife = function() {
  var currentHalfLife = JSON.parse(localStorage.getItem('Half-Life'));
  if (currentHalfLife > 0) {
    currentHalfLife -= 1;
    updateEntry('Half-Life', JSON.stringify(currentHalfLife));
  }

  console.log('degrade Half-Life -> session time: ' + sessionTime);
  loadLocalStorage();
  setTimeout(degradeHalfLife, 120000);
}

var degradeHappiness = function() {
  var currentHappiness = JSON.parse(localStorage.getItem('Happiness'));
  if (currentHappiness > 0) {
    currentHappiness -= 1;
    updateEntry('Happiness', JSON.stringify(currentHappiness));
  }

  console.log('degrade Happiness -> session time: ' + sessionTime);
  loadLocalStorage();
  setTimeout(degradeHappiness, 90000);
}

var getHungry = function() {
  var currentHunger = JSON.parse(localStorage.getItem('Hunger'));
  if (currentHunger < 100) {
    currentHunger += 1;
    updateEntry('Hunger', JSON.stringify(currentHunger));
  }

  console.log('get Hungry -> session time: ' + sessionTime);
  loadLocalStorage();
  setTimeout(getHungry, 98000);
}

var getSeptic = function() {
  var currentSeptic = JSON.parse(localStorage.getItem('Septic'));
  if (currentSeptic < 100) {
    currentSeptic += 1;
    updateEntry('Septic', JSON.stringify(currentSeptic));
  }

  console.log('get Septic -> session time: ' + sessionTime)
  loadLocalStorage();
  setTimeout(getSeptic, 140000);
}

/*
Local storage manipulation functions
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
Random value generation functions
*/

var generateRandom = function(max) { // return a random integer between 0 (inclusive) and max (exclusive)
  return Math.floor(Math.random() * Math.floor(max));
}

var randomColor = function() { // generates random hex color value including #
  var hexNum = Math.floor(Math.random() * 16777215).toString(16);
  return '#' + hexNum;
}
