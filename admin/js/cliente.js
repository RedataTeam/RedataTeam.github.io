


let clientes = [
    {
        IdClente: 1,
        ClaveCliente: "FLM34",
        Nombre: "Valentin",
        PrimerApellido: "Florez",
        SegundoApellido: "Martinez",
        Genero: "Masculino",
        RFC: "FOMV220831UQ4",
        telefonoMovil: 4723849375,
        telefonoCasa: 4308003192,
        Email: "Valent45@gmail.com"
   
    },

    {
           IdClente: 2,
       ClaveCliente: "FLM34",
        Nombre: "Ricardo",
        PrimerApellido: "Sibaja",
        SegundoApellido: "Achalhi",
        Genero: "Masculino",
        RFC: "SIAR010227LK0",
        telefonoMovil: 4773843675,
        telefonoCasa:  8484775730,
        Email: "Ri34@gmail.com"
      
    },

    {
           IdClente: 3,
         ClaveCliente: "FLM34",
        Nombre: "Beltane",
        PrimerApellido: "Ruperto",
        SegundoApellido: "Limachi",
        Genero: "Masculino",
        RFC: "RULB000628U49",
        telefonoMovil: 4778927465,
        telefonoCasa: 5350229521,
        Email: "Beltn@hotmail.com"
    }
];

/**
 * Esta funcion llena una tabla HTML
 * a partir del arreglo de accesorios.
 */

function fillTable() {
    let contenido = '';
    //Recorremos el arreglo:
    for (let i = 0; i < clientes.length; i++) {
        //Generamos el contenido de forma dinamica:
        contenido = contenido + '<tr>' +
                
                '<td>' + clientes[i].Nombre + '</td>' +
                '<td>' + clientes[i].PrimerApellido + '</td>' +
                '<td>' + clientes[i].SegundoApellido + '</td>' +
                '<td>' + clientes[i].Genero + '</td>' +
                '<td>' + clientes[i].RFC + '</td>' +
                '<td>' + clientes[i].telefonoMovil + '</td>' +
                '<td>' + clientes[i].telefonoCasa + '</td>' +
                '<td>' + clientes[i].Email + '</td>' +
                '<td><a href="#" title="Modificar" onclick="cm.mostrarDetalleCliente(' + clientes[i].idCliente + ');"><img src="../media/editar.png" width="30px" height="30px" alt="alt"/></a></td>' +
                '<td><a id="basura" href="#" title="Eliminar" onclick="cm.remove(' + clientes[i].idCliente + ');"><img src="../media/eliminar_icon.png" width="30px" height="30px" alt="alt"/></a></td>' + '</tr>';
    }
    document.getElementById("tbodyClientes").innerHTML = contenido;
}


export function save() {
    //Declaramos una variable temporal para saber la posicion del accesorio}
    let pos = -1;

    //Definimos un objeto con los atributos y valores del accesorio
    let cliente = {
        IdClente: 0,
        ClaveCliente: 0,
        Nombre: document.getElementById("txtNombre").value,
        PrimerApellido: document.getElementById("txtPA").value,
        SegundoApellido: document.getElementById("txtSA").value,
        Genero: document.getElementById("txtGenero").value,
        RFC: document.getElementById("txtRFC").value,
        telefonoMovil: parseFloat(document.getElementById("txtTM").value),
        telefonoCasa: parseFloat(document.getElementById("txtTC").value),
        Email: document.getElementById("txtCorreo").value
    };

    //Revisamos si hay algun valor en la caja de texto del id accesorio
    if (document.getElementById("txtID").value.trim() === '') {
        //Generamos un id para el accesorio a partir de los milisegundos de la fecha actual
        
        cliente.ClaveCliente = Date.now();
    cliente.idCliente = Date.now() + 1;

        //Insertamos el accesorio al final del arreglo
        clientes[clientes.length] = cliente;

        //Colocamos los ids generados en las cajas de texto para evitar duplicados
        document.getElementById("txtIdCliente").value = cliente.ClaveCliente;
        document.getElementById("txtID").value = cliente.idCliente;

        //Mostramos un mensaje al usuario
        alertarGuardarRegistro();
        //Llenamos la tabla
        fillTable();
        setDetalleVisible(false);
        limpiarFormularioDetalle();
    } else {
        //Si accesorio ya tiene un id, lo tomamos para actualizar sus datos
        cliente.ClaveCliente = parseInt(document.getElementById("txtIdCliente").value);
    cliente.idCliente = parseInt(document.getElementById("txtID").value);
        //Buscamos la posicion del objeto
            pos = buscarPosicionClientePorId(cliente.idCliente);
        if (pos >= 0) {
            //Reemplazamos el objeto en la posicion encontrada
            clientes[pos] = cliente;
            //mostramos un mensaje al usuario
            alertarGuardarModificar();
            //Actualizaos la tabla
            fillTable();
            setDetalleVisible(false);
            limpiarFormularioDetalle();
        } else {
            alertarError();
        }
    }
}

