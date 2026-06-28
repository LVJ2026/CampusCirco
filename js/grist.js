async function testerConnexionGrist() {

    try {

        const reponse = await fetch("/.netlify/functions/grist");

        if (!reponse.ok) {
            throw new Error("Erreur " + reponse.status);
        }

        const tables = await reponse.json();

        console.log("Connexion réussie !");
        console.log(tables);

    } catch (erreur) {

        console.error("Erreur Grist :", erreur);

    }

}