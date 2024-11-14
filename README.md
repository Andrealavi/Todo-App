# Todo App

## Description

A simple todo web app made using javascript and ExpressJS

---

## Prerequisites

- [Docker](https://docs.docker.com/get-docker/) (ensure Docker is installed and running)
- [Node.js](https://nodejs.org/) (ensure Node.js and npm are installed)

---

## Project Setup

### 1. Setting Up MySQL with Docker

1. **Run Docker Compose**
   - In the project directory, use and customize the provided `docker-compose.yml` file to set up the MySQL database.
   ```bash
   docker-compose up -d
   ```

   This command will download the MySQL image, create a container named `mysqlNode`, and map ports for access.

2. **Create Required Tables**
   - Once the MySQL container is running, access the database through a MySQL client or directly from the container:
   ```bash
   docker exec -it mysqlNode mysql -u root -p
   ```
   - Enter your MySQL root password (as specified in your `.env` file, explained below).
   - Run the following SQL commands to create the `users` and `tasks` tables:

     ```sql
     -- Switch to the DatabaseName database
     USE DatabaseName;

     -- Create the users table
     CREATE TABLE users (
         userId CHAR(36) PRIMARY KEY,
         username VARCHAR(255) NOT NULL,
         email VARCHAR(255) NOT NULL UNIQUE,
         password VARCHAR(255) NOT NULL,
         token VARCHAR(512)
     );

     -- Create the tasks table
     CREATE TABLE tasks (
         taskId CHAR(36) PRIMARY KEY,
         title VARCHAR(255) NOT NULL,
         description TEXT,
         userId CHAR(36),
         dataCreazioneTask DATE,
         FOREIGN KEY (userId) REFERENCES users(userId)
     );
     ```

### 2. Installing Project Dependencies

- Use npm to install all project dependencies. Run the following command in the project root directory:
  ```bash
  npm install
  ```

### 3. Creating the `.env` File

- In the project root directory, create a `.env` file to store your database credentials. Below is an example of what to include:

  ```plaintext
  HOST=localhost
  USER=root
  PASSWORD=admin123
  ```

  Replace the values with those specified in your `docker-compose.yml` file.

---

## Usage

1. **Starting the Application**
   - To start the Node.js application, use:
     ```bash
     npm start
     ```

2. **Accessing the Application**
   - The application should be accessible at `http://localhost:<port>` (modify according to your setup).

---

## Troubleshooting

If you encounter any issues with the Docker MySQL container, verify Docker is running and check container logs with:
```bash
docker logs mysqlNode
```
---

## Technologies used
- NodeJS
- Express npm module for managing the server
- Handlebars for creating dynamic web pages
- SQL for managing the database
- Docker for hosting a mySQL image
