import axios from "axios";

const API_URL = "https://localhost:7275/api/";

const user = JSON.parse(localStorage.getItem('user'));

const getPublicContent = () => {
    return axios.get(API_URL + "pokemon");
};

const getAdministradorBoard = async () => {
    return await axios.get(API_URL + "pokemon", { headers: { Authorization: 'Bearer ' + user.token } });
};

const UserService = {
    getPublicContent,
    getAdministradorBoard
};

export default UserService;