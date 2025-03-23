# 👥 User Management App

[DEMO](https://user-manager-henna.vercel.app/)

A simple and clean **CRUD application** built with **React + Vite**, featuring:

- 🔄 User listing, creation, editing, deletion
- 🧠 Form validation with React Hook Form + Zod
- 🎯 State management and data fetching using Redux Toolkit & RTK Query
- 🎨 Material UI components for professional design
- 🔥 Toast notifications via Redux middleware
- 🧪 Unit tests with Vitest & React Testing Library

> ⚠️ Uses [JSONPlaceholder](https://jsonplaceholder.typicode.com/users) as a mock API

---

## ✨ Features

- [x] View list of users in a DataGrid
- [x] Create a new user
- [x] Edit existing user
- [x] Delete user with confirmation
- [x] Form validation (name, email, phone)
- [x] Toasts for success/error (via middleware)
- [x] Unit tests for components & API logic
- [x] Modular project structure (FSD-like)

---

## 🚀 Tech Stack

| Tech                  | Description                            |
|-----------------------|----------------------------------------|
| Vite                  | Next-gen build tool                    |
| React                 | UI library                             |
| Redux Toolkit         | State management                       |
| RTK Query             | API fetching & caching                 |
| React Hook Form + Zod | Form handling & validation             |
| Material UI           | Component styling                      |
| Vitest + RTL          | Testing framework                      |
| JSONPlaceholder       | Mock API                               |

---

## 🧠 Project Structure (FSD-style)

```
src/
├── app/        # App setup: store, theme, router
├── entities/   # Business entities (user)
│   └── user/
│       └── model/  # userApi, types
├── features/   # Functional units (UserForm, buttons)
├── pages/      # Page-level views
├── widgets/    # UI widgets (e.g. UserTable)
├── shared/     # Shared UI, hooks, middleware
└── test/       # Test setup & utils
```

---

## 📦 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/sasholk/user-manager.git
cd user-manager
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the app

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

### 🧪 Running Tests

```bash
npm run test
```

Uses Vitest + React Testing Library

### 📜 API Used

Using JSONPlaceholder for mock user data.

Note: Since it's a fake API:

- POST, PUT, and DELETE do not persist
- Optimistic updates are handled in cache only