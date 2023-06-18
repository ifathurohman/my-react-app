import http from './service';

const getAll = () => {
  return http.get('/user');
};

const get = id => {
  return http.get(`/user/${id}`);
};

const create = (data) => {
  return http.post('/user', {data});
};

const update = (id, data) => {
  console.log(`ini data nya ` + JSON.stringify(data));
  return http.put(`/user/${id}`, data);
};

const remove = (id) => {
  console.log(id);
  return http.delete(`/user/${id}`);
};

const removeAll = () => {
  return http.delete(`/user`);
};

const findByName = (name) => {
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
