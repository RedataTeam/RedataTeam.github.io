let accesorios = [
    {
        idProducto: 1,
        idAccesorio: 9,
        numeroUnico: "ABC123",
        nombre: "Estuche basico",
        marca: "Generico",
        precioCompra: 15.49,
        precioVenta: 100.00,
        existencias: 17
    },

    {
        idProducto: 2,
        idAccesorio: 10,
        numeroUnico: "ABC121",
        nombre: "Cordon de sujecion",
        marca: "Generico",
        precioCompra: 25.00,
        precioVenta: 50.00,
        existencias: 6
    },

    {
        idProducto: 3,
        idAccesorio: 11,
        numeroUnico: "ABC122",
        nombre: "Paño limpieza microfibra",
        marca: "OQ-Clean",
        precioCompra: 7.99,
        precioVenta: 75.00,
        existencias: 19
    }
];

/**
 * Esta funcion llena una tabla HTML
 * a partir del arreglo de accesorios.
 */

function fillTable() {
    let contenido = '';
    //Recorremos el arreglo:
    for (let i = 0; i < accesorios.length; i++) {
        //Generamos el contenido de forma dinamica:
        contenido = contenido + '<tr>' +
                '<td>' + accesorios[i].nombre + '</td>' +
                '<td>' + accesorios[i].marca + '</td>' +
                '<td>' + accesorios[i].precioCompra + '</td>' +
                '<td>' + accesorios[i].precioVenta + '</td>' +
                '<td>' + accesorios[i].existencias + '</td>' +
                '<td><a href="#" title="Modificar" onclick="cm.mostrarDetalleAccesorio(' + accesorios[i].idAccesorio + ');"><img src="../media/editar.png" width="30px" height="30px" alt="alt"/></a></td>' +
                '<td><a id="basura" href="#" title="Eliminar" onclick="cm.remove(' + accesorios[i].idAccesorio + ');"><img src="../media/eliminar_icon.png" width="30px" height="30px" alt="alt"/></a></td>' + '</tr>';
    }
    document.getElementById("tbodyClientes").innerHTML = contenido;
}


export function save() {
    //Declaramos una variable temporal para saber la posicion del accesorio}
    let pos = -1;

    //Definimos un objeto con los atributos y valores del accesorio
    let accesorio = {
        idProducto: 0,
        idAccesorio: 0,
        numeroUnico: 0,
        nombre: document.getElementById("txtNombre").value,
        marca: document.getElementById("txtMarca").value,
        precioCompra: parseFloat(document.getElementById("txtPrecioC").value),
        precioVenta: parseFloat(document.getElementById("txtPrecioV").value),
        existencias: parseFloat(document.getElementById("txtExistencias").value)
    };

    //Revisamos si hay algun valor en la caja de texto del id accesorio
    if (document.getElementById("txtIdAccesorio").value.trim() === '') {
        //Generamos un id para el accesorio a partir de los milisegundos de la fecha actual
        accesorio.idProducto = Date.now();
        accesorio.idAccesorio = Date.now() + 1;
        accesorio.numeroUnico = Date.now() + 2;

        //Insertamos el accesorio al final del arreglo
        accesorios[accesorios.length] = accesorio;

        //Colocamos los ids generados en las cajas de texto para evitar duplicados
        document.getElementById("txtIdProducto").value = accesorio.idProducto;
        document.getElementById("txtIdAccesorio").value = accesorio.idAccesorio;
        document.getElementById("txtNumeroUnico").value = accesorio.numeroUnico;

        //Mostramos un mensaje al usuario
        alertarGuardarRegistro();
        //Llenamos la tabla
        fillTable();
        setDetalleVisible(false);
        limpiarFormularioDetalle();
    } else {
        //Si accesorio ya tiene un id, lo tomamos para actualizar sus datos
        accesorio.idProducto = parseInt(document.getElementById("txtIdProducto").value);
        accesorio.idAccesorio = parseInt(document.getElementById("txtIdAccesorio").value);
        accesorio.numeroUnico = parseInt(document.getElementById("txtNumeroUnico").value);

        //Buscamos la posicion del objeto
        pos = buscarPosicionAccesorioPorId(accesorio.idAccesorio);
        if (pos >= 0) {
            //Reemplazamos el objeto en la posicion encontrada
            accesorios[pos] = accesorio;
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

export function remove(idAccesorio) {
    let pos = buscarPosicionAccesorioPorId(idAccesorio);

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
                accesorios.splice(pos, 1);
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
    document.getElementById("txtIdAccesorio").value = "";
    document.getElementById("txtIdProducto").value = "";
    document.getElementById("txtNumeroUnico").value = "";
    document.getElementById("txtNombre").value = "";
    document.getElementById("txtMarca").value = "";
    document.getElementById("txtPrecioC").value = "";
    document.getElementById("txtPrecioV").value = "";
    document.getElementById("txtExistencias").value = "";
}

export function mostrarDetalleAccesorio(idAccesorio) {
    let pos = buscarPosicionAccesorioPorId(idAccesorio);
    //Buscamos la posicion de accesorio
    //Revisamos que sea válida
    if (pos >= 0) {

        //limpiamos el formulario
        limpiarFormularioDetalle();
        //Llenamos el formulario con los datos del accesorio
        document.getElementById("txtIdAccesorio").value = accesorios[pos].idAccesorio;
        document.getElementById("txtIdProducto").value = accesorios[pos].idProducto;
        document.getElementById("txtNumeroUnico").value = accesorios[pos].numeroUnico;
        document.getElementById("txtNombre").value = accesorios[pos].nombre;
        document.getElementById("txtMarca").value = accesorios[pos].marca;
        document.getElementById("txtPrecioC").value = accesorios[pos].precioCompra;
        document.getElementById("txtPrecioV").value = accesorios[pos].precioVenta;
        document.getElementById("txtExistencias").value = accesorios[pos].existencias;

        //Mostramos el formulario con loos detalles del accesorio
        setDetalleVisible(true);
    } else //Esto no deberia suceder
        alertarNoEncontrado();
}

//Buscamos la posicion del Accesorio por su id
function buscarPosicionAccesorioPorId(id) {
    for (let i = 0;
    i < accesorios.length; i++) {
        //Comparamos el id que se busca con el id del accesorio en la posicion actual
        if (accesorios[i].idAccesorio === id)
            return i; //Devolvemos la posicion del id buscados
    }
    //Si llegamos hasta este punto significa que no encontramos un accesorio con ese id y devolvemos -1.
    return -1;
}
