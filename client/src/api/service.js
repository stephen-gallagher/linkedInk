import axios from 'axios';

const service = axios.create({
  // make sure you use PORT = 5005 (the port where our server is running)
  baseURL: 'https://linked-ink.herokuapp.com/api',
  withCredentials: true, // => you might need this when having the users in the app
});

const errorHandler = (err) => {
  throw err;
};

const handleUpload = (file) => {
  return service
    .post('/upload', file)
    .then((res) => res.data)

    .catch(errorHandler);
};

const handleProfileUpload = (file) => {
  return service
    .post('/profile-picture/update', file)
    .then((res) => res.data)

    .catch(errorHandler);
};

const saveNewTattoo = (newTattoo) => {
  return service
    .post('/tattoos/create', newTattoo)
    .then((res) => res.data)
    .catch(errorHandler);
};

export default {
  service,
  handleUpload,
  saveNewTattoo,
  handleProfileUpload,
};
