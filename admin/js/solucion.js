let soluciones = [
    {
        idProducto: 11,
        idSolucion: 1,
        numeroUnico: "OQ223",
        nombre: "Solución de peróxido",
        marca: "EasySept",
        descripcion: "Máxima limpieza y desinfección",
        precioCompra: 10.49,
        precioVenta: 50.00,
        existencias: 10
    },
    {
        idProducto: 12,
        idSolucion: 2,
        numeroUnico: "OQ323",
        nombre: "Solución salina",
        marca: "Sperian",
        descripcion: "Aclarar y humedecer los lentes de contacto",
        precioCompra: 15.90,
        precioVenta: 65.00,
        existencias: 4
    },
    {
        idProducto: 33,
        idSolucion: 3,
        numeroUnico: "OQ233",
        nombre: "Solución únicas",
        marca: "Avizor",
        descripcion: "Hidratar y conservar los lentes de contacto blandos",
        precioCompra: 18.50,
        precioVenta: 70.00,
        existencias: 15
    }
];

/**
 * Esta funcion llena una tabla HTML
 * a partir del arreglo de accesorios.
 */

function fillTable() {
    let contenido = '';
    //Recorremos el arreglo:
    for (let i = 0; i < soluciones.length; i++) {
        //Generamos el contenido de forma dinamica:
        contenido = contenido + '<tr>' +
                '<td>' + soluciones[i].nombre + '</td>' +
                '<td>' + soluciones[i].marca + '</td>' +
                '<td>' + soluciones[i].descripcion + '</td>' +
                '<td>' + soluciones[i].precioCompra + '</td>' +
                '<td>' + soluciones[i].precioVenta + '</td>' +
                '<td>' + soluciones[i].existencias + '</td>' +
                '<td><a href="#" title="Modificar" onclick="cm.mostrarDetalleAccesorio(' + soluciones[i].idSolucion + ');"><img src="../media/editar.png" width="30px" height="30px" alt="alt"/></a></td>' +
                '<td><a id="basura" href="#" title="Eliminar" onclick="cm.remove(' + soluciones[i].idSolucion + ');"><img src="../media/eliminar_icon.png" width="30px" height="30px" alt="alt"/></a></td>' + '</tr>';
    }
    document.getElementById("tbodyClientes").innerHTML = contenido;
}


export function save() {
    //Declaramos una variable temporal para saber la posicion del accesorio}
    let pos = -1;

    //Definimos un objeto con los atributos y valores del accesorio
    let solucion = {
        idProducto: 0,
        idSolucion: 0,
        numeroUnico: 0,
        nombre: document.getElementById("txtNombre").value,
        marca: document.getElementById("txtMarca").value,
        descripcion: document.getElementById("txtDescripcion").value,
        precioCompra: parseFloat(document.getElementById("txtPrecioC").value),
        precioVenta: parseFloat(document.getElementById("txtPrecioV").value),
        existencias: parseFloat(document.getElementById("txtExistencias").value)
    };

    //Revisamos si hay algun valor en la caja de texto del id accesorio
    if (document.getElementById("txtIdSolucion").value.trim() === '') {
        //Generamos un id para el accesorio a partir de los milisegundos de la fecha actual
        soluciones.idProducto = Date.now();
        soluciones.idSolucion = Date.now() + 1;
        soluciones.numeroUnico = Date.now() + 2;

        //Insertamos el accesorio al final del arreglo
        soluciones[soluciones.length]=solucion;

        //Colocamos los ids generados en las cajas de texto para evitar duplicados
        document.getElementById("txtIdProducto").value = solucion.idProducto;
        document.getElementById("txtIdSolucion").value = solucion.idsolucion;
        document.getElementById("txtNumeroUnico").value = solucion.numeroUnico;

        //Mostramos un mensaje al usuario
        alertarGuardarRegistro();
        //Llenamos la tabla
        fillTable();
        setDetalleVisible(false);
        limpiarFormularioDetalle();
    } else {
        //Si accesorio ya tiene un id, lo tomamos para actualizar sus datos
        solucion.idProducto = parseInt(document.getElementById("txtIdProducto").value);
        solucion.idSolucion = parseInt(document.getElementById("txtIdSolucion").value);
        solucion.numeroUnico = parseInt(document.getElementById("txtNumeroUnico").value);

        //Buscamos la posicion del objeto
        pos = buscarPosicionSolucionPorId(solucion.idSolucion);
        if (pos >= 0) {
            //Reemplazamos el objeto en la posicion encontrada
            soluciones[pos] = solucion;
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

export function remove(idSolucion) {
    let pos = buscarPosicionSolucionPorId(idSolucion);

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
                soluciones.splice(pos, 1);
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
    document.getElementById("txtIdSolucion").value = "";
    document.getElementById("txtIdProducto").value = "";
    document.getElementById("txtNumeroUnico").value = "";
    document.getElementById("txtNombre").value = "";
    document.getElementById("txtMarca").value = "";
    document.getElementById("txtDescripcion").value = "";
    document.getElementById("txtPrecioC").value = "";
    document.getElementById("txtPrecioV").value = "";
    document.getElementById("txtExistencias").value = "";
}

export function mostrarDetalleAccesorio(idSolucion) {
    let pos = buscarPosicionSolucionPorId(idSolucion);
    //Buscamos la posicion de accesorio
    //Revisamos que sea válida
    if (pos >= 0) {

        //limpiamos el formulario
        limpiarFormularioDetalle();
        //Llenamos el formulario con los datos del accesorio
        document.getElementById("txtIdSolucion").value = soluciones[pos].idSolucion;
        document.getElementById("txtIdProducto").value = soluciones[pos].idProducto;
        document.getElementById("txtNumeroUnico").value = soluciones[pos].numeroUnico;
        document.getElementById("txtNombre").value = soluciones[pos].nombre;
        document.getElementById("txtMarca").value = soluciones[pos].marca;
        document.getElementById("txtDescripcion").value = soluciones[pos].descripcion;
        document.getElementById("txtPrecioC").value = soluciones[pos].precioCompra;
        document.getElementById("txtPrecioV").value = soluciones[pos].precioVenta;
        document.getElementById("txtExistencias").value = soluciones[pos].existencias;

        //Mostramos el formulario con loos detalles del accesorio
        setDetalleVisible(true);
    } else //Esto no deberia suceder
        alertarNoEncontrado();
}

//Buscamos la posicion del Accesorio por su id
function buscarPosicionSolucionPorId(id) {
    for (let i = 0;
    i < soluciones.length; i++) {
        //Comparamos el id que se busca con el id del accesorio en la posicion actual
        if (soluciones[i].idSolucion === id)
            return i; //Devolvemos la posicion del id buscados
    }
    //Si llegamos hasta este punto significa que no encontramos un accesorio con ese id y devolvemos -1.
    return -1;
}



