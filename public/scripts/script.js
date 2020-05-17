function toggleSearch(e){
    var element = document.getElementById(e);
    if(element.style.display == "none"){
        element.style.display = "inline-block"
    }else{
        element.style.display = "none"
    }
}

function sendSearch(e){
    if(e.keyCode == 13){
        var value = document.getElementById("cuadroBusqueda").value;
        console.log(value);
        //Consulta MONGODB para busqueda de usuarios
    }
}

function toggleFollow(e){
    if(e.innerHTML == "Follow"){
        e.className = "btn btn-danger btn-sm";
        e.innerHTML = "Unfollow";
        //Acciones de seguir
    }else{
        e.className = "btn btn-success btn-sm";
        e.innerHTML = "Follow";
        //Acciones de dejar de seguir
    }
}