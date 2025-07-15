import { Proxy } from "./Proxy";



export async function GetAllCategory(request) {

    return await Proxy("post", "/category/get-all", request);
}

export async function GetAllCategoryFK(request) {

    return await Proxy("post", "/category/get-all-fk", request);
}

export async function SaveCategory(request) {

    return await Proxy("post", "/category/create", request);
}
export async function SeachCategory(id, request) {

    return await Proxy("post", "/category/search/" + id, request);
}

export async function UpdateCategory(id, request) {

    return await Proxy("post", "/category/update/" + id, request);
}

export async function DeleteCategory(id, request) {

    return await Proxy("post", "/category/delete/" + id, request);
}