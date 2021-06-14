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
			const insertion = `INSERT INTO users (userId, username, email, password, token) VALUES ("${userId}", "${username}", "${email}", "${bcrypt.hashSync(
				password,
				8
			)}", "")`;

			db.query(insertion, err => {
				if (err) reject(err);

				resolve({
					id: userId,
					username,
				});
			});
		});
	};

	login = async (email, password) => {
		return new Promise((resolve, reject) => {
			const insertion = `SELECT * FROM users WHERE email = "${email}"`;

			db.query(insertion, (err, result) => {
				if (err) reject(err);

				if (result.length === 0)
					resolve(`Nessun utente trovato con questa mail`);
				else if (!bcrypt.compareSync(password, result[0].password))
					resolve(`Password errata`);
				else
					resolve({
						id: result[0].userId,
						username: result[0].userId,
					});
			});
		});
	};

	isUsed = async (columnName, columnValue) => {
		return new Promise((resolve, reject) => {
			const insertion = `SELECT * FROM users WHERE ${columnName} = "${columnValue}"`;

			db.query(insertion, (err, result) => {
				if (err) reject(err);

				if (result.length === 0) resolve(true);
				else resolve(false);
			});
		});
	};
}

module.exports = User;
