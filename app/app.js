//jQuery document ready initialization stuff
////button and form event handlers
// logic for determining action probably needs to go in the event handler


$(document).ready(function () {
  loadLocalStorage();
  
  var setDefault = function() {
    if (localStorage.getItem('Stage of Evolution') === null) {
      $(btnStart).appendTo('.button-container');
    }
    if (localStorage.getItem('Stage of Evolution') === '0') {
      $('.button-container').append(btnCull, btnIrradiate);
      $('#creature').append(imgEgg);
    }
    if (localStorage.getItem('Stage of Evolution') === '1') {
      $('.button-container').append(btnCull, btnIrradiate, btnPlay, btnFeed, btnBath);
      $('#creature').append(imgChick);
      moveCreature();
      degradeHalfLife();
      degradeHappiness();
      getHungry();
      getSeptic();
    }
    if (localStorage.getItem('Stage of Evolution') === '2') {
      $('.button-container').append(btnCull, btnIrradiate, btnPlay, btnFeed, btnBath);
      $('#creature').append(imgAdolescent);
      moveCreature();
      degradeHalfLife();
      degradeHappiness();
      getHungry();
      getSeptic();
    }
    if (localStorage.getItem('Stage of Evolution') === '3') {
      $('.button-container').append(btnCull, btnIrradiate, btnPlay, btnFeed, btnBath);
      $('#creature').append(imgRooster);
      moveCreature();
      degradeHalfLife();
      degradeHappiness();
      getHungry();
      getSeptic();
    }
  }
  setDefault();
  
  
  
	// $('#btn-create').on('click', function(e) {
  //   var key = $('#key').val();
	// 	var value = $('#value').val();
	// 	var keyExists = localStorage.getItem(key) !== null;
    
	// 	if (keyExists) {
  //     updateStatusLabel('key already exists, please use update button instead! :D');
	// 	} else if (key === '') {
  //     updateStatusLabel('invalid input!')
	// 	}else {
  //     createEntry(key, value);
	// 		updateStatusLabel('key created - ' + key);
	// 	}
    
	// 	loadLocalStorage();
	// });
  
	// $('#btn-update').on('click', function(e) {
  //   var key = $('#key').val();
	// 	var value = $('#value').val();
	// 	var existingValue = localStorage.getItem(key)
	// 	var keyExists = existingValue !== null;
    
	// 	if (value === existingValue) {
  //     updateStatusLabel('key not updated - that value already exists silly! xD')
	// 	} else if (keyExists) {
  //     updateEntry(key, value);
	// 		updateStatusLabel('key updated - ' + key);
	// 	} else if (key === '') {
  //     updateStatusLabel('invalid input!')
	// 	} else {
  //     updateStatusLabel('key doesn\'t exist, please use create button instead! :D');
	// 	}		
		
	// 	loadLocalStorage();		
	// });
  
	// $('#btn-delete').on('click', function(e) {
  //   var key = $('#key').val();
	// 	var value = $('#value').val();
	// 	var keyExists = localStorage.getItem(key) !== null;
    
	// 	if (keyExists) {
  //     removeEntry(key);
	// 		updateStatusLabel('key removed - ' + key);
	// 	} else if (key === '') {
  //     updateStatusLabel('invalid input!')
	// 	} else {
  //     updateStatusLabel('key doesn\'t exist, nothing removed. :|');
	// 	}
    
    
  //   loadLocalStorage();
  // });
  
  
  // interaction buttons
  
  $('.button-container').on('click', '#btn-start', function(e) {
    $('#btn-start').detach();
    $('.button-container').append(btnCull);
    $('.button-container').append(btnIrradiate);
    $('#creature').append(imgEgg);
    createEntry('Strength of Will', 50);
    createEntry('Stage of Evolution', evolutionStage);
    createEntry('Half-Life', 50);
      
    loadLocalStorage();
    setTimeout(degradeHalfLife, 45000);
    setTimeout(generateWill, 60000); // begin 'will' generation
  });
  
  $('.button-container').on('click', '#btn-cull', function(e) {
    console.log('clicked')
    alert('Culling your creature will reset all progress and cannot be undone!')
    localStorage.clear();
    location.reload();
  });
  
  $('.button-container').on('click', '#btn-irradiate', function(e) {
    var currentHalfLife = JSON.parse(localStorage.getItem('Half-Life'));
    if (currentHalfLife <= 92) {
      currentHalfLife += 9;
      updateEntry('Half-Life', JSON.stringify(currentHalfLife))
    } else {
      updateEntry('Half-Life', 100);
    }
    
    loadLocalStorage();
  });
  
  $('.button-container').on('click', '#btn-play', function(e) {
    var currentHappiness = JSON.parse(localStorage.getItem('Happiness'));
    if (currentHappiness <= 94) {
      currentHappiness += 6;
      // play message / sprite
      updateEntry('Happiness', JSON.stringify(currentHappiness));
    } else {
      updateEntry('Happiness', '100');
    }
    
    loadLocalStorage()
  });
  
  $('.button-container').on('click', '#btn-feed', function(e) { // feeding decreases hunger 
    var currentHunger = JSON.parse(localStorage.getItem('Hunger'));
    if (currentHunger >= 7) {
      currentHunger -= 7;
      // feed message / sprite
      updateEntry('Hunger', JSON.stringify(currentHunger))
    } else {
      updateEntry('Hunger', '0');
    }
    
    loadLocalStorage()
  });
  
  $('.button-container').on('click', '#btn-bath', function(e) {
    var currentSeptic = JSON.parse(localStorage.getItem('Septic'));
    if (currentSeptic >= 11) {
      currentSeptic -= 11;
      // play message / sprite
      updateEntry('Septic', JSON.stringify(currentSeptic));
    } else {
      updateEntry('Septic', '0');
    }
    
    loadLocalStorage();
  });
  
  var evolutionStage = 0;
  var sessionTime = 0

  var gameTick = function() { // establishes session time and game tick interval on page load
    console.log('session time: ' + sessionTime)
    sessionTime++
    setTimeout(gameTick, 1000);
    if (localStorage.getItem('Half-Life') === '100') {
      if (localStorage.getItem('Stage of Evolution') === '0') {
        updateEntry('Half-Life', 15);
        updateEntry('Stage of Evolution', '1')
        evolutionStage++;
        evolveToChick();
        loadLocalStorage();
      }
      if (localStorage.getItem('Stage of Evolution') === '1') {
        updateEntry('Half-Life', 15);
        updateEntry('Stage of Evolution', '2')
        evolutionStage++;
        loadLocalStorage();
        evolveToAdolescent();
      }
      if (localStorage.getItem('Stage of Evolution') === '2') {
        updateEntry('Half-Life', 15);
        updateEntry('Stage of Evolution', '3')
        evolutionStage++;
        loadLocalStorage();
        evolveToRooster();
      }
    }
  }
  
  gameTick(); // initiate game time and check on game tick for evolution criteria
  
});

