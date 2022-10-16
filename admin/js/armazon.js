let armazones = [
    {
        idProducto: 1,
        idArmazon: 3,
        codigoBarras: "OQ-928382",
        nombre: "Armazón Madera",
        marca: "Armani",
        modelo: "Finaly",
        color: "Café",
        descripcion: "Armazón elegante de madera",
        dimensiones: "52-18-135",
        precioCompra: 899.99,
        precioVenta: 1499.99,
        existencias: 20
    },

    {
        idProducto: 2,
        idArmazon: 10,
        codigoBarras: "OQ-832011",
        nombre: "Armazón Slim",
        marca: "Génerico",
        modelo: "Slim",
        color: "Negro",
        descripcion: "Armazón ultra fino",
        dimensiones: "40-19-153",
        precioCompra: 200.00,
        precioVenta: 599.99,
        existencias: 80
    },

    {
        idProducto: 3,
        idArmazon: 7,
        codigoBarras: "OQ-372806",
        nombre: "Armazón Cloe Mujer",
        marca: "Gucci",
        modelo: "Dama",
        color: "Rosa",
        descripcion: "Armazón de plástico casual",
        dimensiones: "43-14-111",
        precioCompra: 100.01,
        precioVenta: 500.00,
        existencias: 34
    }
];


function fillTable() {
    let contenido = '';
    
    for (let i = 0; i < armazones.length; i++) {

        contenido = contenido + '<tr>' +
                '<td>' + armazones[i].nombre + '</td>' +
                '<td>' + armazones[i].marca + '</td>' +
                '<td>' + armazones[i].modelo + '</td>' +
                '<td>' + armazones[i].color + '</td>' +
                '<td>' + armazones[i].descripcion + '</td>' +
                '<td>' + armazones[i].dimensiones + '</td>' +
                '<td>' + armazones[i].precioCompra + '</td>' +
                '<td>' + armazones[i].precioVenta + '</td>' +
                '<td>' + armazones[i].existencias + '</td>' +
                '<td><a href="#" title="Modificar" onclick="cm.mostrarDetalleArmazon(' + armazones[i].idArmazon + ');"><img src="../media/editar.png" width="30px" height="30px" alt="alt"/></a></td>' +
                '<td><a id="basura" href="#" title="Eliminar" onclick="cm.remove(' + armazones[i].idArmazon + ');"><img src="../media/eliminar_icon.png" width="30px" height="30px" alt="alt"/></a></td>' + '</tr>';
    }
    document.getElementById("tbodyArmazon").innerHTML = contenido;
}


export function save() {
    
    let pos = -1;

 
    let armazon = {
        idProducto: 0,
        idArmazon: 0,
        codigoBarras: 0,
        nombre: document.getElementById("txtNombre").value,
        marca: document.getElementById("txtMarca").value,
        modelo: document.getElementById("txtModelo").value,
        color: document.getElementById("txtColor").value,
        descripcion: document.getElementById("txtDesc").value,
        dimensiones: document.getElementById("txtDimensiones").value,
        precioCompra: parseFloat(document.getElementById("txtPrecioC").value),
        precioVenta: parseFloat(document.getElementById("txtPrecioV").value),
        existencias: parseFloat(document.getElementById("txtExistencias").value)
    };


    if (document.getElementById("txtIdArmazon").value.trim() === '') {

        armazon.idProducto = Date.now();
        armazon.idArmazon = Date.now() + 1;
        armazon.codigoBarras = 'OQ' + Date.now() + 2;


        armazones[armazones.length] = armazon;


        document.getElementById("txtIdProducto").value = armazon.idProducto;
        document.getElementById("txtIdArmazon").value = armazon.idArmazon;
        document.getElementById("txtCodeBarras").value = armazon.codigoBarras;


        alertarGuardarRegistro();

        fillTable();
        setDetalleVisible(false);
        limpiarFormularioDetalle();
    } else {

        armazon.idProducto = parseInt(document.getElementById("txtIdProducto").value);
        armazon.idArmazon = parseInt(document.getElementById("txtIdArmazon").value);
        armazon.codigoBarras = parseInt(document.getElementById("txtCodeBarras").value);


        pos = buscarPosicionArmazonPorId(armazon.idArmazon);
        if (pos >= 0) {

            armazones[pos] = armazon;

            alertarGuardarModificar();

            fillTable();
            setDetalleVisible(false);
            limpiarFormularioDetalle();
        } else {
            alertarError();
        }
    }
}

export function remove(idArmazon) {
    let pos = buscarPosicionArmazonPorId(idArmazon);

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
                armazones.splice(pos, 1);
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
    } else { 
        alertarError();
    }
}


export function limpiar_mostrarDetalle() {
    limpiarFormularioDetalle();
    setDetalleVisible(true);
}



export function setDetalleVisible(valor)
{

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


export function inicializar()
{
    setDetalleVisible(false);

    fillTable();
}

export function limpiarFormularioDetalle() {
    
    document.getElementById("txtIdArmazon").value = "";
    document.getElementById("txtIdProducto").value = "";
    document.getElementById("txtCodeBarras").value = "";
    document.getElementById("txtNombre").value = "";
    document.getElementById("txtMarca").value = "";
    document.getElementById("txtModelo").value = "";
    document.getElementById("txtColor").value = "";
    document.getElementById("txtDesc").value = "";
    document.getElementById("txtDimensiones").value = "";
    document.getElementById("txtPrecioC").value = "";
    document.getElementById("txtPrecioV").value = "";
    document.getElementById("txtExistencias").value = "";
}

export function mostrarDetalleArmazon(idArmazon) {
    let pos = buscarPosicionArmazonPorId(idArmazon);

    if (pos >= 0) {


        limpiarFormularioDetalle();
        
    document.getElementById("txtIdArmazon").value = armazones[pos].idArmazon;
    document.getElementById("txtIdProducto").value = armazones[pos].idProducto;
    document.getElementById("txtCodeBarras").value = armazones[pos].codigoBarras;
    document.getElementById("txtNombre").value = armazones[pos].nombre;
    document.getElementById("txtMarca").value = armazones[pos].marca;
    document.getElementById("txtModelo").value = armazones[pos].modelo;
    document.getElementById("txtColor").value = armazones[pos].color;
    document.getElementById("txtDesc").value = armazones[pos].descripcion;
    document.getElementById("txtDimensiones").value = armazones[pos].dimensiones;
    document.getElementById("txtPrecioC").value = armazones[pos].precioCompra;
    document.getElementById("txtPrecioV").value = armazones[pos].precioVenta;
    document.getElementById("txtExistencias").value = armazones[pos].existencias;


        setDetalleVisible(true);
    } else 
        alertarNoEncontrado();
}


function buscarPosicionArmazonPorId(id) {
    for (let i = 0;
    i < armazones.length; i++) {

        if (armazones[i].idArmazon === id)
            return i; 
    }

    return -1;
}
