$(document).ready(function(){	
	//Para que arranque dentro del input
	$("#input").focus();

    //Esto al hacer la busqueda
    $("#formulario").submit(function(e){
       //Detengo el envío del form para hacer lo que yo quiero
       e.preventDefault(); 

       //Poniendo a la vista el nombre del usuario buscado debajo
       var contenidoDelInput = $(input).val();
       $("#nombreUsuarioBuscado").text(contenidoDelInput);

       //Reseteando el input y volviendolo a seleccionar
       $("#input").val("");
       $("#input").focus();    

       //Trayendo la info del usuario
       buscarUsuario(contenidoDelInput);       
    });	

    /*To Do
		- Mejorar estilos
		- Agregar código HTTP en el error
		- Hacer que los mensajes aparezcan o desaparezcan
		- Botón desactivado si no hay input
		- Mostrar info completa si se trajo a 1 usuario solo. Mas no
    */
    function buscarUsuario(input){
    	var apiURL = 'https://api.github.com/search/users?q="' + input + '"';
	    $.ajax({
	        url: apiURL,
	        contentType: "application/json",
	        dataType: "json",
	        success: function(result){
	        	$("#totalUsuariosEncontrados").text(result["total_count"]);
	        	if(result["total_count"] == 0){
	        		$("#scoreUsuario").text("");
	        		$("#avatarUsuario").text("");
	        		$("#linkRepositorio").text("");
	        	}	
	        	else if(result["total_count"] == 1){
	        		$("#scoreUsuario").text(result.items[0].score);
	        		var linkRepo = result.items[0].html_url;
	        		$("#linkRepositorio").empty().append('<a href="' + linkRepo + '">' + 
	        			linkRepo + '</a>');
	        		$('#avatarUsuario').empty().append('<img class="img-thumbnail img-fluid" src="' + 
	        			result.items[0].avatar_url + '" alt="Imagen del user buscado">');	
	        	}else{
	        		$("#scoreUsuario").text("");
	        		$("#linkRepositorio").text("");
	        	}	        	
	        },
	        error: function(){
	        	alert("No se pudo realizar la busqueda. Fallo en AJAX");
	        }
	    });
	    }
});