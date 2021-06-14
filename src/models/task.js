const mysql = require("mysql2");
const { v1: uuidv1 } = require("uuid");

const db = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "admin123",
});

db.query("USE ProgettiNode", err => {
	if (err) throw err;
});

class Task {
	newTask = (title, description, userId) => {
		return new Promise((resolve, reject) => {
			const insertion = `INSERT INTO tasks (taskId, title, description, userId, dataCreazioneTask) VALUES ("${uuidv1()}", "${title}", "${description}", "${userId}", DEFAULT)`;

			db.query(insertion, (err, result) => {
				if (err) reject(err);

				resolve({
					title,
					description,
				});
			});
		});
	};

	listTasks = userId => {
		return new Promise((resolve, reject) => {
			const insertion = `SELECT * FROM tasks WHERE userId = "${userId}" ORDER BY dataCreazioneTask`;

			db.query(insertion, (err, result) => {
				if (err) reject(err);

				resolve(
					result.map(task => {
						return {
							title: task.title,
							description: task.description,
						};
					})
				);
			});
		});
	};
}

module.exports = Task;
