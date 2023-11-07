# Fullstack-NoteApp
Project Summary

The Note App is a user-friendly web platform that simplifies note management. It incorporates the robust security of JSON Web Tokens (JWT) for user authentication, 
providing a trustworthy and efficient login process. JWT allows user data to be digitally signed and securely stored, enhancing privacy.
Users can effortlessly create, update, and delete notes while benefiting from the security of JWT. Furthermore, the application offers real-time Discord notifications 
to keep users informed about changes to their notes.
The Note App seamlessly combines the practicality of note-taking with cutting-edge security measures, making it an ideal choice for users seeking a reliable and 
secure note management solution.

This README provides information on how to set up, use, and configure the app.
Getting started

Prerequisites
Make sure you have the following installed on your system:
** node
** python

Cloning the project
You can clone the project by copying this project link to your local repository. Use: (git clone 'url copied.....') to clone



Installing dependencies
Setting Up Python Environment (Backend)

To prepare your development environment for running the Python backend, please follow these steps:
--- Open your terminal and ensure you have different terminal windows or tabs available for running both the frontend and backend of your project.
--- Set up a Python environment to isolate your project dependencies. You can refer to the official Python documentation at python.org for guidance on creating a 
virtual environment.
--- Activate your Python environment to work within its isolated environment after navigating to backend_only root directory.
--- Install all the necessary project dependencies by running the following command:

& pip install -r requirements.txt
This command will install all the required Python packages listed in the requirements.txt file.
Make sure you have Django installed. If not, you can install it using the Python package manager (pip).

Start the Django development server by running the following command:
& python manage.py runserver
This will launch the server, and your backend will be up and running.

You can now proceed to apply database migrations. Use the following command to migrate all tables to your database:
& python manage.py migrate
To protect sensitive information, it's important to create an environment variable (env) file. In this file, you can store keys and configurations securely. 
For example, you can include settings like SECRET_KEY and discord_webhook_url. In our own case, since we are using db.sqlite, there's no need to protect our database.

Setting Up React (Frontend)
To run the React frontend for your project, follow these steps:

Open a new terminal window.
Clone the project repository if you haven't already:

git clone https://github.com.......
Change to the project directory:

cd frontend_only
Install the required project dependencies using npm (Node Package Manager):
& npm install

Start the development server:
& npm start
Your React frontend will launch, and you can access it in your web browser.

You will be able to see the application running immediately your react project start. You can navigate through the webpages to register, login, 
create note after authentictation. 
