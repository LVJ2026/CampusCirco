exports.handler = async function () {

  const url = "https://grist.numerique.gouv.fr/api/docs/81zf7baTvQ9XeFcWBLpFzf/tables/ECOLES/records";

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${process.env.GRIST_API_KEY}`
    }
  });

  const data = await response.json();

  return {
    statusCode: response.status,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
    },
    body: JSON.stringify(data)
  };

};
