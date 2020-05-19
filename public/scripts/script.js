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
        /profile/value
    }
}

function toggleFollow(e){
    if(e.innerHTML == "Follow"){
        e.innerHTML = "Unfollow";
        e.style.backgroundColor = "red";
        //FOLLOW ACTIONS
    }else{
        e.innerHTML = "Follow";
        e.style.backgroundColor = "green";
        //UNFOLLOW ACTIONS
    }
}