const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const User = require("../models/user");

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
	const user = await User.findById(id);
	done(null, user);
});

passport.use(
	"register",
	new LocalStrategy(
		{
			usernameField: "email",
			passwordField: "password",
			passReqToCallback: true,
		},
		async (req, email, passwordField, done) => {
			try {
				let params = req.body;

				const userExist = await User.findOne({ email: email });

				if (userExist) {
					console.log("Ya existe");
					return done(null, false);
				}

				const user = new User({
					nombre: params.nombre,
					email: email.toLowerCase(),
					password: passwordField,
				});

				const newUser = await user.save();

				return done(null, newUser);
			} catch (error) {
				console.error("Error:", error);
				return done(null, false);
			}
		}
	)
);

passport.use(
	"login",
	new LocalStrategy(
		{
			usernameField: "email",
			passwordField: "password",
			passReqToCallback: true,
		},
		async (req, email, passwordField, done) => {
			try {
				const dataUser = await User.findOne({
					email: email.toLowerCase(),
					password: passwordField,
				});

				if (!dataUser) {
					return done(null, false, { message: "No se encuentra" });
				}

				return done(null, dataUser);
			} catch (error) {
				console.error("Error:", error);
				return done(null, false, { message: "Error" });
			}
		}
	)
);
