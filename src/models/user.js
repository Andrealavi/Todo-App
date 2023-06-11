const mysql = require("mysql2");
const bcrypt = require("bcrypt");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const { v1: uuidv1 } = require("uuid");

const db = mysql.createConnection({
	host: process.env.HOST,
	user: process.env.USER,
	password: process.env.PASSWORD,
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

	findUser = userId => {
		return new Promise((resolve, reject) => {
			const insertion = `SELECT * FROM users WHERE userId = "${userId}"`;

			db.query(insertion, (err, result) => {
				if (err) reject(err);

				resolve(result[0]);
			});
		});
	};

	updateUser = (userId, newUsername, newEmail, newPassword) => {
		return new Promise((resolve, reject) => {
			let insertion;

			if (newPassword !== "")
				insertion = `UPDATE users SET username = "${newUsername}", email = "${newEmail}", password = "${bcrypt.hashSync(
					newPassword,
					8
				)}" WHERE userId = "${userId}"`;
			else
				insertion = `UPDATE users SET username = "${newUsername}", email = "${newEmail}" WHERE userId = "${userId}"`;

			db.query(insertion, err => {
				if (err) reject(err);

				resolve();
			});
		});
	};
}

module.exports = User;