// end Document.ready initialization

// HTML elements
// buttons
var btnStart = '<button class="button" id="btn-start">Start</button>';
var btnCull = '<button class="button" id="btn-cull">Cull</button>';
var btnIrradiate = '<button class="button" id="btn-irradiate">Irradiate</button>';
var btnPlay = '<button class="button" id="btn-play">Play</button>';
var btnFeed = '<button class="button" id="btn-feed">Feed</button>';
var btnBath = '<button class="button" id="btn-bath">Bath</button>';

// creatures
var imgEgg = '<img id="egg" src="images/egg.png">';
var imgChick = '<img id="chick" src="images/chicks-349035_1280.png">';
var imgAdolescent = '<img id="adolescent" src="images/new-hampshire-3185210_1920.png">';
var imgRooster = '<img id="rooster" src="images/cock-3864764_1920.png">';

// Evolution functionality
var evolveToChick = function() {
  $('#egg').detach();
  $('#creature').append(imgChick);
  $('.button-container').append(btnPlay, btnFeed, btnBath);

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
}

var evolveToRooster = function() {
  $('#adolescent').detach();
  $('#creature').append(imgRooster);
}

// update storage 
var loadLocalStorage = function () {
  var keys = Object.keys(localStorage)
var htmlString = '';
for (var i = 0; i < keys.length; i++) {
  htmlString += `<tr><td>${keys[i]}</td><td>${localStorage[keys[i]]}</tr></tr>`;
}
$('tbody').html(htmlString)
};

var updateStatusLabel = function(message) {
	$('#statusLabel').text('Status: ' + message);
}
/*
add status fade after timer
status feedback after trigger click
death warning
evolution celebration
status bar styling
*/


// jQuery animation based on session time

var moveCreature = function() { // random movement every 1.5 game ticks.
  $('.play-screen-container').css('justify-content', randomJustify);
  $('#chick').css('transform', randomMirror);
  $('#creature').css('padding', randomPadding);
  setTimeout(moveCreature, 1500);
}

var randomPadding = function() { // random padding
  var paddingCheck = generateRandom(250);
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



// attribute degredation and need incrementation
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
  setTimeout(degradeHalfLife, 45000);
}

var degradeHappiness = function() {
  var currentHappiness = JSON.parse(localStorage.getItem('Happiness'));
  if (currentHappiness > 0) {
    currentHappiness -= 1;
    updateEntry('Happiness', JSON.stringify(currentHappiness));
  }

  console.log('degrade happy')
  loadLocalStorage()
  setTimeout(degradeHappiness, 30000);
}

var getHungry = function() {
  var currentHunger = JSON.parse(localStorage.getItem('Hunger'));
  if (currentHunger < 100) {
    currentHunger += 1;
    updateEntry('Hunger', JSON.stringify(currentHunger));
  }

  console.log('get hungry')
  loadLocalStorage()
  setTimeout(getHungry, 28000);
}

var getSeptic = function() {
  var currentSeptic = JSON.parse(localStorage.getItem('Septic'));
  if (currentSeptic < 100) {
    currentSeptic += 1;
    updateEntry('Septic', JSON.stringify(currentSeptic));
  }

  console.log('get septic')
  loadLocalStorage();
  setTimeout(getSeptic, 52000);
}

/*

When an input element is given a name, that name becomes a property of the owning form element's HTMLFormElement.elements property. 
That means if you have an input whose name is set to guest and another whose name is hat-size, the following code can be used:

let form = document.querySelector("form");
let guestName = form.elements.guest;
let hatSize = form.elements["hat-size"];
*/

/*
PAGE CONTENT STUFF
*/
//something to update the table every time localStorage changes

//localStorage stuff
//https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage

////create new entry
//localStorage.setItem(key, value)
var createEntry = function(key, value) {
	return localStorage.setItem(key, value);
}

////Update existing entry
//localStorage.setItem(key, value)
var updateEntry = function(key, value) {
	return localStorage.setItem(key, value);
}

////delete existing entry
//localStorage.removeItem(key)
var removeEntry = function(key) {
	return localStorage.removeItem(key);
}

// Random val generation functions

var generateRandom = function(max) { // return a random integer between 0 (inclusive) and max (exclusive)
  return Math.floor(Math.random() * Math.floor(max));
}

var randomColor = function() { // generates random hex color value including #
  var hexNum = Math.floor(Math.random() * 16777215).toString(16);
  return '#' + hexNum;
}

