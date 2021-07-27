var thePage = document.querySelector(".page-title").innerHTML;
document.onload = generateTable();

//Assigns pageName the unique value of the title element of each page, which is then used as a key in the key-value pair in session storage. Pecs choice is passed as a string.
function populateStorage(pecsChoice) {
  var pageName = document.querySelector(".page-title").innerHTML;

  sessionStorage.setItem(pageName, pecsChoice);
}

// Deletes all data contained within sessionStorage.
function deleteStorage() {
  sessionStorage.clear();
  alert("All data in sessionStorage has been deleted.");
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

// Loops over each key in sessionStorage. It then retrieves the value and prints the key and associated value. Test function. Persistent value between pages. Newest item is first.
function myFunction() {
  for (let i = 0; i < sessionStorage.length; i++) {
    var storedValue = sessionStorage.getItem(sessionStorage.key(i));
    var secondVal = sessionStorage.key(i);
    alert(secondVal + " " + storedValue);
  }
}

// Iterate over sessionStorage and increment the relevant array element (corresponding to the order of chartLabels), to then return the array to be used as the dataset in myPieChart
function countPECS() {
  var pecsList = [0, 0, 0, 0, 0];
  for (let i = 0; i < sessionStorage.length; i++) {
    var storedValue = sessionStorage.getItem(sessionStorage.key(i));
    if (storedValue == "I feel excited.") {
      pecsList[0] += 1;
      console.log("Added excited.");
    } else if (storedValue == "I feel happy.") {
      pecsList[1] += 1;
      console.log("Added happy.");
    } else if (storedValue == "I feel bored.") {
      pecsList[2] += 1;
      console.log("Added bored.");
    } else if (storedValue == "I feel sad.") {
      pecsList[3] += 1;
      console.log("Added sad.");
    } else if (storedValue == "I feel angry.") {
      pecsList[4] += 1;
      console.log("Added angry.");
    }
  }
  console.log(pecsList, sessionStorage.length);
  return pecsList;
}

//Data processing

//Dynamically creating the results table.

function generateTable() {
  var theTableBody = document.querySelector(".table-body"); // Select the unique table.
  for (let i = 0; i < sessionStorage.length; i++) { // To determine the ultimate size of the table
    var createTR = document.createElement("tr"); // Table row element
    var createTD = document.createElement("td"); // Table data element
    var thePageTitle = sessionStorage.key(i); // sessionStorage key value
    var storedValue = sessionStorage.getItem(sessionStorage.key(i)); // sessionStorage value data
    createTD.innerHTML =  thePageTitle + " | " + storedValue; // Changing the innerHTML value of the newly created table data element to be data from sessionStorage
    theTableBody.appendChild(createTR); // Appending table row to the identified table
    createTR.appendChild(createTD); // Appending the populated table data element to the row.
  }
}
// CHARTJS

var chartLabels = [
  "I feel excited",
  "I feel happy",
  "I feel bored",
  "I feel sad",
  "I feel angry",
];

// For drawing the lines
var ctx = document.getElementById("myChart").getContext("2d");
var myChart = new Chart(ctx, {
  type: "pie",
  data: {
    labels: chartLabels,
    datasets: [
      {

        data: countPECS(),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  },
  options: {},
});

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
  populateStorage("I feel angry");
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

// Implement a counting function using string comparison to find out how much of each pecs card there is, to be used as the data set for chart js.
