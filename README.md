# Online Exam System

## 🌟 Project Overview

This system is designed to enhance the online examination experience by making it smoother and more interactive. Key features include user authentication, exam management, and a scoring system to assess performance.

## ✅ Features Implemented

### 🔹 Authentication System

- **Sign Up Page** – Users can register, and their data is validated before being stored in json file represent our DB.
- **Login Page** – Ensures secure access by verifying registered users.

### 🔹 Exam Flow

- **Exam Topic** - You can choose topic of the exam.
- **Exam Difficulty** - You can choose level of the exam's difficulty.
- **Exam Instructions Page** – Displays guidelines before starting the exam.
- **Exam Page** – The core of the system, containing:
  - 🕒 **Timer** – Keeps track of the exam duration.
  - 🚩 **Question Flagging System** – Allows users to mark questions for review and quickly navigate back to them.

### 🔹 Exam Completion Scenarios

1. **Time’s Up!** – The system alerts the user that time has expired and redirects them to the Results Page.
2. **Early Submission** – Users can submit the exam early and receive immediate results.

### 🔹 Scoring System

- **Pass**: Users who score **50% or more** successfully pass the exam 🎉
- **Fail**: Users scoring below **50%** need to retake the exam ❌

### 🔹 Information sidebar

- **Pofile**: Has all data of the user and all exams history
- **Logout**: Give user option to log out the system.

## 🔥 Technologies Used

- **HTML, CSS** – For structuring and styling the pages.
- **JavaScript (ES6), OOP** – For handling logic, interactivity, and user data.
- **Responsive Design, Bootstrap** – Ensures a seamless experience across various devices.
- **JSON Server** – Simulates a backend for storing user data.

## 🚀 How to Run the Project

1. Clone the repository:

   ```sh
   git clone https://github.com/your-repo/online-exam-system.git

2. Navigate to the project directory:

   ```sh
   cd online-exam-system
3. Install Json server (if you not install it):

   ```sh
   npm i json-server
4. Start the JSON Server:

   ```sh
   json-server --watch data/JSON/db.json

## 📌 Future Enhancements

- Implementing real-time database integration with real API.

- Adding user role-based access control (Admin, Student, Instructor).

- Enhancing security measures for authentication.

## 📬 Contact

If you have any questions or suggestions, feel free to reach out via Email: <hanysaadstd@gmail.com>
Happy coding! 😊

## 📜 License

This project is licensed under the MIT License.