export function remove(idCliente) {
    let pos = buscarPosicionClientePorId(idCliente);

    if (pos >= 0) {
        Swal.fire({
            title: '¿Está seguro de\n\eliminar este registro?',
            icon: 'warning',
            showCancelButton: true,
            cancelButtonColor: '#d33',
            confirmButtonColor: '#31BFDF',
            confirmButtonText: 'Eliminar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                clientes.splice(pos, 1);
                fillTable();
                Swal.fire({
                    icon: 'success',
                    title: 'SE ELIMINÓ\n\EXITOSAMENTE',
                    showConfirmButton: false,
                    timer: 2000
                });
            } else
                Swal.fire({
                    icon: 'error',
                    title: 'ACCIÓN CANCELADA',
                    showConfirmButton: false,
                    timer: 2000
                });
        });
    } else { //Esto no deberia suceder
        alertarError();
    }
}


export function limpiar_mostrarDetalle() {
    limpiarFormularioDetalle();
    setDetalleVisible(true);
}


/**
 * Muestra u oculta el panel de detalles del accesorio.
 */
export function setDetalleVisible(valor)
{
    //Si valor es verdadero, mostramos el panel de
    //detalles y ocultamos el panel del catalogo
    if (valor === true)
    {
        document.getElementById("divDetalle").style.display = "";
        document.getElementById("divCatalogo").style.display = "none";
    } else
    {
        document.getElementById("divDetalle").style.display = "none";
        document.getElementById("divCatalogo").style.display = "";
        limpiarFormularioDetalle();
    }
}

//Funcion para inicializar el modulo.
export function inicializar()
{
    setDetalleVisible(false);
    //Refrescamos la tabla del catalogo:
    fillTable();
}

export function limpiarFormularioDetalle() {
     document.getElementById("txtID").value = "";
    document.getElementById("txtIdCliente").value = "";
    document.getElementById("txtNombre").value = "";
    document.getElementById("txtPA").value = "";
    document.getElementById("txtSA").value = "";
    document.getElementById("txtGenero").value = "";
    document.getElementById("txtRFC").value = "";
    document.getElementById("txtTM").value = "";
    document.getElementById("txtTC").value = "";
    document.getElementById("txtCorreo").value = "";
}

export function mostrarDetalleCliente(idCliente) {
    let pos = buscarPosicionClientePorId(idCliente);
    //Buscamos la posicion de accesorio
    //Revisamos que sea válida
    if (pos >= 0) {

        //limpiamos el formulario
        limpiarFormularioDetalle();
        //Llenamos el formulario con los datos del accesorio
    document.getElementById("txtID").value = clientes[pos].idCliente;   
    document.getElementById("txtIdCliente").value = clientes[pos].ClaveCliente;    
    document.getElementById("txtNombre").value = clientes[pos].Nombre;
    document.getElementById("txtPA").value = clientes[pos].PrimerApellido;
    document.getElementById("txtSA").value = clientes[pos].SegundoApellido;
    document.getElementById("txtGenero").value = clientes[pos].Genero;
    document.getElementById("txtRFC").value = clientes[pos].RFC;
    document.getElementById("txtTM").value = clientes[pos].telefonoMovil;
    document.getElementById("txtTC").value = clientes[pos].telefonoCasa;
    document.getElementById("txtCorreo").value = clientes[pos].Email;
   
      

        //Mostramos el formulario con loos detalles del accesorio
        setDetalleVisible(true);
    } else //Esto no deberia suceder
        alertarNoEncontrado();
}

//Buscamos la posicion del Accesorio por su id
function buscarPosicionClientePorId(id) {
    for (let i = 0;
    i < clientes.length; i++) {
        //Comparamos el id que se busca con el id del accesorio en la posicion actual
        if (clientes[i].idCliente === id)
            return i; //Devolvemos la posicion del id buscados
    }
    //Si llegamos hasta este punto significa que no encontramos un accesorio con ese id y devolvemos -1.
    return -1;
}