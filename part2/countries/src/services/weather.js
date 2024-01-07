import axios from 'axios';

const baseUrl = 'https://api.openweathermap.org/data/2.5/weather';

const getWeather = ({ latitude, longitude }) => {
    const apiKey = import.meta.env.VITE_API_KEY;
    const url = `${baseUrl}?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
    return axios.get(url).then((response) => response.data);
};

export default { getWeather };
