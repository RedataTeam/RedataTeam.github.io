//Es un arreglo
let empleados = [
    {
        IdEmpleado: 1,
        ClaveEmpleado: "PER13",
        Nombre: "Patricia",
        PrimerApellido: "Perez",
        SegundoApellido: "Rocha",
        Genero: "Femenino",
        RFC: "PRP4520831G64",
        telefonoMovil: 4774569675,
        telefonoCasa: 524308003192,
        Email: "PatY34@gmail.com"

    },

    {
        IdEmpleado: 2,
        ClaveEmpleado: "COT67",
        Nombre: "Fernando",
        PrimerApellido: "Torres",
        SegundoApellido: "Camarillo",
        Genero: "Masculino",
        RFC: "FGT45465351F48",
        telefonoMovil: 4729580485,
        telefonoCasa: 527483967325,
        Email: "fERNADN@hotmail.com"

    },

    {
        IdEmpleado: 3,
        ClaveEmpleado: "LIG78",
        Nombre: "Luis",
        PrimerApellido: "Lizama",
        SegundoApellido: "Godinez",
        Genero: "Masculino",
        RFC: "LG5728DJ5951",
        telefonoMovil: 472758395,
        telefonoCasa: 524573857435,
        Email: "LU678@gmail.com"
    }
];

/**
 * Esta funcion llena una tabla HTML
 * a partir del arreglo de accesorios.
 */

function fillTable() {
    let contenido = '';
    //Recorremos el arreglo:
    for (let i = 0; i < empleados.length; i++) {
        //Generamos el contenido de forma dinamica:
        contenido = contenido + '<tr>' +
                '<td>' + empleados[i].Nombre + '</td>' +
                '<td>' + empleados[i].PrimerApellido + '</td>' +
                '<td>' + empleados[i].SegundoApellido + '</td>' +
                '<td>' + empleados[i].Genero + '</td>' +
                '<td>' + empleados[i].RFC + '</td>' +
                '<td>' + empleados[i].telefonoMovil + '</td>' +
                '<td>' + empleados[i].telefonoCasa + '</td>' +
                '<td>' + empleados[i].Email + '</td>' +
                '<td><a href="#" title="Modificar" onclick="cm.mostrarDetalleEmpleado(' + empleados[i].idEmpleado + ');"><img src="../media/editar.png" width="30px" height="30px" alt="alt"/></a></td>' +
                '<td><a id="basura" href="#" title="Eliminar" onclick="cm.remove(' + empleados[i].idEmpleado + ');"><img src="../media/eliminar_icon.png" width="30px" height="30px" alt="alt"/></a></td>' + '</tr>';
    }
    document.getElementById("tbodyClientes").innerHTML = contenido;
}


export function save() {
    //Declaramos una variable temporal para saber la posicion del accesorio}
    let pos = -1;

    //Definimos un objeto con los atributos y valores del accesorio
    let empleado = {
        IdEmpleado: 0,
        ClaveEmpleado: 0,
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

        empleado.ClaveEmpleado = Date.now();
        empleado.idEmpleado = Date.now() + 1;

        //Insertamos el accesorio al final del arreglo
        empleados[empleados.length] = empleado;

        //Colocamos los ids generados en las cajas de texto para evitar duplicados
        document.getElementById("txtIdEmpleado").value = empleado.ClaveEmpleado;
        document.getElementById("txtID").value = empleado.idEmpleado;

        //Mostramos un mensaje al usuario
        alertarGuardarRegistro();
        //Llenamos la tabla
        fillTable();
        setDetalleVisible(false);
        limpiarFormularioDetalle();
    } else {
        //Si accesorio ya tiene un id, lo tomamos para actualizar sus datos
        empleado.ClaveEmpleado = parseInt(document.getElementById("txtIdEmpleado").value);
        empleado.idEmpleado = parseInt(document.getElementById("txtID").value);
        //Buscamos la posicion del objeto
        pos = buscarPosicionEmpleadoPorId(empleado.idEmpleado);
        if (pos >= 0) {
            //Reemplazamos el objeto en la posicion encontrada
            empleados[pos] = empleado;
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

export function remove(idEmpleado) {
    let pos = buscarPosicionEmpleadoPorId(idEmpleado);

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
                empleados.splice(pos, 1);
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
    document.getElementById("txtIdEmpleado").value = "";
    document.getElementById("txtNombre").value = "";
    document.getElementById("txtPA").value = "";
    document.getElementById("txtSA").value = "";
    document.getElementById("txtGenero").value = "";
    document.getElementById("txtRFC").value = "";
    document.getElementById("txtTM").value = "";
    document.getElementById("txtTC").value = "";
    document.getElementById("txtCorreo").value = "";
}

export function mostrarDetalleEmpleado(idEmpleado) {
    let pos = buscarPosicionEmpleadoPorId(idEmpleado);
    //Buscamos la posicion de accesorio
    //Revisamos que sea válida
    if (pos >= 0) {

        //limpiamos el formulario
        limpiarFormularioDetalle();
        //Llenamos el formulario con los datos del accesorio
        document.getElementById("txtID").value = empleados[pos].idEmpleado;
        document.getElementById("txtIdEmpleado").value = empleados[pos].ClaveEmpleado;
        document.getElementById("txtNombre").value = empleados[pos].Nombre;
        document.getElementById("txtPA").value = empleados[pos].PrimerApellido;
        document.getElementById("txtSA").value = empleados[pos].SegundoApellido;
        document.getElementById("txtGenero").value = empleados[pos].Genero;
        document.getElementById("txtRFC").value = empleados[pos].RFC;
        document.getElementById("txtTM").value = empleados[pos].telefonoMovil;
        document.getElementById("txtTC").value = empleados[pos].telefonoCasa;
        document.getElementById("txtCorreo").value = empleados[pos].Email;



        //Mostramos el formulario con loos detalles del accesorio
        setDetalleVisible(true);
    } else //Esto no deberia suceder
        alertarNoEncontrado();
}

//Buscamos la posicion del Accesorio por su id
function buscarPosicionEmpleadoPorId(id) {
    for (let i = 0;
    i < empleados.length; i++) {
        //Comparamos el id que se busca con el id del accesorio en la posicion actual
        if (empleados[i].idEmpleado === id)
            return i; //Devolvemos la posicion del id buscados
    }
    //Si llegamos hasta este punto significa que no encontramos un accesorio con ese id y devolvemos -1.
    return -1;
}
