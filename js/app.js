document.addEventListener("DOMContentLoaded", initialiserApplication);

async function initialiserApplication() {

    testerConnexionGrist();

    await afficherListeEcoles();
    console.log("Liste chargée");

    document
        .getElementById("btnParcours")
        .addEventListener("click", afficherParcours);

}

async function afficherListeEcoles() {

    const liste = document.getElementById("ecole");

    try {

        const reponse = await fetch("/.netlify/functions/grist");

        if (!reponse.ok) {
            throw new Error("Erreur " + reponse.status);
        }

        const donnees = await reponse.json();
        console.log(donnees);

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

    } catch (erreur) {

        console.error("Erreur chargement écoles :", erreur);

    }

}

function afficherParcours() {

    const liste = document.getElementById("ecole");
    const resultat = document.getElementById("resultat");

    if (liste.selectedIndex === 0) {

        resultat.innerHTML = `
            <div class="card">
                <p style="color:#c62828;font-weight:bold;">
                    ⚠️ Veuillez sélectionner une école.
                </p>
            </div>
        `;

        return;
    }

    const uai = liste.value;

    const ecole = ecoles.find(e => e.uai === uai);

    resultat.innerHTML = `

        <div class="card">

            <h3>${parcoursDemo.parcours}</h3>

            <p><strong>🏫 École :</strong> ${ecole.nom}</p>

            <p><strong>📍 Commune :</strong> ${ecole.ville}</p>

            <p><strong>👥 Enseignants :</strong> ${parcoursDemo.enseignants}</p>

            <hr>

            <h4>⭐ Prochaine séance</h4>

            <p><strong>Animation :</strong> ${parcoursDemo.prochaineSeance.animation}</p>

            <p><strong>Date :</strong> ${parcoursDemo.prochaineSeance.date}</p>

            <p><strong>Horaire :</strong> ${parcoursDemo.prochaineSeance.horaire}</p>

        </div>

    `;

}