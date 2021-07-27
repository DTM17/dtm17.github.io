var thePage = document.querySelector(".page-title").innerHTML;

// Loops over each key in sessionStorage. It then retrieves the value and prints the key and associated value. Test function. Persistent value between pages. Newest item is first.
function myFunction() {
  for (let i = 0; i < sessionStorage.length; i++) {
    var storedValue = sessionStorage.getItem(sessionStorage.key(i));
    var secondVal = sessionStorage.key(i);
    alert(secondVal + " " + storedValue);
  }
}

// Assigns pageName the unique value of the title element of each page, which is then used as a key in the key-value pair in session storage. Pecs choice is passed as a string.
function populateStorage(pecsChoice) {
  var pageName = document.querySelector(".page-title").innerHTML;

  sessionStorage.setItem(pageName, pecsChoice);
}

// Deletes all data contained within sessionStorage.
function deleteStorage() {
  sessionStorage.clear();
  alert("All data in sessionStorage has been deleted.");
}

// Iterate over and transfer the items from sessionStorage to an array which will be returned, to then give to chartJS when we populate the chart. Consult phone notes to implement the whole thing.
function countPECS() {
  var pecsList = [];
  for (let i = 0; i < sessionStorage.Storage.length; i++) {
    var storedValue = sessionStorage.getItem(sessionStorage.key(i));
    pecsList.push(storedValue);
  }
  return pecsList;
}

// Check to see if the container has enlarged font, if it does then remove it - otherwise add the enlarged font class.
function alterFont() {
  var fontChange = document.querySelector(".maintask-container");
  if (fontChange.classList.contains("toggled-large-font")) {
    fontChange.classList.remove("toggled-large-font");
  } else {
    fontChange.classList.add("toggled-large-font");
  }
}

// Check to see if the taskbar needs to be brightened or darkened.
function taskbarBright() {
  var colourChange = document.querySelector(".maintask-container");
  if (colourChange.classList.contains("calm-taskbar")) {
    colourChange.classList.remove("calm-taskbar");
    colourChange.classList.add("brighten-taskbar");
  } else {
    colourChange.classList.add("brighten-taskbar");
  }
}

function taskbarCalm() {
  var colourChange = document.querySelector(".maintask-container");
  if (colourChange.classList.contains("brighten-taskbar")) {
    colourChange.classList.remove("brighten-taskbar");
    colourChange.classList.add("calm-taskbar");
  } else {
    colourChange.classList.add("calm-taskbar");
  }
}

// Bootstrap Toasts must be manually shown, as they are opt in and hidden by default. Only displaying it on the initial page with this check.
var disclaimerToast = new bootstrap.Toast(
  document.querySelector(".toast-disclaimer")
);
if (thePage == "TM470 Starting Page - Maths Worksheet") {
  disclaimerToast.show();
} else {
}
// Event Listeners

//Configuration box event listeners - bright/calm colour scheme, font size changing and deletion of data.

var alterFontSelection = document.querySelector(".config-font");
alterFontSelection.addEventListener("click", function () {
  alterFont();
});

var needHelp = document.querySelector(".config-help");
let helpDesc =
  'Click on the PECS cards to best describe how you feel when using the websites you visit. Click the speaker icon to have the meaning of the pictures read out loud to you. You can enlarge the font by pressing "Alter Font", and either brighten or decrease the colour by clicking "Bright" and "Calm" respectively. Clicking "Finished" will take you to the results page.';
needHelp.addEventListener("click", function () {
  alert(helpDesc);
});

var deleteSelection = document.querySelector(".config-delete");
deleteSelection.addEventListener("click", function () {
  deleteStorage();
});

var brightSelection = document.querySelector(".config-bright");
brightSelection.addEventListener("click", function () {
  taskbarBright();
});

var calmSelection = document.querySelector(".config-calm");
calmSelection.addEventListener("click", function () {
  taskbarCalm();
});

// Using event listeners to maintain separation of concerns. Identifying each element based on the unique icon class, then attaching a click event that uses the populate storage function.
var excitedPecs = document.querySelector(".bi-emoji-laughing");
excitedPecs.addEventListener("click", function () {
  populateStorage("I feel excited.");
});

var happyPecs = document.querySelector(".bi-emoji-smile");
happyPecs.addEventListener("click", function () {
  populateStorage("I feel happy.");
});

var boredPecs = document.querySelector(".bi-emoji-neutral");
boredPecs.addEventListener("click", function () {
  populateStorage("I feel bored.");
});

var sadPecs = document.querySelector(".bi-emoji-frown");
sadPecs.addEventListener("click", function () {
  populateStorage("I feel sad.");
});

var angryPecs = document.querySelector(".bi-emoji-angry");
angryPecs.addEventListener("click", function () {
  populateStorage("I feel angry.");
});

// SpeechSynthesis on-click event listeners.

var synth = window.speechSynthesis; // Creating a speech synthesis object.

// Selecting the volume icon for each PECS card, creating an utterance and then attaching an on click event listener.
var excitedSpeech = document.querySelector(".vol-excited");
var excitedSpeechUtterance = new SpeechSynthesisUtterance("I feel excited.");
excitedSpeech.addEventListener("click", function () {
  synth.speak(excitedSpeechUtterance);
});

var happySpeech = document.querySelector(".vol-happy");
var happySpeechUtterance = new SpeechSynthesisUtterance("I feel happy.");
happySpeech.addEventListener("click", function () {
  synth.speak(happySpeechUtterance);
});

var boredSpeech = document.querySelector(".vol-bored");
var boredSpeechUtterance = new SpeechSynthesisUtterance("I feel bored.");
boredSpeech.addEventListener("click", function () {
  synth.speak(boredSpeechUtterance);
});

var sadSpeech = document.querySelector(".vol-sad");
var sadSpeechUtterance = new SpeechSynthesisUtterance("I feel sad.");
sadSpeech.addEventListener("click", function () {
  synth.speak(sadSpeechUtterance);
});

var angrySpeech = document.querySelector(".vol-angry");
var angrySpeechUtterance = new SpeechSynthesisUtterance("I feel angry.");
angrySpeech.addEventListener("click", function () {
  synth.speak(angrySpeechUtterance);
});

// Drag & Drop functionality

//By default you can't drop elements on other elements, so we prevent the default handling of this by using preventDefault() which is called ondragover,
// which is an attribute of the draggable divs
function allowDrop(ev) {
  ev.preventDefault();
}

// Sets the data type and the value of the data being dragged
function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}

//When the ondrop event is fired: First call preventDefault to stop the default handling of data which is to open as a link on drop.
//Then transfer the data by using "getData" which will return any data that was set to the same type in setData(), this data is the ID of the dragged element.
// We then append this element into the element it is being dropped onto.
function drop(ev) {
  ev.preventDefault();
  var theTarget = ev.target;
  if (!theTarget.hasChildNodes()) {
    // Checking the element being dropped onto has no child nodes, indicating something already has been dropped onto it. Prevents an ugly mess.
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
  } else {
    console.log("Element already has child nodes inside.");
  }
}
