async function testerConnexionGrist() {

    const url =
        `https://grist.numerique.gouv.fr/api/docs/${CONFIG.DOCUMENT_ID}/tables`;

    try {

        const reponse = await fetch(url, {
            headers: {
                Authorization: `Bearer ${CONFIG.API_KEY}`
            }
        });

        if (!reponse.ok) {
            throw new Error("Erreur " + reponse.status);
        }

        const tables = await reponse.json();

        console.log("Connexion réussie !");
        console.log(tables);

    }
    catch (erreur) {

        console.error("Erreur Grist :", erreur);

    }

}
