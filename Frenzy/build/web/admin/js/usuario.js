function save() {

    let datos = null;
    let params = null;
    let usuario = new Object(); //Creamos una variable llamada empleado de tipo objeto
    usuario.persona = new Object();


//Datos persona
    usuario.persona.nombre = document.getElementById("nombre").value;
    usuario.persona.primerApellido = document.getElementById("primerApellido").value;
    usuario.persona.segundoApellido = document.getElementById("segundoApellido").value;
    usuario.persona.fechaNacimiento = document.getElementById("fechaNacimiento").value;
    usuario.persona.identificacion = "";
    usuario.persona.telMovil = document.getElementById("telMovil").value;
    usuario.persona.correo = document.getElementById("email").value;
    usuario.persona.ciudad = document.getElementById("ciudad").value;
    usuario.persona.estado = document.getElementById("estado").value;
    usuario.persona.fotografia = getBase64();
    usuario.nombre = document.getElementById("nombreUsuario").value;
    usuario.contrasenia = document.getElementById("contrasenia").value;
    
    datos = {
        datosUsuario: JSON.stringify(usuario)
    };
    params = new URLSearchParams(datos);
    fetch("api/usuario/save",
            {
                method: "POST",
                headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'},
                body: params
            })
            .then(response => {
                return response.json();
            })
            .then(function (data) {
                if (data.exception != null) {
                    alert("error del servidor");
                    return;
                }

                //document.getElementById("txtNumeroUnic").value = empleado.usuario.numeroUnico;
                //Swal.fire('', 'Datos del empleado actualizados correctamente', 'sucess');
                limpiarFormularioDetalle();
                setDetalleVisible(false);
                refrescarTabla();
            });
}

function getBase64() {
    var file = document.getElementById("fotografia").files[0];
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
        alert(reader.result);
        document.getElementById("imgFoto").src = reader.result;
        console.log(reader.result);
        let foto = reader.result.toString();
        return foto;
    };
    reader.onerror = function (error) {
        console.log('Error: ', error);
    };
}
