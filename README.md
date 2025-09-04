# 📘 Time Tracker – Implementation Documentation & Project Foundation

## 1. Project Overview

### **Project Name:**

**Time Tracker (Doroo)**

### **Problem Statement**

In today’s fast-paced environment, many individuals and teams struggle with **managing time efficiently** and **tracking productivity**. Common issues include:

- Difficulty in balancing focused work sessions with proper breaks.
- Poor task management leading to missed deadlines.
- Lack of structured workflows for individuals working remotely or in study environments.

### **Solution Overview**

The **Time Tracker** web application provides a simple yet effective solution by combining a **Pomodoro timer** with a **task management system**.

- The **Pomodoro Technique** enhances productivity by structuring work and break intervals.
- The **Task Manager** helps users list, organize, and track deadlines.
- The application is built with **Angular** for front-end interactivity, **Tailwind CSS** for responsive styling, and **MongoDB** for persistent task storage.

---

## 2. Tech Stack & Tools

### **Frontend**

- **TypeScript + Angular** → Component-driven structure, reactive forms, service-based APIs.
- **Tailwind CSS + DaisyUI** → Utility-first CSS framework for responsive UI and prebuilt UI patterns.

### **Backend**

- **Node.js + Express.js** → REST API endpoints to handle tasks and authentication.
- **MongoDB + Mongoose** → Document database for storing user tasks, deadlines, and status.

### **Other Tools**

- **JWT (JSON Web Tokens)** → Authentication and user session handling.
- **Axios/HttpClient (Angular)** → For making API calls.
- **GitHub / Git** → Version control.

---

## 3. Features Analysis & Planning

### ✅ **Core Features**

1. **Pomodoro Timer**

   - Modes: Pomodoro (25 mins), Short Break (5 mins), Long Break (15 mins).
   - Timer with start, pause, and reset functionality.
   - Automatically switches between work and break sessions.

2. **Task Manager**

   - Add, edit, and delete tasks.
   - Set **deadlines** for tasks.
   - Mark tasks as **completed/incomplete**.
   - Tasks displayed in a **scrollable list** with deadline info.

3. **User Authentication**

   - Sign up & log in (optional for local use, but needed for multi-user).
   - Secure JWT authentication for backend requests.

4. **Responsive UI**

   - Mobile-first design.
   - Dynamic grid switching (`grid-cols-1 → md:grid-cols-2`).
   - Task manager & timer stack vertically on mobile.

5. **Persistence**

   - All tasks saved in **MongoDB**.
   - Authenticated users can retrieve tasks across sessions.

---

## 4. Project Foundation Flow (Conceptual Flow)

This is the **end-to-end flow** of the application.

### **Step 1: User Journey**

1. User visits the website → sees the **Landing Page** with **Timer + Task Manager**.
2. User either:

   - Starts the **Pomodoro Timer**, or
   - Adds tasks with deadlines in the **Task Manager**.

3. Tasks are stored in **MongoDB via API calls**.
4. Timer session and tasks help the user **focus and track progress**.

### **Step 2: Application Flow**

1. **Frontend (Angular)**

   - Components:

     - `TimerComponent` → Handles Pomodoro logic.
     - `TaskComponent` → Handles task CRUD (create, read, update, delete).
     - `AuthComponent` → Login & signup.

   - Services:

     - `TaskService` → Calls backend `/api/tasks` endpoints.
     - `AuthService` → Manages authentication & tokens.

2. **Backend (Node.js + Express)**

   - Endpoints:

     - `POST /api/auth/login` → User login.
     - `POST /api/auth/register` → Register new user.
     - `GET /api/tasks` → Get all tasks for logged-in user.
     - `POST /api/tasks` → Add task.
     - `PUT /api/tasks/:id` → Update task (mark complete, change deadline).
     - `DELETE /api/tasks/:id` → Delete task.

3. **Database (MongoDB)**

   - **Collections**:

     - `users`

       ```ts
       {
         _id: ObjectId,
         username: string,
         email: string,
         passwordHash: string
       }
       ```

     - `tasks`

       ```ts
       {
         _id: ObjectId,
         userId: ObjectId,
         title: string,
         deadline: Date,
         completed: boolean
       }
       ```

---

## 5. Implementation Documentation

### **Frontend Implementation**

1. **Setup Angular Project**

   ```bash
   ng new time-tracker --style=css --routing
   cd time-tracker
   npm install tailwindcss daisyui
   ```

   Configure `tailwind.config.js`.

2. **Components**

   - `LandingComponent` → Main layout (Timer + Task Manager).
   - `TimerComponent` → Controls countdown logic.
   - `TaskListComponent` → Displays tasks.
   - `TaskInputComponent` → Input new tasks.
   - `AuthComponent` → Login/Signup forms.

3. **Services**

   - `task.service.ts` → Handles CRUD with backend.
   - `auth.service.ts` → Handles login/register, stores JWT in `localStorage`.

4. **State Management**

   - Use Angular `BehaviorSubject` to keep tasks updated across components.

---

### **Backend Implementation**

1. **Setup Node.js & Express**

   ```bash
   mkdir backend && cd backend
   npm init -y
   npm install express mongoose cors bcryptjs jsonwebtoken
   ```

   - `server.js` → Entry point.

2. **Models**

   - `User.js`
   - `Task.js` (with fields: `title`, `deadline`, `completed`, `userId`)

3. **Routes**

   - `auth.routes.js` → Register/Login.
   - `task.routes.js` → CRUD endpoints.

4. **Middleware**

   - `authMiddleware.js` → Protects task routes with JWT.

5. **Run Backend**

   ```bash
   node server.js
   ```

---

## 6. Roadmap (Future Enhancements)

- Notifications when Pomodoro ends.
- Categories/tags for tasks.
- Weekly productivity reports.
- Drag-and-drop task ordering.
- Team support (shared tasks).
