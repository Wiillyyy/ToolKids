document.addEventListener("deviceready", onDeviceReady, false);

//--------------- Fonction OnDeviceReady ----------------------------------

function onDeviceReady(){
  screen.orientation.lock('portrait-primary');
  window.addEventListener("batterystatus", onBatteryStatus, false); 
  document.getElementById("cameraTakePicture").addEventListener("click", cameraTakePicture);
  document.getElementById("networkInfo").addEventListener("click", networkInfo);
  document.addEventListener("offline", onOffline, false);
  document.addEventListener("online", onOnline, false);
  document.getElementById("getOrientation").addEventListener("click", getOrientation);
  document.getElementById("watchOrientation").addEventListener("click", watchOrientation);
  document.getElementById("openBrowser").addEventListener("click", openBrowser);
  // document.addEventListener("backbutton", onBackKeyDown, false);
  document.addEventListener('deviceready', app.init, false);
  document.getElementById("fingerprint").addEventListener("click", fingerprint);

  document.getElementById("getLanguage").addEventListener("click", getLanguage);
  document.getElementById("getLocaleName").addEventListener("click", getLocaleName);
  document.getElementById("getDate").addEventListener("click", getDate);
  document.getElementById("getCurrency").addEventListener("click", getCurrency);
  console.log(navigator.globalization);
  // Plugin pour la date

  document.getElementById("createContact").addEventListener("click", createContact);
  document.getElementById("findContact").addEventListener("click", findContacts);
  document.getElementById("deleteContact").addEventListener("click", deleteContact);
  // Plugin pour les contact

document.getElementById("playAudio").addEventListener("click", playAudio);
document.getElementById("pauseAudio").addEventListener("click", pauseAudio);
document.getElementById("stopAudio").addEventListener("click", stopAudio);
document.getElementById("volumeUp").addEventListener("click", volumeUp);
document.getElementById("volumeDown").addEventListener("click", volumeDown);
// Plugin pour les audio
console.log(navigator.device.capture);
}
//-------------------------------- BACK BUTTON -----------------------------------------

// document.addEventListener("backbutton", function (e){
//   e.preventDefault();
//   location.href = "#d2";
// }, false);

// -------------------------- CAMERA -------------------------------

function cameraTakePicture() { 
  navigator.camera.getPicture(onSuccess, onFail, {  
     quality: 50, 
     destinationType: Camera.DestinationType.DATA_URL,
     saveToPhotoAlbum: true
  });  
  
  function onSuccess(imageData) { 
     var image = document.getElementById('myImage'); 
     image.src = "data:image/jpeg;base64," + imageData; 
  }  
  
  function onFail(message) { 
     alert('Failed because: ' + message); 
  } 
}

//-----------------------------Device ready-----------------------------------
document.addEventListener('deviceready', function(){
   onDeviceReady()
})

// ---------------------------- BATTERIE -------------------------------------

function onBatteryStatus(info) { 
   document.getElementById("battery").innerHTML ="Oulah on va s'amuser là il reste : " + info.level+" % de 📱";
}
 //----------------------------- GPS + MAP --------------------------------------

 const x = document.getElementById("div_id0");
 const y = document.getElementById("div_id1");
function supermap(){
if (navigator.geolocation) {
     navigator.geolocation.getCurrentPosition(showPosition);
   } else { 
     x.innerHTML = "Geolocation pas supporté bichette.";
}
 
function showPosition(position) {
   console.log("donnees geo", position);
   x.innerHTML = position.coords.latitude; 
   y.innerHTML = position.coords.longitude;
   var lat = document.getElementById("div_id0").innerHTML;
   var lng = document.getElementById("div_id1").innerHTML;
const zoomLevel = 12;

const map = L.map('map').setView([lat, lng], zoomLevel);
L.marker([lat, lng]).addTo(map);

const mainLayer = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiZXZhbmJyZyIsImEiOiJja3hldGdxd3EwcmVsMnBuNHkxd2I4N2QyIn0.rmtFDXfk-NwFWaM8E6edZA'
}).addTo(map); 

//------------------------------ MÉTÉO ----------------------------------------------------

