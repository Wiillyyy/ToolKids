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
  document.addEventListener("backbutton", onBackKeyDown, false);
  document.addEventListener('deviceready', app.init, false);
  document.getElementById("fingerprint").addEventListener("click", fingerprint);
}
//-------------------------------- BACK BUTTON -----------------------------------------

document.addEventListener("backbutton", function (e){
  e.preventDefault();
  location.href = "#d2";
}, false);

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

//------------------------------------------------------------------------------------

document.addEventListener('deviceready', function(){
   onDeviceReady()
})

// ---------------------------- BATTERIE -------------------------------------

function onBatteryStatus(info) { 
   document.getElementById("battery").innerHTML = info.level+" %";
}
 //----------------------------- GPS + MAP --------------------------------------

 const x = document.getElementById("div_id0");
 const y = document.getElementById("div_id1");
function supermap(){
if (navigator.geolocation) {
     navigator.geolocation.getCurrentPosition(showPosition);
   } else { 
     x.innerHTML = "Geolocation is not supported by this browser.";
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

// !!!! Le code météo est dans la "code" de map et gps, afin de recup les info de lat et lng 
var callBackGetSuccess = function(data) {
   console.log("donnees api", data)

   var desc = data['weather'][0]['description'];
   //alert(desc);
   var country = data['sys']['country'];
   //alert(country);

   var element = document.getElementById("meteo");
   element.innerHTML = data.main.temp + "°C - " + desc;
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


//--------------------- Change Wallpaper / page ------------------------

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

//-------------- Accueil -> more... -----------------

togg2.addEventListener("click", () => {  // lors du clique passage en display none pour la première page et display block pour l'accueil
   if(getComputedStyle(d3).display != "block"){ //on fait disparaitre la première et apparaitre la page d'accueil
     d3.style.display = "block";     //ça nous évites de faire plusieurs fichiers html
   } else {
     d3.style.display = "none";
   }
 })
 
 function toggv2(){  //Cette fonction est liée à celle juste avant
   if(getComputedStyle(d2).display != "none"){
     d2.style.display = "none";
   } else {
     d2.style.display = "block";
   }
 };
 togg2.onclick = toggv2;

//------------- more... -> Accueil ---------------------

togg3.addEventListener("click", () => {  // lors du clique passage en display none pour la première page et display block pour l'accueil
   if(getComputedStyle(d2).display != "block"){ //on fait disparaitre la première page et apparaitre la page d'accueil
     d2.style.display = "block";     //ça nous évites de faire plusieurs fichiers html
   } else {
     d2.style.display = "none";
   }
 })
 
 function toggv3(){  //Cette fonction est liée à celle juste avant
   if(getComputedStyle(d3).display != "none"){
     d3.style.display = "none";
   } else {
     d3.style.display = "block";
   }
 };
 togg3.onclick = toggv3;

const changebtn = document.querySelector(".btn");  //passage du fond dégradé sur fond blanc
changebtn.addEventListener("click", ()=>{
   const body = document.body;
   body.style.background = "#1d3557";
})

//------------------------------------------- NETWORK -----------------------------------------------

function networkInfo() {
  var networkState = navigator.connection.type;
  var states = {};
  states[Connection.UNKNOWN]  = 'Inconnue';
  states[Connection.ETHERNET] = 'Ethernet';
  states[Connection.WIFI]     = 'WiFi';
  states[Connection.CELL_2G]  = '2G';
  states[Connection.CELL_3G]  = '3G';
  states[Connection.CELL_4G]  = '4G';
  states[Connection.CELL]     = 'Cell generic connection';
  states[Connection.NONE]     = 'Aucune connexion';
  alert('Type de connexion: ' + states[networkState]);
}

function onOffline() {
  alert('Vous êtes maintenant hors-ligne!');
}

function onOnline() {
  alert('Vous êtes maintenant en ligne!');
}

//------------------------------- VITESSE ----------------------------

const speed = document.querySelector('.speed');

navigator.geolocation.watchPosition((data) => {
 speed.textContent ="Vitesse : "+ Math.round(data.coords.speed) + " km/h";
});

//------------------------------- PODOMETRE ---------------------------

const podometre = document.querySelector('.podometre');
const calorie = document.querySelector('.calorie');
let app = {

 init: function() {

   pedometer.isStepCountingAvailable(function(){
       //alert(""Data available);
   }, function(){
       alert( "Le compteur n'est pas disponible sur votre appareil");
   });

   let successHandler = function (pedometerData) {

      //alert(pedometerData.numberOfSteps);
      podometre.textContent = "Nombre de pas : "+pedometerData.numberOfSteps;
      calorie.textContent = "Calorie brulé :" + pedometerData.numberOfSteps * 0.04 + "kcal";

   };
   pedometer.startPedometerUpdates(successHandler, onError);

   function onError(etext) {
      alert("error="+JSON.stringify(etext));
   };
 },
}

//--------------------------------- ORIENTATION -----------------------------
const JeSuisOu = document.querySelector('.jesuisou');
function getOrientation() {
 navigator.compass.getCurrentHeading(compassSuccess, compassError);

 function compassSuccess(heading) {
    //alert('Orientation: ' + heading.magneticHeading+"°");
    JeSuisOu.textContent = 'Orientation: ' + Math.round(heading.magneticHeading)+"°";
 };

 function compassError(error) {
    alert('CompassError: ' + error.code);
 };
}

function watchOrientation(){
 var compassOptions = {
    frequency: 3000
 }
 var watchID = navigator.compass.watchHeading(compassSuccess, 
    compassError, compassOptions);

 function compassSuccess(heading) {
    alert('Heading: ' + heading.magneticHeading);

    setTimeout(function() {
       navigator.compass.clearWatch(watchID);
    }, 10000);
 };

 function compassError(error) {
    alert('CompassError: ' + error.code);
 };
}

//-------------------------------------- BROWSER -------------------------------------------

function openBrowser() {
 var url = 'https://www.annecyguidesmontagne.com/';
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

//----------------------------------------------- LOCAL STORAGE -----------------------------------

function changerNom(){
  Nom = window.prompt('Entre votre nouveau prénom :');
  localStorage["prenom"] = Nom;
  alert("Merci de redémarrer l'application pour que le changement prenne effet");
}

if(localStorage.getItem('prenom') == ""){
  localStorage.removeItem('prenom');
}else{
//j'avais envie de mettre un else  
}

const titre = document.getElementById('bjr')
if (localStorage.getItem('prenom') != null){
  titre.textContent = "Bonjour, "+ localStorage.prenom + " !";
}else{
  titre.textContent = "Bonjour !";
}

//-------------------------------------------------

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