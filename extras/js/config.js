$(document).ready(function(){	
	//Para que arranque dentro del input
	$("#input").focus();

    //Esto al hacer la busqueda
    $("#formulario").submit(function(e){
       //Detengo el envío del form para hacer lo que yo quiero
       e.preventDefault(); 

       //Poniendo a la vista el nombre del usuario buscado debajo
       let contenidoDelInput = $(input).val();
       $("#nombreUsuarioBuscado").text(contenidoDelInput);

       //Reseteando el input y volviendolo a seleccionar
       $("#input").val("");
       $("#input").focus();    

       //Trayendo la info del usuario
       buscarUsuario(contenidoDelInput);       
    });	

    //Se deshabilita y habilita el botón de Buscar si el input esta vacio o no
    $('#input').keyup(function() {

        //Remuevo automaticamente los espacios
        $(this).val($(this).val().replace(/\s/g, ''));
        

        var empty = false;
        $('#input').each(function() {
            if ($(this).val() == 0) {
                empty = true;
            }
        });

        if (empty) {
            $('#boton').attr('disabled', 'disabled');
            $("#boton").removeClass("btn-primary");
            $("#boton").addClass("btn-secondary");
        } else {
            $('#boton').removeAttr('disabled');
            $("#boton").removeClass("btn-secondary");
            $("#boton").addClass("btn-primary");            
        }
    });                    

    function buscarUsuario(input){
    	let apiURL = 'https://api.github.com/search/users?q="' + input + '"';
	    $.ajax({
	        url: apiURL,
	        contentType: "application/json",
	        dataType: "json",
	        success: function(result){
	        	$("#totalUsuariosEncontrados").text(result["total_count"]);
	        	
	        	//Si se encontro uno solo, se muestra todo, incluyendo score y avatar
	        	$(".extraDesc").removeClass("d-none");
	        	if(result["total_count"] == 1){
	        		$("#scoreUsuario").text(result.items[0].score.toFixed(3));
	        		let linkRepo = result.items[0].html_url;
	        		$("#linkRepositorio").empty().append('<a href="' + linkRepo + '">' + 
	        			linkRepo + '</a>');
	        		$('#avatarUsuario').empty().append('<img class="img-thumbnail img-fluid" src="' + 
	        			result.items[0].avatar_url + '" alt="Imagen del user buscado">');	
	        	
	        	//Si hay N usuarios o ninguno, no se muestran las siguientes cosas
	        	}else{
	        		$(".extraDesc").addClass("d-none");
	        		$("#scoreUsuario").text("");
	        		$("#linkRepositorio").text("");
	        		$('#avatarUsuario').empty();
	        	}	        	
	        },
	        error: function(xhr, ajaxOptions, thrownError){
	        	alert("No se pudo realizar la busqueda. Error: " + xhr.status);
	        }
	    });
	    }
});