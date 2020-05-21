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