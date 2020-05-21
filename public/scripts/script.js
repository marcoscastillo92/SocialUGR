$(document).ready(function(){
    $('.like_form').submit(function(event){
        /* Evitar acciones por defecto, como la redirección al php */
        event.preventDefault();

        /* Obtengo la acción(path al php) y el método (post) */
        var data = $(this).serialize()
        console.log(data);
        var idPost = $(this).serializeArray()[2].value 
        var url = $(this).serializeArray()[3].value 
        var idLikesContador = 'num_likes_'+$(this).serializeArray()[0].value 
        var urlNext = 'url_'+ $(this).serializeArray()[0].value 
        console.log(idPost + " -- " + url + " -- " + urlNext + " -- " 
            + $(this).serializeArray()+" -- " +idLikesContador 
            + " -- " + $(this).serializeArray()[0].value );
        console.log($(this).serializeArray())
        console.log($(this).serialize())
        $.ajax({
            url: url,
            type: 'POST',
            //Para enviar los campos con un nombre y que tienen contenido
            data: $(this).serialize(), 
            beforeSend: function(){
                // console.log($(this).serialize())
            },
            success: function(response){
                console.log(response)
                if(response.action=='insert'){
                    document.getElementById(idPost).src = '../imgs/heart.png'
                    document.getElementById(urlNext).value = '/eliminar-like'
                    var num = parseInt(document.getElementById(idLikesContador).innerHTML)
                    console.log("LIKES -> " + num)
                    document.getElementById(idLikesContador).innerHTML = (num+1) + " Me gusta"
                }else{
                    var num = parseInt(document.getElementById(idLikesContador).innerHTML)
                    document.getElementById(urlNext).value = '/subir-like'
                    console.log("LIKES -> " + num)
                    document.getElementById(idLikesContador).innerHTML = num-1 + " Me gusta"
                    document.getElementById(idPost).src = '../imgs/like.png'
                }
            }
        })
    })

    $('.new_comment_form').submit(function(event){
        /* Evitar acciones por defecto, como la redirección al php */
        event.preventDefault();

        /* Obtengo la acción(path al php) y el método (post) */
        var url = $(this).attr('action');
        var type = $(this).attr('method');
        console.log($(this).serializeArray())
        var idPost = $(this).serializeArray()[1].value 
        var idLastComment = $(this).serializeArray()[3].value 
        var idTextComment = 'text_comment_'+idPost;
        var idContador = 'num_comments_'+idPost;
        // var idCommentSection = 'comments_section_'+idPost;
        var data = $(this).serialize();
            $.ajax({
                url: url,
                type: type,
                //Para enviar los campos con un nombre y que tienen contenido
                data: data, 
                beforeSend: function(){
                    // console.log(data)
                },
                success: function(response){
                    console.log("Respuesta-> "+response)
                    var num = parseInt(document.getElementById(idContador).innerHTML)
                    document.getElementById(idContador).innerHTML = (num+1) + " Comentarios"
                    document.getElementById(idTextComment).value = ""
                    var date = new Date()
                    console.log('Tiempo.> ' + date.getTime() + " -- " + response.date)
                    document.getElementById(idLastComment).innerHTML += "<p><strong>"
                        +response.username+": </strong> "+response.comment+"<br><span id='date'><em>"
                        +timeDifference(date.getTime(), response.date)+"</em></span></p>"
                    // <p><strong><%= comment.username %>: </strong> <%= comment.comment %><br><span id="date"><%= comment.date %></span></p> 
                }
            })
    })

    $('.image_comment_form').submit(function(event){
        /* Evitar acciones por defecto, como la redirección al php */
        event.preventDefault();

        /* Obtengo la acción(path al php) y el método (post) */
        var idCommentDiv = $(this).serializeArray()[0].value 
        document.getElementById(idCommentDiv).style.display = 'block'
    })
});


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
        e.innerHTML = "Unfollow";
        e.style.backgroundColor = "red";
        //FOLLOW ACTIONS
    }else{
        e.innerHTML = "Follow";
        e.style.backgroundColor = "green";
        //UNFOLLOW ACTIONS
    }
}

/* Bloques JS */

function initialize(){
    var appBanners = document.getElementsByClassName('comments_div');
    for (var i = 0; i < appBanners.length; i ++) {
        appBanners[i].style.display = 'none';
    }
}

window.onload = initialize

/* Bloques JS */