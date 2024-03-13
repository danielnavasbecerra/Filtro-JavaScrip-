
// Crear Nuevo Ciudadano en la DB
async function safeCiudadano() {
    const citizenList = await load("ciudadanos");

    const documentNameInput = document.getElementById("name");
    const documentADNCodeInput = document.getElementById("code");
    const documentPhoneInput = document.getElementById("phone");
    const documentAddressInput = document.getElementById("address");

    const documentName = documentNameInput.value;
    const documentADNCode = documentADNCodeInput.value;
    const documentPhone = documentPhoneInput.value;
    const documentAddress = documentAddressInput.value;

    const existingCitizen = citizenList.find(citizen => calculateSimilitud(citizen.codigo_adn, documentADNCode) >= 20);

    if (existingCitizen) {
        alert("¡Ya existe un ciudadano con un código de ADN similar en la base de datos!");
        return;
    }

    const codigoAdnUsuario = document.getElementById('code').value;

    // Verifica si el código ADN tiene exactamente 20 dígitos y solo contiene 1 y 0
    if (!/^[01]{20}$/.test(codigoAdnUsuario)) {
        alert("El código ADN debe contener exactamente 20 dígitos y solo puede contener los caracteres 0 y 1.");
        return;
    }

    const newCiudadano = {
        "nombre_completo": documentName,
        "direccion": documentAddress,
        "celular": documentPhone,
        "codigo_adn": documentADNCode,
        "id": citizenList.length + 1
    }

    await save(newCiudadano, "ciudadanos");

    documentNameInput.value = "";
    documentADNCodeInput.value = "";
    documentPhoneInput.value = "";
    documentAddressInput.value = "";

    alert("Citizen sucessfully Safed");
    return newCiudadano;

}

function calculateSimilitud(dna1, dna2) {
    let similarity = 0;
    for (let i = 0; i < dna1.length; i++) {
        if (dna1.charAt(i) === dna2.charAt(i)) {
            similarity++;
        }
    }
    return similarity;
}