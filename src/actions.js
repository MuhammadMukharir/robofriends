import { 
    CHANGE_SEARCH_FIELD,
    REQUEST_ROBOTS_PENDING,
    REQUEST_ROBOTS_SUCCESS,
    REQUEST_ROBOTS_FAILED
} from './constants';

export const setSearchField = (text) => ({
    // sebenarnya menggunakan
    // type : 'CHANGE_SEARCH_FIELD'
    // juga bisa, tetapi untuk menghindari error atau bug
    // maka digunakan variable bukan string (dibuatlah constants.js)
    // karena jika memakai string jika salah ketik(mispell) error bisa tidak terdeteksi
    type: CHANGE_SEARCH_FIELD,
    payload: text
})

export const requestRobots = (dispatch) => {
    dispatch({ type: REQUEST_ROBOTS_PENDING });
    fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(data => dispatch({ type: REQUEST_ROBOTS_SUCCESS, payload: data }))
        .catch(error => dispatch({ type: REQUEST_ROBOTS_FAILED, payload: error }));
}
