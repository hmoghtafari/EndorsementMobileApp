import {initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import {getDatabase, ref, push, onValue, remove} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://publish-endorsement-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const endorsementListInDB = ref (database, "endorsementList")


const inputEl = document.getElementById("input-txt")
const publishBtn = document.getElementById("publish-btn")
const endorsementListEl = document.getElementById("endorsement-el")

publishBtn.addEventListener("click", function(){
    let inputEldata = inputEl.value 
    // console.log(inputEldata)
    push(endorsementListInDB, inputEldata)
    // endorsementListEl.innerHTML += `<li>${inputEldata}</li>`
    clearInputEl()
    // console.log(endorsementListInDB)
})

onValue(endorsementListInDB, function(snapshot){
    if (snapshot.exists()){
        let itemArrey = Object.entries(snapshot.val())
        // console.log(itemArrey)
        
    removeEndorsementList()
    
    for(let i = 0 ; i < itemArrey.length ; i++) {
        let currentItems = itemArrey[i]
        let currentItemsID = itemArrey[0]
        let currentItemsValue = itemArrey[1]
        
        appendItemsToEndorsementList(currentItems)
    }
    } else {
        endorsementListEl.innerHTML = "No items here... yet"
    }
})
function removeEndorsementList(){
    endorsementListEl.innerHTML = ""
}
function clearInputEl(){
    inputEl.value = ""
}

function appendItemsToEndorsementList(item){
    let itemId = item[0]
    let itemValue = item[1]
    
    let newEl = document.createElement("li") 
    newEl.textContent = itemValue

    newEl.addEventListener("dblclick", function(){
        let exactLocationOfItemInDB = ref(database, `endorsementList/${itemId}`)
remove(exactLocationOfItemInDB)

    })
    endorsementListEl.append(newEl)
    
}