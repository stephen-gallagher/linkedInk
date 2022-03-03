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
          exact
          path="/yo"
          element={<Homepage setUser={addUser} {...props} user={user} />}
        />
        <Route
          exact
          path="/explore"
          render={(props) => (
            <Explore setUser={addUser} {...props} user={user} />
          )}
        />
        <Route
          exact
          path="/signup"
          render={(props) => <Signup setUser={addUser} {...props} />}
        />
        <Route
          exact
          path="/login"
          render={(props) => <Login setUser={addUser} {...props} />}
        />
        <Route
          exact
          path="/:id/user-dashboard"
          user={user}
          component={UserDashboard}
        />

        <Route
          exact
          path="/:id/artist-profile"
          // user={user}
          // component={ArtistProfile}
          render={(props) => (
            <ArtistProfile setUser={addUser} {...props} user={user} />
          )}
        />
        <Route
          exact
          path="/all-artists"
          render={(props) => (
            <AllArtists setUser={addUser} {...props} user={user} />
          )}
        />
        <Route
          exact
          path="/new-studio"
          render={(props) => <NewStudio setUser={addUser} {...props} />}
        />
        <Route
          exact
          path="/all-studios"
          render={(props) => (
            <AllStudios setUser={addUser} {...props} user={user} />
          )}
        />
        <Route
          exact
          path="/studio/:id"
          render={(props) => (
            <StudioShow setUser={addUser} {...props} user={user} />
          )}
        />
        <Route
          exact
          path="/tattoos/:id"
          render={(props) => <TattooView setUser={addUser} {...props} />}
        />
        <Route
          exact
          path="/collections/:id"
          render={(props) => <CollectionView setUser={addUser} {...props} />}
        />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
