import React, {useState, useEffect} from 'react';
import UserDataService from '../service/userService';
import Button from 'react-bootstrap/Button';

const User = props => {
  const initialUserState = {
    CompanyID: '',
    Email: '',
    Image: '',
    Name: '',
    Password: '',
    UserID: '',
    Username: '',
  };
  const [currentUser, setCurrentUser] = useState(initialUserState);
  const [message, setMessage] = useState('');
  const [image, setImage] = useState('');
  const [imagePreview, setImagePreview] = useState(null);

  const getUser = id => {
    UserDataService.get(id)
      .then(response => {
        setCurrentUser(response.data);
        setImagePreview(response.data.Image);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    getUser(props.match.params.id);
  }, [props.match.params.id]);

  const handleInputChange = event => {
    const {name, value} = event.target;
    setCurrentUser({...currentUser, [name]: value});
  };

  const onImageUpload = e => {
    const file = e.target.files[0];
    setImage(file);
    setImagePreview(URL.createObjectURL(file));
    console.log(file);
  };

  const updateUser = () => {
    const data = new FormData();
    data.append('CompanyID', currentUser.CompanyID);
    data.append('Email', currentUser.Email);
    data.append('Image', image);
    data.append('Name', currentUser.Name);
    data.append('Password', currentUser.Password);
    data.append('UserID', currentUser.UserID);
    data.append('Username', currentUser.Username);
    UserDataService.update(currentUser._id, data)
      .then(response => {
        props.history.push('/user');
        console.log(response.data);
        setMessage('The User was updated successfully!');
      })
      .catch(e => {
        console.log(e);
      });
  };

  const deleteUser = () => {
    UserDataService.remove(currentUser._id)
      .then(response => {
        console.log(response.data);
        props.history.push('/user');
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentUser ? (
        <div className="edit-form">
          <h4>User</h4>
          <form>
            <div className="form-group">
              <label htmlFor="CompanyID">CompanyID</label>
              <input
                type="text"
                className="form-control"
                id="CompanyID"
                name="CompanyID"
                value={currentUser.CompanyID}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="Email">Email</label>
              <input
                type="text"
                className="form-control"
                id="Email"
                name="Email"
                value={currentUser.Email}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="Image">Image</label>
              <input
                type="file"
                id="Image"
                name="Image"
                className="form-control"
                onChange={e => onImageUpload(e)}
              />
              <img src={imagePreview} width={300} />
            </div>
            <div className="form-group">
              <label htmlFor="Name">Name</label>
              <input
                type="text"
                className="form-control"
                id="Name"
                name="Name"
                value={currentUser.Name}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="Password">Password</label>
              <input
                type="text"
                className="form-control"
                id="Password"
                name="Password"
                value={currentUser.Password}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="UserID">UserID</label>
              <input
                type="text"
                className="form-control"
                id="UserID"
                name="UserID"
                value={currentUser.UserID}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="Username">Username</label>
              <input
                type="text"
                className="form-control"
                id="Username"
                name="Username"
                value={currentUser.Username}
                onChange={handleInputChange}
              />
            </div>
          </form>
          <div className="mt-2 d-grid gap-2">
            <Button
              type="submit"
              variant="outline-primary"
              onClick={updateUser}>
              Update
            </Button>

            <Button variant="outline-danger" onClick={deleteUser}>
              Delete
            </Button>
          </div>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a User...</p>
        </div>
      )}
    </div>
  );
};

export default User;
