import './App.css';
import Navigation from './components/Navigation';
import Explore from './pages/Explore';
import Homepage from './pages/Homepage';
import { useRef, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import UserDashboard from './pages/UserDashboard';
// import ArtistDashboard from './pages/ArtistDashboard'
import ProtectedRoute from './components/ProtectedRoute';
import ArtistProfile from './pages/ArtistProfile';
import Footer from './components/Footer';
import AllArtists from './pages/AllArtists';
import AllStudios from './pages/AllStudios';
import NewStudio from './pages/NewStudio';
import StudioShow from './pages/StudioShow';
import TattooView from './components/TattooView';
import CollectionView from './components/CollectionView';

function App(props) {
  const [user, setUser] = useState(props.user);

  const addUser = (user) => {
    setUser(user);
  };
  console.log('user: ', user);

  return (
    <div className="App d-flex flex-column vh-100">
      <Navigation user={user} setUser={addUser} />

      <Routes>
        <Route
          path="/"
          element={<Homepage setUser={addUser} {...props} user={user} />}
        />
        <Route
          path="/explore"
          element={<Explore setUser={addUser} {...props} user={user} />}
        />
        <Route
          path="/signup"
          element={<Signup setUser={addUser} {...props} />}
        />
        <Route path="/login" element={<Login setUser={addUser} {...props} />} />
        <Route
          path="/:id/user-dashboard"
          user={user}
          element={<UserDashboard setUser={addUser} {...props} user={user} />}
        />

        <Route
          path="/:id/artist-profile"
          element={<ArtistProfile setUser={addUser} {...props} user={user} />}
        />
        <Route
          path="/all-artists"
          element={<AllArtists setUser={addUser} {...props} user={user} />}
        />
        <Route
          path="/new-studio"
          element={<NewStudio setUser={addUser} {...props} />}
        />
        <Route
          path="/all-studios"
          element={<AllStudios setUser={addUser} {...props} user={user} />}
        />
        <Route
          path="/studio/:id"
          element={<StudioShow setUser={addUser} {...props} user={user} />}
        />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