// Le code météo est dans la "code" de map et gps, afin de recup les info de latitude et longitude 
var callBackGetSuccess = function(data) {
   console.log("donnees api", data)

   var desc = data['weather'][0]['description'];
   //alert(desc);
   var country = data['sys']['country'];
   //alert(country);

   var element = document.getElementById("meteo");
   element.innerHTML = data.main.temp + "°C - Le temps est " + desc;
   var lieu = document.getElementById("lieu");
   lieu.innerHTML = data.name + " - "+ country;
}

   var url = "https://api.openweathermap.org/data/2.5/weather?lat="+ lat +"&lon="+ lng +"&appid=a592e67268c195a7dbd6042eb3779d2d&units=metric&lang=fr"

   $.get(url, callBackGetSuccess).done(function() {
       //alert( "second success" );
     })
     .fail(function() {
       alert( "error" );
     })
     .always(function() {
       //alert( "finished" );
     });
}}


//--------------------- Page d'acceuill into la page Principale ------------------------

let togg1 = document.getElementById("togg1"); //selection des id des divs et bouttons
let togg2 = document.getElementById("togg2");
let togg3 = document.getElementById("togg3");
let d1 = document.getElementById("d1");
let d2 = document.getElementById("d2");
let d3 = document.getElementById("d3");
let idbody = document.getElementById("id_body");
togg1.addEventListener("click", () => {  // lors du clique passage en display none pour la première page et display block pour l'accueil
  if(getComputedStyle(d2).display != "block"){ //on fait disparaitre la première et apparaitre la page d'accueil
    d2.style.display = "block";     //ça nous évites de faire plusieurs fichiers html
  } else {
    d2.style.display = "none";
  }
})

function togg(){  //Cette fonction est liée à celle juste avant
  if(getComputedStyle(d1).display != "none"){
    d1.style.display = "none";
  } else {
    d1.style.display = "block";
  }
};
togg1.onclick = togg;



//------------------------------------------- NETWORK -----------------------------------------------

function networkInfo() {
  var networkState = navigator.connection.type;
  var states = {};
  states[Connection.UNKNOWN]  = 'Aucune connexion 🤔';
  states[Connection.ETHERNET] = 'Ethernet';
  states[Connection.WIFI]     = 'le WiFi, bien 👍';
  states[Connection.CELL_2G]  = 'la 2G';
  states[Connection.CELL_3G]  = 'la 3G';
  states[Connection.CELL_4G]  = 'la 4G';
  states[Connection.CELL]     = 'Connexion cellulaire';
  states[Connection.NONE]     = 'Aucune connexion 🤔';
  alert('Bravo mon petit ton téléphone utilise : ' + states[networkState]);
}

function onOffline() {
  alert('Oh bah zut maman elle a coupé la WiFi 😭');
}

function onOnline() {
  alert('Yes, le contrôle parental est parti tu peux jouer a la carte avec Dora 😎');
}

//------------------------------- VITESSE ----------------------------

const speed = document.querySelector('.speed');

navigator.geolocation.watchPosition((data) => {
 speed.textContent ="Vitesse : "+ Math.round(data.coords.speed) + " km/h";
});

//-------------------------------------- Navigateur -------------------------------------------

function openBrowser() {
 var url = 'https://m.kiddle.co/';
 var target = '_blank';
 var options = "location = yes"
 var ref = cordova.InAppBrowser.open(url, target, options);
 
 ref.addEventListener('loadstart', loadstartCallback);
 ref.addEventListener('loadstop', loadstopCallback);
 ref.addEventListener('loaderror', loaderrorCallback);
 ref.addEventListener('exit', exitCallback);

 function loadstartCallback(event) {
    console.log('Loading started: '  + event.url)
 }

 function loadstopCallback(event) {
    console.log('Loading finished: ' + event.url)
 }

 function loaderrorCallback(error) {
    console.log('Loading error: ' + error.message)
 }

 function exitCallback() {
    console.log('Browser is closed...')
 }
}

function openBrowser1() {
  var url = 'https://www.sesamestreet.org/';
  var target = '_blank';
  var options = "location = yes"
  var ref = cordova.InAppBrowser.open(url, target, options);
  
  ref.addEventListener('loadstart', loadstartCallback);
  ref.addEventListener('loadstop', loadstopCallback);
  ref.addEventListener('loaderror', loaderrorCallback);
  ref.addEventListener('exit', exitCallback);
 
  function loadstartCallback(event) {
     console.log('Loading started: '  + event.url)
  }
 
  function loadstopCallback(event) {
     console.log('Loading finished: ' + event.url)
  }
 
  function loaderrorCallback(error) {
     console.log('Loading error: ' + error.message)
  }
 
  function exitCallback() {
     console.log('Browser is closed...')
  }
 }

 function openBrowser2() {
  var url = 'https://www.coolmath.com/';
  var target = '_blank';
  var options = "location = yes"
  var ref = cordova.InAppBrowser.open(url, target, options);
  
  ref.addEventListener('loadstart', loadstartCallback);
  ref.addEventListener('loadstop', loadstopCallback);
  ref.addEventListener('loaderror', loaderrorCallback);
  ref.addEventListener('exit', exitCallback);
 
  function loadstartCallback(event) {
     console.log('Loading started: '  + event.url)
  }
 
  function loadstopCallback(event) {
     console.log('Loading finished: ' + event.url)
  }
 
  function loaderrorCallback(error) {
     console.log('Loading error: ' + error.message)
  }
 
  function exitCallback() {
     console.log('Browser is closed...')
  }
 }



