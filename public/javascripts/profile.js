console.log("Aca en la vista de profile")

const selectProvincias = document.getElementById("province");

selectProvincias.addEventListener("change", async (e) => {
    try {
        const response = await fetch(`https://apis.datos.gob.ar/georef/api/localidades?provincia=${e.target.value}&max=500`);
        const data = await response.json();
        const localidades = data.localidades.sort((a, b) => a.nombre.localeCompare(b.nombre));
        const selectLocalidades = document.getElementById("city");
        selectLocalidades.innerHTML = "";
        const option =  document.createElement("option");
        option.value = "";
            option.text = "Seleccione...";
            option.selected = true;
            option.hidden = true;
            selectLocalidades.appendChild(option);
         //Limpia las opciones anteriores
        localidades.forEach(municipio => {
            const option = document.createElement("option");
            option.value = municipio.nombre;
            option.text = municipio.nombre;
            selectLocalidades.appendChild(option);
        });

    } catch { error => console.log(error) }
});