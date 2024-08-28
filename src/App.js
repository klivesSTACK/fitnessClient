import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import './App.css';
import { UserProvider } from './UserContext';
import AppNavbar from './components/AppNavbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Logout from './pages/Logout';
import Workout from './pages/Workout';


function App() {

  const [ user, setUser ] = useState({
    id: null,
    isAdmin: null
  })

  const unsetUser = () => {

    localStorage.clear();

  };

  
  return(
    <UserProvider value ={{ user,setUser, unsetUser }}>
      <Router>
      <AppNavbar />
        <Container>
        <Routes>
          <Route path="/" element= {<Home />} />
          <Route path="/register" element= {<Register />} />
          <Route path="/login" element= {<Login />} />
          <Route path="/logout" element= {<Logout />} />
          <Route path="/workouts" element= {<Workout />} />
        </Routes>
        </Container>
      </Router>
    </UserProvider>
  )

}

export default App;
