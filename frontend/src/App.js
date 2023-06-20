import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthContext } from "./hooks/useAuthContext"

// cd frontend
// npm run start
// npm i react-router-dom *ONCE*

//pages & components
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Signup from './pages/Signup';

function App() {
  const { user } = useAuthContext()

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route
              path = "/"
              element={user ? <Home /> : <Navigate to="/login"/>}
              >
            </Route>
            <Route
              path = "/login"
              element={!user ? <Login /> : <Navigate to="/"/>}
              >
            </Route>
            <Route
              path = "/signup"
              element={!user ? <Signup /> : <Navigate to="/"/>}
              >
            </Route>
          </Routes>
        </div>
        </BrowserRouter>
    </div>
  );
}

export default App;
