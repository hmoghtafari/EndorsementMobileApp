import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
  remove,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
  databaseURL: "https://publish-endorsement-default-rtdb.firebaseio.com/",
};

const app = initializeApp(appSettings);
const database = getDatabase(app);
const endorsementListInDB = ref(database, "endorsementList");

const inputEl = document.getElementById("input-txt");
const publishBtn = document.getElementById("publish-btn");
const endorsementListEl = document.getElementById("endorsement-el");

inputEl.addEventListener("input", function () {
  let inputEldata = inputEl.value.trim(); // Trim any whitespace
  if (inputEldata === "") {
    publishBtn.disabled = true;
  } else {
    publishBtn.disabled = false;
  }
});
publishBtn.addEventListener("click", function () {
  //   let inputEldata = inputEl.value;
  let inputEldata = inputEl.value.trim(); // Trim any whitespace
  if (inputEldata === "") {
    // Display error message
    alert("The box should not be empty");
    return; // Stop further execution
  }
  push(endorsementListInDB, inputEldata);
  clearInputEl();
});

onValue(endorsementListInDB, function (snapshot) {
  if (snapshot.exists()) {
    let itemArray = Object.entries(snapshot.val());
    let reversedArray = itemArray.reverse(); // Reverse the array

    removeEndorsementList();

    for (let i = 0; i < reversedArray.length; i++) {
      let currentItems = reversedArray[i];
      //   let currentItemsID = currentItems[0];
      //   let currentItemsValue = currentItems[1];

      appendItemsToEndorsementList(currentItems);
    }
  } else {
    endorsementListEl.innerHTML = "No items here... yet";
  }
});
function removeEndorsementList() {
  endorsementListEl.innerHTML = "";
}
function clearInputEl() {
  inputEl.value = "";
}

function appendItemsToEndorsementList(item) {
  let itemId = item[0];
  let itemValue = item[1];

  let newEl = document.createElement("li");
  newEl.textContent = itemValue;

  newEl.addEventListener("dblclick", function () {
    let exactLocationOfItemInDB = ref(database, `endorsementList/${itemId}`);
    remove(exactLocationOfItemInDB);
  });
  endorsementListEl.append(newEl);
}
