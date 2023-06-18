import React, {useState} from 'react';
import UserDataService from '../service/userService';

const AddUser = () => {
  const initialUserState = {
    CompanyID: '',
    Email: '',
    Image: '',
    Name: '',
    Password: '',
    UserID: '',
    Username: '',
  };
  const [user, setUser] = useState(initialUserState);
  const [submitted, setSubmitted] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleInputChange = event => {
    const {name, value} = event.target;
    setUser({...user, [name]: value});
  };

  const saveUser = () => {
    const data = {
      CompanyID: user.CompanyID,
      Email: user.Email,
      Image: user.Image,
      Name: user.Name,
      Password: user.Password,
      UserID: user.UserID,
      Username: user.Username,
    };
    
    UserDataService.create(data)
      .then(response => {
        setUser({
          CompanyID: response.data.CompanyID,
          Email: response.data.Email,
          Image: response.data.Image,
          Name: response.data.Name,
          Password: response.data.Password,
          UserID: response.data.UserID,
          Username: response.data.Username,
        });
        // setSubmitted(true);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const newUser = () => {
    setUser(initialUserState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newUser}>
            Add
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="CompanyID">CompanyID</label>
            <input
              type="text"
              className="form-control"
              id="CompanyID"
              name="CompanyID"
              value={user.CompanyID}
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
              value={user.Email}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="Image">Image</label>
            <input
              type="file"
              className="form-control"
              id="Image"
              name="Image"
              value={user.Image}
              onChange={event => {
                console.log(event.target.files[0]);
                setSelectedImage(event.target.files[0]);
              }}
            />
            {selectedImage && (
              <div>
                <img
                  alt="not found"
                  width={'250px'}
                  src={URL.createObjectURL(selectedImage)}
                />
                <br />
                <button onClick={() => setSelectedImage(null)}>Remove</button>
              </div>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="Name">Name</label>
            <input
              type="text"
              className="form-control"
              id="Name"
              name="Name"
              value={user.Name}
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
              value={user.Password}
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
              value={user.UserID}
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
              value={user.Username}
              onChange={handleInputChange}
            />
          </div>

          <button onClick={saveUser} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default AddUser;
