import axios from 'axios';




class TripDataService {

    getAll(token) {
        axios.defaults.headers.common["Authorization"] = "Token " + token;
        return axios.get('http://ladeforsuccess.pythonanywhere.com/api/trips/');
    }


    createTrip(data, token) {
        axios.defaults.headers.common["Authorization"] = "Token " + token;
        return axios.post("http://ladeforsuccess.pythonanywhere.com/api/trips/", data);
    }


    updateTrip(id, data, token) {
        axios.defaults.headers.common["Authorization"] = "Token " + token;
        return axios.put(`http://ladeforsuccess.pythonanywhere.com/api/trips/${id}`, data);
    }


    deleteTrip(id, token) {
        axios.defaults.headers.common["Authorization"] = "Token " + token;
        return axios.delete(`http://ladeforsuccess.pythonanywhere.com/api/trips/${id}`);
    }


    completeTrip(id, token) {
        axios.defaults.headers.common["Authorization"] = "Token " + token;
        return axios.put(`http://ladeforsuccess.pythonanywhere.com/api/trips/${id}/complete`);
    }


    login(data) {
        return axios.post("http://ladeforsuccess.pythonanywhere.com/api/login/", data);
    }


    signup(data) {
        return axios.post("http://ladeforsuccess.pythonanywhere.com/api/signup/", data);
    }

}


export default new TripDataService();
















