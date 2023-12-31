const mysql = require("mysql2");
const { v1: uuidv1 } = require("uuid");

const db = mysql.createConnection({
	host: process.env.HOST,
	user: process.env.USER,
	password: process.env.PASSWORD,
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
							id: task.taskId,
							title: task.title,
						};
					})
				);
			});
		});
	};

	deleteTask = taskId => {
		return new Promise((resolve, reject) => {
			const insertion = `DELETE FROM tasks WHERE taskId = "${taskId}"`;

			db.query(insertion, err => {
				if (err) reject(err);

				resolve();
			});
		});
	};

	findTask = taskId => {
		return new Promise((resolve, reject) => {
			const insertion = `SELECT * FROM tasks WHERE taskId = "${taskId}"`;

			db.query(insertion, (err, result) => {
				if (err) reject(err);

				resolve(result[0]);
			});
		});
	};

	updateTask = (taskId, newTitle, newDescription) => {
		return new Promise((resolve, reject) => {
			const insertion = `UPDATE tasks SET title = "${newTitle}", description = "${newDescription}" WHERE taskId = "${taskId}"`;

			db.query(insertion, err => {
				if (err) reject(err);

				resolve();
			});
		});
	};

	searchTask = title => {
		return new Promise((resolve, reject) => {
			const insertion = `SELECT * FROM tasks WHERE title LIKE "${title}%"`;

			db.query(insertion, (err, result) => {
				if (err) reject(err);

				resolve(
					result.map(task => {
						return {
							id: task.id,
							title: task.title,
						};
					})
				);
			});
		});
	};
}

module.exports = Task;
