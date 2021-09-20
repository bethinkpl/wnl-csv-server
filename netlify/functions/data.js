const results = require("./results");

exports.handler = async function(event) {

  const items = results.filter((item) => item.user_id === event.queryStringParameters["uid"]);

  if (items.length > 0) {
    return {
      statusCode: 200,
      body: JSON.stringify(item[0]),
    };
  } else {
    return {
      statusCode: 404,
      body: JSON.stringify({ error: "Data not found" }),
    };
  }
}