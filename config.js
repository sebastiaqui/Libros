const config = {
	dbUrl:
		process.env.DB_URL ||
		"mongodb+srv://quirozs312:xN2e5FFRF8HHWVXF@cluster0.mzls43d.mongodb.net/libros?retryWrites=true&w=majority",
	port: process.env.PORT || 3001,
	host: process.env.HOST || "http://localhost:",
};

module.exports = config;
