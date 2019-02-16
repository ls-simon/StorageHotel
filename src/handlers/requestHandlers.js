import axios from 'axios';

export function api(){return "http://localhost:8080/api/";}

export function get(path, callback) {
    
    axios.get(api() + path).then((response) => {
        callback(response.data);   
    }).catch(err => {
        handleRequestError(err);
    });
}

export function post(path, body, callback) {

    axios.post(api() + path, body).then((response) => {
        callback(response.data);   
    }).catch(err => {
        handleRequestError(err);
    });
}

export function del(path, callback) {

    axios.delete(api() + path).then((response) => {
        callback(response.data);   
    }).catch(err => {
        handleRequestError(err);
    });
}

export function put(path, body, callback) {

    axios.put(api() + path, body).then((response) => {
        callback(response.data);   
    }).catch(err => {
        handleRequestError(err);
    });
}

export function handleRequestError(err) {console.log("An error ocurred: " + err)}



