 export const API_URL = "http://localhost:3000"
 //export const API_URL = "https://glweb-mevnauth.herokuapp.com"
 
export const API = {
    task: {
        get: API_URL + "/task/getall",
        gettaskday: API_URL + "/task/gettaskday",
        findone: API_URL + "/task/findone",
        create: API_URL + "/task/create",
        edit: API_URL + "/task/edit",
        delete:  API_URL + "/task/delete"
    },
    category: {
        get: API_URL + "/category/getall",
        findone: API_URL + "/category/findone",
        create: API_URL + "/category/create",
        edit: API_URL + "/category/edit",
        delete:  API_URL + "/category/delete"
    }
}

 export const config = {
     headers: {
         "Content-Type": "application/json"
     }
 }