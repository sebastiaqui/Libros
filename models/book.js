const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let bookSchema = new Schema({
	titulo: {
		type: String,
		required: [true, "El título es requerido"],
	},
	autor: {
		type: String,
		required: [true, "El autor es requerido"],
	},
	anio: {
		type: Number,
		required: [true, "El año de publicación es requerido"],
	},
	estado: {
		type: String,
		required: [true, "El estado es requerido"],
	},
});

module.exports = mongoose.model("Book", bookSchema);
