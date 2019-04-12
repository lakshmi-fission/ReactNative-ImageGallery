import { ACCESS_KEY } from './Constants';

/**
* this function returns the images data
*/
export function loadImages() {
    return fetch('https://api.unsplash.com/photos/?client_id=' + ACCESS_KEY)
        .then((response) => response.json())
        .then((responseJson) => {
            return responseJson;
        })
        .catch((error) => {
            console.error(error);
        });
}