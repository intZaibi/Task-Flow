# 🧠 Real-Time Collaborative Task Board

A Trello-style task management board built with **Next.js**, **Socket.IO**, and **dnd-kit**, supporting real-time collaboration and drag-and-drop tasks across columns.

---

## 🚀 Features

- 📦 Drag and drop tasks between columns
- ↺ Real-time sync via WebSockets (Socket.IO)
- 📝 Edit & delete task support (in progress)
- 🧹 Modular & component-based architecture
- ♻️ Rollback state on failed sync
- ⚡ Error handling & reconnection support

---

## 🛡️ Architecture

### 💻 Frontend

- **Framework:** Next.js (App Router)
- **State:** React Context API
- **Drag & Drop:** dnd-kit (Touch + Mouse sensors)
- **Real-time:** Socket.IO-client

### 📧 Backend

- **Server:** Custom Node.js + Socket.IO server (within Next.js)
- **Transport:** WebSocket
- **Storage:** In-memory (can be replaced with Redis/DB)

```txt
/app
  ├── layout.tsx
  ├── page.tsx
/components
  /hooks
    └── socket.ts
  /layout
    ├── TaskCard.tsx
    ├── Column.tsx
    ├── Board.tsx
/types
  └── types.ts
/context
  └── Context.tsx
server.js
```

---

## ⚖️ Design Trade-offs

| Trade-off               | Decision                                                       |
| ----------------------- | -------------------------------------------------------------- |
| Simple backend vs DB    | Used in-memory storage for MVP simplicity                      |
| Vercel vs manual server | Not using Vercel (no socket support), opting for custom host   |
| drag-and-drop lib       | `dnd-kit` chosen over `react-beautiful-dnd` for sensor support |
| Auth                    | Next.js api routes don't support custom WebSocket servers well, so we used a custom Node.js server file to configure Socket.IO. |

---

## 🛠️ Setup

### 1. Clone the repo

```bash
git clone https://github.com/intZaibi/Task-Flow.git
cd Task-Flow-main
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start development server

```bash
npm run dev
```

### 4. Open app

Navigate to `http://localhost:3000`

---

## 📸 Demo Screenshots

*Coming soon*

---

## 🙇‍♂️ Author

**Muhammad Shahzaib Ali**\
MERN Stack Developer | Real-time Systems | UI/UX

---

## 📄 License

MIT – Free to use, modify, distribute.