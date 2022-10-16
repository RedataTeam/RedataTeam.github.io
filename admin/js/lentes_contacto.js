

let lentes_contacto = [
    {
        idProducto: 1,
        idLenteDeContacto: 10,
        numeroUnico: "ABC123",
        nombre: "Lente de contacto blando",
        marca: "Generico",
        color: "Rojo",
        queratometria: 100.00,
        existencias: 17
    },

    {
        idProducto: 2,
        idLenteDeContacto: 11,
        numeroUnico: "ABC123",
        nombre: "Lente de contacto hibrido",
        marca: "Generico",
        color: "Azul",
        queratometria: 100.00,
        existencias: 17
    },

    {
        idProducto: 3,
        idLenteDeContacto: 12,
        numeroUnico: "ABC123",
        nombre: "Lente de contacto de gas permeable",
        marca: "Generico",
        color: "Verde",
        queratometria: 100.00,
        existencias: 17
    }
];

/**
 * Esta funcion llena una tabla HTML
 * a partir del arreglo de accesorios.
 */

function fillTable() {
    let contenido = '';
    //Recorremos el arreglo:
    for (let i = 0; i < lentes_contacto.length; i++) {
        //Generamos el contenido de forma dinamica:
        contenido = contenido + '<tr>' +
                '<td>' + lentes_contacto[i].nombre + '</td>' +
                '<td>' + lentes_contacto[i].marca + '</td>' +
                '<td>' + lentes_contacto[i].color + '</td>' +
                '<td>' + lentes_contacto[i].queratometria + '</td>' +
                '<td>' + lentes_contacto[i].existencias + '</td>' +
                '<td><a href="#" title="Modificar" onclick="cm.mostrarDetalleLenteDeContacto(' + lentes_contacto[i].idLenteDeContacto + ');"><img src="../media/editar.png" width="30px" height="30px" alt="alt"/></a></td>' +
                '<td><a id="basura" href="#" title="Eliminar" onclick="cm.remove(' + lentes_contacto[i].idLenteDeContacto + ');"><img src="../media/eliminar_icon.png" width="30px" height="30px" alt="alt"/></a></td>' + '</tr>';
    }
    document.getElementById("tbodyClientes").innerHTML = contenido;
}


export function save() {
    //Declaramos una variable temporal para saber la posicion del accesorio}
    let pos = -1;

    //Definimos un objeto con los atributos y valores del accesorio
    let lente_contacto = {
        idProducto: 0,
        idLenteDeContacto: 0,
        numeroUnico: 0,
        nombre: document.getElementById("txtNombre").value,
        marca: document.getElementById("txtMarca").value,
        color: document.getElementById("txtColor").value,
        queratometria: parseFloat(document.getElementById("txtQueratometria").value),
        existencias: parseFloat(document.getElementById("txtExistencias").value)
    };

    //Revisamos si hay algun valor en la caja de texto del id accesorio
    if (document.getElementById("txtIdLenteDeContacto").value.trim() === '') {
        //Generamos un id para el accesorio a partir de los milisegundos de la fecha actual
        lente_contacto.idProducto = Date.now();
        lente_contacto.idLenteDeContacto = Date.now() + 1;
        lente_contacto.numeroUnico = Date.now() + 2;

        //Insertamos el accesorio al final del arreglo
        lentes_contacto[lentes_contacto.length] = lente_contacto;

        //Colocamos los ids generados en las cajas de texto para evitar duplicados
        document.getElementById("txtIdProducto").value = lente_contacto.idProducto;
        document.getElementById("txtIdLenteDeContacto").value = lente_contacto.idLenteDeContacto;
        document.getElementById("txtNumeroUnico").value = lente_contacto.numeroUnico;
        //Mostramos un mensaje al usuario
        alertarGuardarRegistro();
        //Llenamos la tabla
        fillTable();
        setDetalleVisible(false);
        limpiarFormularioDetalle();
    } else {
        //Si accesorio ya tiene un id, lo tomamos para actualizar sus datos
        lente_contacto.idProducto = parseInt(document.getElementById("txtIdProducto").value);
        lente_contacto.idLenteDeContacto = parseInt(document.getElementById("txtIdLenteDeContacto").value);
        lente_contacto.numeroUnico = parseInt(document.getElementById("txtNumeroUnico").value);

        //Buscamos la posicion del objeto
        pos = buscarPosicionLenteDeContactoPorId(lente_contacto.idLenteDeContacto);
        if (pos >= 0) {
            //Reemplazamos el objeto en la posicion encontrada
            lentes_contacto[pos] = lente_contacto;
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

export function remove(idLenteDeContacto) {
    let pos = buscarPosicionLenteDeContactoPorId(idLenteDeContacto);

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
                lentes_contacto.splice(pos, 1);
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
    document.getElementById("txtIdLenteDeContacto").value = "";
    document.getElementById("txtIdProducto").value = "";
    document.getElementById("txtNumeroUnico").value = "";
    document.getElementById("txtNombre").value = "";
    document.getElementById("txtMarca").value = "";
    document.getElementById("txtColor").value = "";
    document.getElementById("txtQueratometria").value = "";
    document.getElementById("txtExistencias").value = "";
}

export function mostrarDetalleLenteDeContacto(idLenteDeContacto) {
    let pos = buscarPosicionLenteDeContactoPorId(idLenteDeContacto);
    //Buscamos la posicion de accesorio
    //Revisamos que sea válida
    if (pos >= 0) {

        //limpiamos el formulario
        limpiarFormularioDetalle();
        //Llenamos el formulario con los datos del accesorio
        document.getElementById("txtIdLenteDeContacto").value = lentes_contacto[pos].idLenteDeContacto;
        document.getElementById("txtIdProducto").value = lentes_contacto[pos].idProducto;
        document.getElementById("txtNumeroUnico").value = lentes_contacto[pos].numeroUnico;
        document.getElementById("txtNombre").value = lentes_contacto[pos].nombre;
        document.getElementById("txtMarca").value = lentes_contacto[pos].marca;
        document.getElementById("txtColor").value = lentes_contacto[pos].color;
        document.getElementById("txtQueratometria").value = lentes_contacto[pos].queratometria;
        document.getElementById("txtExistencias").value = lentes_contacto[pos].existencias;

        //Mostramos el formulario con loos detalles del accesorio
        setDetalleVisible(true);
    } else //Esto no deberia suceder
        alertarNoEncontrado();
}

//Buscamos la posicion del Accesorio por su id
function buscarPosicionLenteDeContactoPorId(id) {
    for (let i = 0;
    i < lentes_contacto.length; i++) {
        //Comparamos el id que se busca con el id del accesorio en la posicion actual
        if (lentes_contacto[i].idLenteDeContacto === id)
            return i; //Devolvemos la posicion del id buscados
    }
    //Si llegamos hasta este punto significa que no encontramos un accesorio con ese id y devolvemos -1.
    return -1;
}

