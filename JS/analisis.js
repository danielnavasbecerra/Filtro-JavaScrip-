
// Mostrar Resultados
async function showResults() {
    const mainContainer = document.getElementById("results")
    mainContainer.innerHTML = "";
    mainContainer.innerHTML += `<p>Results: </p>`;

    const ciudadanos = await load("ciudadanos");//[{},{}]

    //ciudadanos = {}{} 
    mainContainer.innerHTML += await analisisAdn(ciudadanos);
}

async function analisisAdn() {
    const ciudadanosList = await load("ciudadanos");
    console.log(ciudadanosList)

    const codigoAdnUsuario = document.getElementById('code_analyze').value;

    // Verifica si el código ADN tiene exactamente 20 dígitos y solo contiene 1 y 0
    if (!/^[01]{20}$/.test(codigoAdnUsuario)) {
        alert("El código ADN debe contener exactamente 20 dígitos y solo puede contener los caracteres 0 y 1.");
        return;
    }

    // Calcular el porcentaje de coincidencia 
    const coincidencias = ciudadanosList.map(ciudadano => {
        const codigoAdnCiudadano = ciudadano.codigo_adn;
        const porcentajeCoincidencia = calcularPorcentajeCoincidencia(codigoAdnUsuario, codigoAdnCiudadano);
        return { nombre: ciudadano.nombre_completo, porcentaje: porcentajeCoincidencia };
    });

    // Ordenar la lista en orden ascendente 
    coincidencias.sort((a, b) => b.porcentaje - a.porcentaje);

    // Mostrar los primeros 5 resultados en forma de lista
    let listResultados = ''
    for (let i = 0; i < 5 && i < coincidencias.length; i++) {
        const coincidencia = coincidencias[i];
        listResultados += `<li><span>${coincidencia.nombre}: ${coincidencia.porcentaje}%</span></li>`;;
    }
    return listResultados
};

// funcion para calcular el porcentaje de coinicidencia
const calcularPorcentajeCoincidencia = (codigoUsuario, codigoCiudadano) => {
    let coincidencias = 0;
    for (let i = 0; i < codigoUsuario.length; i++) {
        if (codigoUsuario[i] === codigoCiudadano[i]) {
            coincidencias++;
        }
    }
    return (coincidencias / codigoUsuario.length) * 100;
};