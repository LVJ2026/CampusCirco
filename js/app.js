document.addEventListener("DOMContentLoaded", initialiserApplication);

function initialiserApplication() {

testerConnexionGrist();

    afficherListeEcoles();

    document
        .getElementById("btnParcours")
        .addEventListener("click", afficherParcours);

}

function afficherListeEcoles() {

    const liste = document.getElementById("ecole");

    ecoles
        .sort((a, b) =>
            a.ville.localeCompare(b.ville) ||
            a.nom.localeCompare(b.nom)
        )
        .forEach(ecole => {

            const option = document.createElement("option");

            option.value = ecole.uai;

            option.textContent =
                `${ecole.uai} — ${ecole.nom} (${ecole.ville})`;

            liste.appendChild(option);

        });

}

function afficherParcours() {

    const liste = document.getElementById("ecole");
    const resultat = document.getElementById("resultat");

    // aucune école sélectionnée
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