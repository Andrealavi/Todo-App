const mysql = require("mysql2");
const bcrypt = require("bcrypt");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const { v1: uuidv1 } = require("uuid");

const db = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "admin123",
});

db.query("USE ProgettiNode", err => {
	if (err) throw err;
});

class User {
	newUser = async (username, email, password) => {
		return new Promise((resolve, reject) => {
			const userId = uuidv1();
			const insertion = `INSERT INTO users (userId, username, email, password, token, tasks) VALUES ("${userId}", "${username}", "${email}", "${bcrypt.hashSync(
				password,
				8
			)}", "", '{}')`;

			db.query(insertion, err => {
				if (err) reject(err);

				resolve({
					id: userId,
					username,
				});
			});
		});
	};
}

module.exports = User;
