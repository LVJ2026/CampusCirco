exports.handler = async () => {
  const url = "/.netlify/functions/grist";

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${process.env.GRIST_API_KEY}`
      }
    });

    const data = await response.json();

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
};
