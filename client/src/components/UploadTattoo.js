import React, { useState } from 'react';
import Fade from 'react-reveal/Fade';
import service from '../api/service';
import axios from 'axios';

export default function UploadTattoo({ setShowComponent }) {
  const [imageURL, setImageURL] = useState('');
  const [caption, setCaption] = useState('');
  const [tags, setTags] = useState('');

  const handleTagChange = (e) => {
    const tags = e.target.value;
    let split = tags.split(',');
    setTags(split);
  };

  const handleFileUpload = (e) => {
    console.log('The file to be uploaded is: ', e.target.files[0]);

    const uploadData = new FormData();

    uploadData.append('imageURL', e.target.files[0]);

    service
      .handleUpload(uploadData)
      .then((response) => {
        setImageURL(response.secure_url);
      })
      .catch((err) => console.log('Error when uploading the file: ', err));
  };

  const handleImageUploadSubmit = (e) => {
    e.preventDefault();

    service
      .saveNewTattoo(imageURL, caption, tags)
      .then((response) => {
        setImageURL(response.imageURL);
      })
      .catch((err) => console.log(err));

    axios
      .post('/api/tattoos/create', { imageURL, caption, tags })
      .then((response) => {
        console.log(response);
        setImageURL(response.imageURL);
        setCaption('');
        setTags('');
        setShowComponent('artistWork');
      })
      .catch((err) => {
        return err.response.data;
      });
  };
  return (
    <div
      className="col-5 mt-3 card mb-3 bg-dark border border-white border-4"
      style={{ height: '86vh', overflowX: 'auto' }}
    >
      <Fade bottom duration={1000} delay={600} distance="30px">
        <div className="card shadow mt-3 bg-dark border border-white border-4">
          <div className=" bg-white   text-dark p-2 rounded mb-3">
            <h2 className="userHeading text-dark">
              Upload an image of your work
            </h2>
          </div>

          <form
            className="bg-dark col-8 offset-2"
            onSubmit={handleImageUploadSubmit}
          >
            <div className="mb-3">
              <label className="form-label" htmlFor="image">
                Image:{' '}
              </label>
              <input
                className="form-control"
                type="file"
                name="imageURL"
                onChange={handleFileUpload}
              />

              {imageURL && (
                <img src={imageURL} alt="" style={{ height: '200px' }} />
              )}
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="caption">
                Caption:{' '}
              </label>
              <input
                className="form-control"
                type="text"
                name="caption"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="tags">
                Tags (separate each tag with a comma):{' '}
              </label>
              <input
                className="form-control"
                type="text"
                name="tags"
                // value={tags}
                onChange={handleTagChange}
              />
            </div>
            <button
              className="btn btn-success btn-block col-5 mb-5 userHeading"
              type="submit"
            >
              Upload
            </button>
          </form>
        </div>
      </Fade>
      {/* </div> */}
    </div>
  );
}
