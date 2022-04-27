import React, { useState, useEffect } from 'react';
import Fade from 'react-reveal/Fade';
import axios from 'axios';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { Link } from 'react-router-dom';

export default function TattooView({
  artist,
  user,
  selectedTattoo,
  setTattooPopup,
}) {
  const [collections, setCollections] = useState([]);
  const [selectedCollection, setSelectedCollection] = useState([]);
  const [showCollectionForm, setShowCollectionForm] = useState(false);
  const [collectionTitle, setCollectionTitle] = useState('');
  const [collectionDescription, setCollectionDescription] = useState('');
  const [message, setMessage] = useState('');
  const [addToCollection, setAddToCollection] = useState(false);

  const animatedComponents = makeAnimated();

  const getUserCollections = () => {
    // get request to the server
    axios
      .get(`/api/crud/user/collections`)
      .then((response) => {
        setCollections(response.data);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getUserCollections();
  }, []);

  const showCollectionFormButton = (e) => {
    e.preventDefault();
    setShowCollectionForm(!showCollectionForm);
  };

  const handleCollectionChange = (e) => {
    const newValuesArr = e ? e.map((item) => item.value) : [];
    setSelectedCollection(newValuesArr);
  };

  const handleNewCollectionSubmit = (e) => {
    e.preventDefault();
    axios
      .post('/api/crud/collections/new', {
        collectionTitle,
        collectionDescription,
      })
      .then((response) => {
        setCollectionTitle('');
        setCollectionDescription('');
        setMessage('Collection created');
        getUserCollections();
        return response.data;
      })
      .catch((err) => {
        return err.response.data;
      });
  };

  const handleCollectionSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`/api/crud/tattoos/${selectedTattoo._id}`, {
        selectedCollection: selectedCollection,
      })
      .then((response) => {
        console.log(response);
        setSelectedCollection([]);
        setMessage('Image has been added to your collection');
        return response.data;
      })
      .catch((err) => {
        return err.response.data;
      });
  };

  console.log('selected', selectedTattoo);
  return (
    // <div
    //   className="col-5 mt-3 card mb-3 bg-dark border border-white border-4"
    //   style={{ height: '83vh', overflowX: 'auto', borderRadius: '15px' }}
    // >
    // <div>
    <Fade top duration={1000} delay={600} distance="30px">
      <div
        className="col-5 mt-3 card mb-3 bg-dark sticky border-white"
        style={{ position: 'absolute', left: '30%' }}
      >
        <div className="bg-dark bg-gradient col-12 text-white p-2 rounded d-flex justify-content-between">
          <div></div>
          <h2 className="righteous">
            {' '}
            {selectedTattoo.artist.firstName} {selectedTattoo.artist.lastName}
          </h2>
          {/* <div> */}
          <button
            className="d-flex flex-end text-dark"
            style={{ height: '28px' }}
            onClick={() => setTattooPopup('')}
          >
            X
          </button>
          {/* </div> */}
        </div>
        <img
          className=" border border-white"
          src={selectedTattoo.imageURL}
          style={{ height: '70vh' }}
        />
        <h3 className="p-3" style={{ fontStyle: 'italic' }}>
          {selectedTattoo.caption}
        </h3>
        {!addToCollection && (
          <button
            className="btn btn-success col-4 offset-4"
            onClick={() => setAddToCollection(true)}
          >
            Add to your collection
          </button>
        )}
        {addToCollection && (
          <div className="border border-white col-8 offset-2 mb-3 pt-3 pb-3">
            <h2 className="righteous">Add to your collection</h2>
            <form className="mb-3 " onSubmit={handleCollectionSubmit}>
              <div className="mb-3 col-6 offset-3">
                <label className="form-label" htmlFor="selectedCollection">
                  Add to your collection{' '}
                </label>
                <Select
                  name="selectedCollection"
                  components={animatedComponents}
                  isMulti
                  options={collections.map((collection) => {
                    return {
                      value: `${collection.title}`,
                      label: `${collection.title}`,
                    };
                  })}
                  onChange={handleCollectionChange}
                />
              </div>
              <button className="btn btn-success col-3" type="submit">
                Add
              </button>
              {message && <h4>{message}</h4>}
            </form>
            <div className="d-flex flex-column align-items-center">
              <button
                className="btn btn-success col-3"
                onClick={showCollectionFormButton}
              >
                New collection
              </button>
            </div>
            {showCollectionForm && (
              <div className="card-body col-6 offset-3  mb-2">
                <h2 className="righteous">Create a collection</h2>

                <form className="mb-3" onSubmit={handleNewCollectionSubmit}>
                  <div className="mb-3">
                    <label className="form-label" htmlFor="username">
                      Collection name:{' '}
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      name="title"
                      value={collectionTitle}
                      required
                      autoFocus
                      onChange={(e) => setCollectionTitle(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label" htmlFor="username">
                      Description:{' '}
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      name="description"
                      value={collectionDescription}
                      required
                      autoFocus
                      onChange={(e) => setCollectionDescription(e.target.value)}
                    />
                  </div>

                  <button className="btn btn-success" type="submit">
                    Create
                  </button>
                  {message && <h4>{message}</h4>}
                </form>
              </div>
            )}
          </div>
        )}
        {!artist && (
          <h3 className="righteous">
            Visit {selectedTattoo.artist.firstName}'s profile{' '}
            <Link to={`/${selectedTattoo.artist._id}/artist-profile`}>
              here
            </Link>
          </h3>
        )}
      </div>
    </Fade>
    // </div>
  );
}
