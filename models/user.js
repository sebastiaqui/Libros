const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let userSchema = new Schema({
	nombre: {
		type: String,
		required: [true, "El nombre es requerido"],
	},
	email: {
		type: String,
		required: [true, "El correo es obligatorio"],
	},
	password: {
		type: String,
		required: true,
	},
});

module.exports = mongoose.model("User", userSchema);
