# Task Flow: Project Management Tool

## Table of Contents
1. [Introduction](#introduction)
2. [Problem Statement](#problem-statement)
3. [Solution](#solution)
4. [WebApp Details](#webapp-details)
5. [Key Features](#key-features)
6. [Technologies Used](#technologies-used)
7. [Impact](#impact)
8. [Installation](#installation)
9. [Usage](#usage)
10. [Contributing](#contributing)
11. [License](#license)

---

## Introduction
**Task Flow** is a project management site where users can create new projects, add tasks, and update their progress as they work. It is designed to help individuals and teams manage their projects and tasks efficiently, especially in collaborative environments like open-source projects, production projects, or hackathons.

---

## Problem Statement
When working in a team on a project—whether it's an open-source project, a production project, or a project during events like hackathons—one common issue is dividing tasks among team members. This often leads to confusion, inefficiency, and a lack of clarity about who is responsible for what.

**Task Flow** addresses this problem by providing a centralized platform where users can create projects, divide them into tasks, and assign those tasks to individuals. This ensures that everyone knows their responsibilities and can track progress effectively.

---

## Solution
**Task Flow** is a web application that helps users store projects and tasks in an organized manner. Users can:
- **Create Projects**: Add new projects with a name and description.
- **Add Tasks**: Break down projects into smaller tasks and assign them to team members.
- **Update Progress**: Track the progress of tasks using categories like To-Do, In-Progress, and Done.
- **Manage Tasks**: Add, update, edit, and delete tasks as the project evolves.

This solution ensures that teams can collaborate more effectively, stay organized, and meet deadlines with ease.

---

## WebApp Details
### Live Site
You can find the live site for **Task Flow** [here](http://OpTasks.herokuapp.com/) for a demo.

### Video Demonstration
Watch the demonstration video [here](https://vimeo.com/568019065) to see how **Task Flow** works.

### PPT
You can find the project presentation [here](https://www.slideshare.net/ShwetKhatri1/OpTask) to learn more about **Task Flow**.

---

## Key Features
### 1. Dashboard
- **Centralized View**: View all your projects and tasks in one place.
- **Quick Access**: Easily create new projects or access existing ones.

### 2. Task Management
- **Task Categories**: Tasks are categorized into **To-Do**, **In-Progress**, and **Done** for easy tracking.
- **Task Actions**: Users can add, update, edit, and delete tasks dynamically.
- **Progress Tracking**: A Visual representation of task progress helps users stay on top of their work.

### 3. Project Creation
- **New Project**: Users can create new projects by providing a project name and description.
- **Recent Projects**: Easy access to recently worked-on projects for quick navigation.

### 4. User Profile
- **Profile Management**: Users can edit their profile details, including full name, job, institution, email, and location.
- **Recent Projects**: Display of the most recent projects worked on by the user.

---

## Technologies Used
### Frontend
- **React.js**: For building a dynamic and responsive user interface.
- **React Router DOM**: For client-side routing and navigation.
- **Flowbite & Flowbite-React**: For pre-designed UI components and responsive design.
- **FontAwesome & Phosphor Icons**: For scalable vector icons.

### Backend
- **Express.js**: A Node.js framework for building the backend server.
- **MongoDB**: A NoSQL database for storing project and task data.
- **Mongoose**: An ODM (Object Data Modeling) library for MongoDB.
- **GraphQL**: For efficient data querying and manipulation.
- **Apollo Server**: For implementing the GraphQL API.
- **JSON Web Tokens (JWT)**: For secure user authentication and authorization.
- **Bcrypt**: For password hashing and secure storage.

### Other Tools
- **Dotenv**: For managing environment variables.
- **CORS**: For enabling cross-origin resource sharing.
- **Vitest**: For testing the application.
- **Happy DOM**: For simulating the browser environment during testing.

---

## Impact
### For Developers and Students
- **Improved Productivity**: Centralized task management helps users stay organized and focused.
- **Better Collaboration**: Teams can easily assign tasks and track progress, improving collaboration.
- **Enhanced Time Management**: Clear visualisation of task status helps users prioritize and manage their time effectively.

### For Project Management
- **Streamlined Workflow**: Task Flow simplifies the process of creating, updating, and tracking tasks.
- **Increased Efficiency**: Users can quickly access their recent projects and tasks, reducing time spent on navigation.

---

## Installation
To get started with **Task Flow**, follow these steps:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/YashodipJagtap/Task-Flow.git
   ```

2. **Navigate to the Project Directory**:
   ```bash
   cd task-flow
   ```

3. **Install Dependencies**:
   - For the frontend:
     ```bash
     cd frontend
     npm install
     ```
   - For the backend:
     ```bash
     cd backend
     npm install
     ```

4. **Set Up Environment Variables**:
   - Create a `.env` file in the `backend` directory and add the necessary variables (e.g., MongoDB URI, JWT secret key).
   - Create a `.env` file in the `frontend` directory and add the necessary variables (e.g., API endpoint).

5. **Start the Development Servers**:
   - For the backend:
     ```bash
     cd backend
     npm start
     ```
   - For the frontend:
     ```bash
     cd frontend
     npm start
     ```

6. **Access the Application**:
   - Open your browser and navigate to `http://localhost:3000` to access the Task Flow platform.

---

## Usage
1. **Dashboard**:
   - View all your recent projects in one place.
   - Create new projects or access existing ones.

2. **Task Management**:
   - Add, update, edit, and delete tasks dynamically.
   - Track task progress using the To-Do, In-Progress, and Done categories.

3. **Project Creation**:
   - Create new projects by providing a project name and description.
   - Access recently worked-on projects for quick navigation.

4. **User Profile**:
   - Edit your profile details, including full name, job, institution, email, and location.
   - View the most recent projects you've worked on.

---

## Contributing
We welcome contributions to **Task Flow**! If you'd like to contribute, please follow these steps:

1. **Fork the Repository**:
   - Fork the repository to your own GitHub account.

2. **Create a New Branch**:
   - Create a new branch for your feature or bug fix:
     ```bash
     git checkout -b feature/your-feature-name
     ```

3. **Make Your Changes**:
   - Make your changes and commit them with clear, descriptive messages:
     ```bash
     git commit -m "Add your commit message here"
     ```

4. **Push Your Changes**:
   - Push your changes to your forked repository:
     ```bash
     git push origin feature/your-feature-name
     ```

5. **Submit a Pull Request**:
   - Submit a pull request to the main repository, describing your changes and their impact.

---

## License
This project is licensed under the **MIT License**. 

Thank you for using **Task Flow**! Let's streamline your project management and boost productivity together.
