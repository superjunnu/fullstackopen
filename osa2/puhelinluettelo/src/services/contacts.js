import axios from "axios";

const baseURL = "http://localhost:3001/persons";

// Hakee kaikki olemassaolevat tiedot JSON serveriltä

const getAll = () => {
  const request = axios.get(baseURL);
  return request.then((response) => response.data);
};

// Lisää uuden tiedon JSON serverille eli db.json tiedostoon

const create = (newNameObject) => {
  const request = axios.post(baseURL, newNameObject);
  return request.then((response) => response.data);
};

// Päivittää olemassaolevan vanhan tiedon uuteen

const update = (id, newNameObject) => {
  const request = axios.put(`${baseURL}/${id}`, newNameObject);
  return request.then((response) => response.data);
};

export default { getAll, create, update };
