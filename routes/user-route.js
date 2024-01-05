const express = require("express");
const passport = require("passport");
const app = express();
const User = require("../models/user");
const Book = require("../models/book");

app.get("/login", isAuthenticated, (req, res) => {
	res.sendFile("login.html", { root: "public/" });
});

app.get("/", isAuthenticated, (req, res) => {
	res.sendFile("index.html", { root: "public/" });
});

app.post(
	"/libros/login",
	passport.authenticate("login", {
		failureRedirect: "/login?error",
	}),
	(req, res) => {
		return res.send({ success: "Entro" });
	}
);

app.post(
	"/libros/register",
	passport.authenticate("register", {
		failureRedirect: "/login?error",
	}),
	(req, res) => {
		return res.send({ success: "Entro" });
	}
);

app.delete("/libros/delete/:id", isAuthenticated, async (req, res) => {
	try {
		const deletedBook = await Book.findByIdAndDelete(req.params.id);
		return res.send(deletedBook);
	} catch (error) {
		console.error("Error:", error);
		return res.send("Error al eliminar el libro");
	}
});

app.put("/libros/update/:id", isAuthenticated, async (req, res) => {
	try {
		const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
		});
		return res.send(updatedBook);
	} catch (error) {
		console.error("Error:", error);
		return res.send("Error al actualizar el libro");
	}
});

app.post("/libros/crear", isAuthenticated, async (req, res) => {
	try {
		let params = req.body;

		console.log(params);

		let book = new Book({
			titulo: params.titulo,
			autor: params.autor,
			anio: params.anio,
			estado: params.estado,
		});

		const newBook = await book.save();

		return res.send(newBook);
	} catch (error) {
		console.error("Error:", error);
		return res.send("Error");
	}
});

app.get("/libros", isAuthenticated, async (req, res) => {
	try {
		const libros = await Book.find();
		return res.send(libros);
	} catch (error) {
		console.error("Error:", error);
		return res.send("Error");
	}
});

app.get("/libros/:id", async (req, res) => {
	try {
		const libro = await Book.findById(req.params.id);
		return res.send(libro);
	} catch (error) {
		console.error("Error:", error);
		return res.send("Error");
	}
});

function isAuthenticated(req, res, next) {
	res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
	res.setHeader("Pragma", "no-cache");
	res.setHeader("Expires", "0");

	if (req.isAuthenticated()) {
		if (req.route.path === "/login") {
			return res.redirect("/");
		}
		return next();
	}

	if (req.route.path === "/login") {
		return next();
	} else {
		return res.redirect("/login");
	}
}

module.exports = app;
