import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthContext } from "./hooks/useAuthContext";
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import "./style/App.css";
import MainPage from './pages/Main';
import MyTasks from './pages/MyTasks';
import CompletedTasks from './pages/CompletedTasks';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Signup from './pages/Signup';
// npm install react-scripts --save

function App() {
  const { user } = useAuthContext();

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route
              path="/"
              element={
                <TransitionGroup>
                  <CSSTransition key={window.location.pathname} classNames="fade" timeout={600}>
                    <MainPage />
                  </CSSTransition>
                </TransitionGroup>
              }
            />
            <Route
              path="/mytasks"
              element={
                <TransitionGroup>
                  <CSSTransition key={window.location.pathname} classNames="fade" timeout={600}>
                    {user ? <MyTasks /> : <Navigate to="/" />}
                  </CSSTransition>
                </TransitionGroup>
              }
            />
            <Route
              path="/completed-tasks"
              element={
                <TransitionGroup>
                  <CSSTransition key={window.location.pathname} classNames="fade" timeout={600}>
                    {user ? <CompletedTasks /> : <Navigate to="/" />}
                  </CSSTransition>
                </TransitionGroup>
              }
            />
            <Route
              path="/login"
              element={
                <TransitionGroup>
                  <CSSTransition key="login" classNames="flip" timeout={500}>
                    {!user ? <Login /> : <Navigate to="/mytasks" />}
                  </CSSTransition>
                </TransitionGroup>
              }
            />
            <Route
              path="/signup"
              element={
                <TransitionGroup>
                  <CSSTransition key="signup" classNames="flip" timeout={500}>
                    {!user ? <Signup /> : <Navigate to="/mytasks" />}
                  </CSSTransition>
                </TransitionGroup>
              }
            />
          </Routes>
        </div>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
