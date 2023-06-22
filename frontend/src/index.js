import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { TasksContextProvider } from './context/TaskContext';
import { AuthContextProvider } from './context/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <TasksContextProvider>
        <App />
      </TasksContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);

