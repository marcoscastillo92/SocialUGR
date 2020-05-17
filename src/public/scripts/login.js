function Oculta(){
    var comentarios = document.getElementById("registro")
    if (comentarios.style.visibility === 'visible') {
        comentarios.style.visibility = 'hidden'
    } else {
        comentarios.style.visibility = 'visible'
    }
}

function OcultarPasswdI() {
  var x = document.getElementById("passwordI");
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }
}

function OcultarPasswdR() {
  var x = document.getElementById("passwordR");
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }
}

var serviceURL = document.URL;

function EnviarIdentificacion(){
var usuario = document.getElementById("usuario").value;
var correo = document.getElementById("correo").value;
var password = document.getElementById("passwordI").value;

var httpRequest = new XMLHttpRequest();
httpRequest.onreadystatechange = function() {
	if( httpRequest.readyState === 4 ){
		var resultado = document.getElementById ("resul");
		resultado.innerHTML = httpRequest.responseText;
	}
};
httpRequest.open("GET", serviceURL, true);
httpRequest.send(null);
}
