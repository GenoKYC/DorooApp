# 📘 Doroo – Implementation Documentation & Project Foundation

## 1. Project Foundation

### **Project Name**

**Doroo**

### **Problem Statement**

In the digital age, people often struggle with **managing focus time and tasks simultaneously**.

- Students face difficulties staying consistent during study sessions.
- Remote workers juggle deadlines without a structured flow.
- Standard to-do apps lack **time-blocking productivity methods**.

Without a tool that **combines time management with task organization**, productivity often drops, and deadlines are missed.

---

### **Solution Overview**

**Doroo** is a **web-based productivity app** that integrates a **Pomodoro timer** with a **task manager**.

- The **Pomodoro timer** keeps users focused with structured work/break sessions.
- The **task manager** allows users to create, track, and complete tasks with deadlines.
- Data is **persisted in MongoDB**, ensuring tasks remain available across sessions.
- A clean **Angular + Tailwind** interface makes the experience smooth and responsive.

**Key Value:** Doroo bridges the gap between **time discipline** and **task accountability**.

---

### **Features Analysis & Planning**

#### ✅ Core Features (MVP)

1. **Pomodoro Timer**

   - Work, Short Break, Long Break modes.
   - Start, pause, reset functionality.
   - Automatic switching between sessions.

2. **Task Manager**

   - Add new tasks with deadlines.
   - View task list.
   - Mark tasks as completed/incomplete.
   - Delete tasks.

3. **Persistence (Database)**

   - Store tasks per user in **MongoDB**.
   - Retrieve saved tasks when user returns.

4. **Authentication**

   - User registration & login (secure with bcrypt & sessions/JWT).
   - Personal task tracking per account.

#### 🚀 Future Enhancements

- Task categories/tags.
- Weekly productivity analytics.
- Notifications when Pomodoro session ends.
- Collaboration: Shared task boards.

---

## 2. Tech Stack

### **Frontend**

- **Angular (TypeScript)** → Component-based structure, state management, service-driven APIs.
- **Tailwind CSS + DaisyUI** → Utility-first CSS framework + prebuilt UI patterns for fast styling.

### **Backend**

- **Node.js + Express.js** → REST API services for tasks & authentication.
- **MongoDB (via Mongoose)** → Stores user accounts & tasks.

### **Other Tools**

- **bcryptjs** → Secure password hashing.
- **express-session / JWT** → Session handling & authentication.
- **GitHub/Git** → Version control.

---

## 3. Foundation Flow (Website Concept Flow)

### **User Flow**

1. **Landing Page**

   - Timer is visible.
   - Task input field with deadline selector.

2. **Task Flow**

   - User adds a task → stored in MongoDB.
   - User can **check/uncheck** tasks as completed.
   - Tasks appear in a scrollable list.

3. **Timer Flow**

   - User starts Pomodoro.
   - Countdown updates in real-time.
   - Notification (future feature) when session ends.

4. **Authentication Flow**

   - Register → create new account.
   - Login → load personal tasks.
   - Logout → clear session.

---

## 4. Implementation Documentation

### **Frontend (Angular)**

#### 1. Project Setup

```bash
ng new doroo --style=css --routing
cd doroo
npm install tailwindcss daisyui
```

Configure `tailwind.config.js` to enable Tailwind + DaisyUI.

#### 2. Components

- `landing.component.ts/html/css` → Combines Timer + Task Manager.
- `timer.component.ts` → Handles Pomodoro logic.
- `task-list.component.ts` → Displays tasks.
- `task-input.component.ts` → Form for adding new tasks.
- `auth.component.ts` → Login/Signup UI.

#### 3. Services

- `task.service.ts` → Handles CRUD with `/api/tasks`.
- `auth.service.ts` → Handles authentication with `/api/auth`.

---

### **Backend (Node + Express)**

#### 1. Project Setup

```bash
mkdir backend && cd backend
npm init -y
npm install express mongoose cors bcryptjs express-session connect-mongo dotenv
```

#### 2. Models

- **User Model (`User.js`)**

  ```ts
  {
    name: String,
    email: String,
    password: String
  }
  ```

- **Task Model (`Task.js`)**

  ```ts
  {
    user: ObjectId,
    title: String,
    deadline: Date,
    completed: { type: Boolean, default: false }
  }
  ```

#### 3. Routes

- `auth.js` → Register, Login, Logout, Profile.
- `tasks.js` → CRUD for tasks (protected by authentication).

#### 4. Middleware

- `authMiddleware.js` → Ensures only logged-in users access `/api/tasks`.

---

## 5. Database (MongoDB)

### Collections

- **Users** → Store account credentials.
- **Tasks** → Store tasks linked to a `userId`.

---

## 6. System Architecture

**Frontend (Angular)** ↔ **Backend (Express.js)** ↔ **Database (MongoDB)**

- Angular calls Express REST APIs using `HttpClient`.
- Express authenticates users and forwards valid requests.
- MongoDB stores and retrieves data.

---

## 7. Roadmap

**Phase 1 (MVP):**

- Pomodoro timer + Task manager.
- Authentication (basic login/register).
- Task persistence in DB.

**Phase 2:**

- Notifications.
- Task categories.
- Dark mode theme.

**Phase 3:**

- Shared tasks / Team productivity features.
- Export productivity reports.
