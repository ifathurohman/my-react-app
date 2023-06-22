import axios from 'axios';

const url = import.meta.env.VITE_API_SERVICE;

const http = axios.create({
  baseURL: url
});

http.defaults.headers.common['Content-Type'] = 'multipart/form-data';

const getAll = () => {
  return http.get('/user');
};

const get = id => {
  return http.get(`/user/${id}`);
};

const create = data => {
  return http.post(`/user`, data);
};

const update = (id, data) => {
  return http.put(`/user/${id}`, data);
};

const remove = id => {
  console.log(id);
  return http.delete(`/user/${id}`);
};

const removeAll = () => {
  return http.delete(`/user`);
};

const findByName = (name) => {
  console.log(name)
  return http.get(`/user?search=${name}`);
};

const userService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByName,
};

export default userService;
