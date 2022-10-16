


function cerrarModulos(){
    fetch("home.html")
            .then(response => {return response.text();})
            .then(function(html)
    {
        document.getElementById('contenedor_principal').innerHTML ="";
        document.getElementById('contenedor_home').innerHTML = html;
    });
}

