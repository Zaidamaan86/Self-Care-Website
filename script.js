
// Something
// if (document.title == "Home"){
//     document.querySelector('#row1-p').style.width = document.querySelector("#row1-heading").offsetWidth + 'px';
//     document.querySelector('#row2-p').style.width = document.querySelector("#row2-heading").offsetWidth + 'px';
// }
//  else {
var searchbox = document.getElementById("SearchBox");
var tips1 = document.getElementById("Tips1");
var tips2 = document.getElementById("Tips2");
var rq1 = document.getElementById("rq1");
var rq2 = document.getElementById("rq2");
var rq3 = document.getElementById("rq3");
var rqs1 = document.getElementById("rqs1");
var rqs2 = document.getElementById("rqs2");
var rqs3 = document.getElementById("rqs3");
var s1 = document.getElementById("s1");
var s2 = document.getElementById("s2");
var s3 = document.getElementById("s3");
var btn1 = document.getElementById("btn1");
var btn2 = document.getElementById("btn2");
var btn3 = document.getElementById("btn3");
var searchbtn = document.getElementById("SearchBtn");
var inputname = document.getElementById("inputname");
var inputemail = document.getElementById("inputemail");
var inputtext = document.getElementById("inputtext");
var insbtn = document.getElementById("insbtn");
let homeSection = document.querySelector("#home");
let searchSection = document.querySelector("#search");

// require('dotenv').config()
// console.log(process.env);

let currentEntry = 0;

const firebaseConfig = {
    apiKey: "AIzaSyB-LLDVq6y4isdtGeyxXhSY3FUHmFtiSqU",
    authDomain: "mentalhealth570.firebaseapp.com",
    databaseURL: "https://mentalhealth570-default-rtdb.firebaseio.com",
    projectId: "mentalhealth570",
    storageBucket: "mentalhealth570.appspot.com",
    messagingSenderId: "768841166463",
    appId: "1:768841166463:web:6be391060c30f865bc194a",
    measurementId: "G-F4F57KYXXF"
};

document.querySelector("#back").addEventListener('click', () => {
    homeSection.classList.toggle("active");
    searchSection.classList.toggle("active");
})

function equalIgnoreCase(var1, var2) {
    return (("" + var1).toUpperCase() === ("" + var2).toUpperCase())
}


function searcheventHandler(data) {
    if (searchbox.value == "") return;
    let flag = 0;
    data.forEach(element => {
        if (equalIgnoreCase(element.id, searchbox.value)) {
            homeSection.classList.toggle("active");
            searchSection.classList.toggle("active");
            flag = 1;
            tips1.innerHTML = element.tips1;
            tips2.innerHTML = element.tips2;
            rq1.innerText = element.rq1;
            rq2.innerText = element.rq2;
            rq3.innerText = element.rq3;
            s1.innerText = element.s1;
            s2.innerText = element.s2;
            s3.innerText = element.s3;
            btn1.href = element.btn1;
            btn2.href = element.btn2;
            btn3.href = element.btn3;
            rqs1.innerHTML = element.rqs1;
            rqs2.innerHTML = element.rqs2;
            rqs3.innerHTML = element.rqs3;
        }
    });
    if (flag == 0) {
        alert("Data not found/ Refresh the page/ Try with another keyword");
    } else {
        searchbox.value = ""
    }
}

const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

db.collection('123').get().then((maindata) => {
    const data = maindata.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));

    searchbtn.addEventListener('click', () => {
        searcheventHandler(data);
    });
    window.addEventListener('keydown', (event) => {
        if (event.keyCode == 13) {
            searcheventHandler(data);
        }

    }); 
});

db.collection('456').get().then (data => {
    data = data.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));
    currentEntry = data.length;
})


insbtn.addEventListener('click', () => {
    const inputEntry = {
            name: inputname.value,
            email: inputemail.value,
            comment: inputtext.value
        };

    if (inputEntry.name == ""
    || inputEntry.email == ""
    || inputEntry.comment == "") {
        alert("Please fill all the entries appropriately !");
        return;
    }

    const validateEmail = (email) => {
        return String(email)
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          );
      };

    const validateName = (name) => {
        return String(name)
            .match(/^([ \u00c0-\u01ffa-zA-Z'\-])+$/);
    }

    if (!validateName(inputEntry.name)) {
        alert("Name containing other words !");
        return;
    }

    if (!validateEmail(inputEntry.email)) {
        alert("Email containing other words !");
        return;
    }

    db.collection('456').doc((++currentEntry).toString()).set(inputEntry).then(() => {
        alert("Submitted");
    });

});