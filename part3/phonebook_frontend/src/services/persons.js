import axios from 'axios';

const baseUrl = '/api/persons';

const getAll = () => axios.get(baseUrl).then((response) => response.data);

const create = (person) =>
    axios.post(baseUrl, person).then((response) => response.data);

const update = (personId, person) =>
    axios
        .put(`${baseUrl}/${personId}`, person)
        .then((response) => response.data);

const remove = (personId) => axios.delete(`${baseUrl}/${personId}`);

export default { getAll, create, remove, update };