//----------------------------------------------- LOCAL STORAGE pour le Prenom-----------------------------------

function changerNom(){
  prenom = window.prompt('Mon petit comment tu t\'appelles ?');
  localStorage["prenom"] = prenom;
  alert("Super, vous avez changé de nom !");
}

if(localStorage.getItem('prenom') == ""){
  localStorage.removeItem('prenom');
}else{
// 
}

const titre = document.getElementById('bjr')
if (localStorage.getItem('prenom') != null){
  titre.textContent = "Salut, "+ localStorage.prenom + " 😆";
}else{
  titre.textContent = "Salut !";
}

//--------------------fingerprint-----------------------------

function fingerprint() {
  Fingerprint.show(
    {
      description: "Met ton emprunte, gamin",
    },
    successCallback,
    errorCallback
  );

  function successCallback() {
    alert("Bravo tu as réussi à te connecter petit");
    window.open("index1.html");
  }

  function errorCallback(error) {
    alert("Mauvais doigt ou lâche le téléphone de ton copain");
  }
  console.log("fingerprint");
}


//--------------------Date-----------------------------


function getDate() {
  var date = new Date();

  var options = {
     formatLength:'short',
     selector:'date and time'
  }
  navigator.globalization.dateToString(date, onSuccess, onError, options);

  function onSuccess(date) {
     alert(`La date du jour est : ${date.value}`);
  }

  function onError(){
     alert('Error getting dateString');
  }
}

// ============================  Contact ======================================

function createContact() {
  var myContact = navigator.contacts.create({"displayName": prompt("Oh tu t'es fait un nouvel ami ? C'est quoi son prénom :")});
  myContact.save(contactSuccess, contactError);
   
  function contactSuccess() {
     alert("Bravoo tu as un nouvel ami 🧑🏻‍🤝‍🧑🏻");
  }
   
  function contactError(message) {
     alert('Oh nooon :(' + message);
  }
}

function findContacts() {
  var options = new ContactFindOptions();
  options.filter = "";
  options.multiple = true;
  fields = ["displayName"];
  navigator.contacts.find(fields, contactfindSuccess, contactfindError, options);
   
  function contactfindSuccess(contacts) {
     for (var i = 0; i < contacts.length; i++) {
        alert("Nom de ton ami =" + JSON.stringify(contacts[i].displayName));
     }
  }
   
  function contactfindError(message) {
     alert('Failed because: ' + message);
  }
   
}

function deleteContact() {
  var options = new ContactFindOptions();
  options.filter = prompt("Tu t'es faché avec quelqu'un ? Quel est son prénom ?");
  options.multiple = false;
  fields = ["displayName"];
  navigator.contacts.find(fields, contactfindSuccess, contactfindError, options);

  function contactfindSuccess(contacts) {
     var contact = contacts[0];
     contact.remove(contactRemoveSuccess, contactRemoveError);

     function contactRemoveSuccess(contact) {
        alert("Méchant, ami, méchant, IL DÉGAGE ❌ !");
     }

     function contactRemoveError(message) {
        alert('Failed because: ' + message);
     }
  }

  function contactfindError(message) {
     alert('Failed because: ' + message);
  }
}

var myMedia = null;
function playAudio() {
   var src = "../audio/audio1.mp3";

   if(myMedia === null) {
      myMedia = new Media(src, onSuccess, onError);

      function onSuccess() {
         console.log("playAudio Success");
      }

      function onError(error) {
         console.log("playAudio Error: " + error.code);
      }
   }
   myMedia.play();
}

function pauseAudio() {
  if(myMedia) {
     myMedia.pause();
  }
}

function stopAudio() {
  if(myMedia) {
     myMedia.stop(); 
  }
  myMedia = null;
}