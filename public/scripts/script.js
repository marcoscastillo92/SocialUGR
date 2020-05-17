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
        e.style.display = hidden;
        document.getElementById('unfollow').style.display = visible;
        //e.className = "btn btn-danger btn-sm";
        //e.innerHTML = "Unfollow";
        //Acciones de seguir
        //window.location.href = '/follow/:username/:toUsername';
        
    }else{
        e.style.display = hidden;
        document.getElementById('follow').style.display = visible;
        //e.className = "btn btn-success btn-sm";
        //e.innerHTML = "Follow";
        //Acciones de dejar de seguir
        //window.location.href = '/unfollow/:username/:toUsername';
    }
}