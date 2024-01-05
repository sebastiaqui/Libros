const db = require("mongoose");

async function connect(url) {
	try {
		await db.connect(url);
		console.log("[db] Conectada con éxito");
	} catch (errorConn) {
		console.error(errorConn);
	}
}

module.exports = connect;
