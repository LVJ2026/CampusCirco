async function afficherListeEcoles() {

    const liste = document.getElementById("ecole");

    try {

        const reponse = await fetch("/.netlify/functions/grist");
        const donnees = await reponse.json();

        liste.innerHTML = '<option value="">-- Sélectionnez votre école --</option>';

        donnees.records
            .sort((a, b) =>
                a.fields.Ville.localeCompare(b.fields.Ville) ||
                a.fields.Ecole.localeCompare(b.fields.Ecole)
            )
            .forEach(ecole => {

                const option = document.createElement("option");

                option.value = ecole.fields.UAI;

                option.textContent =
                    `${ecole.fields.UAI} — ${ecole.fields.Ecole} (${ecole.fields.Ville})`;

                liste.appendChild(option);

            });

    } catch (e) {

        console.error(e);

    }

}
