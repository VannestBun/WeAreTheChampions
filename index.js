// javascript
// https://realtime-database-7fcd1-default-rtdb.asia-southeast1.firebasedatabase.app/

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL:"https://realtime-database-7fcd1-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const endorsementInDB = ref(database, "endorsementList")

const inputField = document.getElementById("input-field")
const publishBtn = document.getElementById("publish-btn")
const endorsementList = document.getElementById("endorsement-list")


publishBtn.addEventListener("click", function() {
    let inputvalue = inputField.value
    
    push(endorsementInDB, inputvalue)
    
    clearInputField()
    
})

onValue(endorsementInDB, function(snapshot) {
    if (snapshot.exists()) {
        let endorsementArray = Object.entries(snapshot.val())
    
    clearEndorsementList()
    
    for (let i = 0; i < endorsementArray.length; i++) {
        let currentEndorsement = endorsementArray[i]
        let currentID = currentEndorsement[0]
        let currentValue = currentEndorsement[1]
        
        appendEndorsementToList(currentEndorsement)
        }
    } else {
        endorsementList.innerHTML = ""
    }
})

function clearInputField() {
    inputField.value = ''
}

function appendEndorsementToList(item) {
    let endorsementID = item[0]
    let endorsementValue = item[1]
    let newEl = document.createElement("li")
    newEl.textContent = endorsementValue
    
    newEl.addEventListener("dblclick", function(){
        let exactLocationOfEndorsementInDB = ref(database, `endorsementList/${endorsementID}`)
        remove(exactLocationOfEndorsementInDB)
    })    
    endorsementList.append(newEl)
} 

function clearEndorsementList() {
    endorsementList.innerHTML = ''
}