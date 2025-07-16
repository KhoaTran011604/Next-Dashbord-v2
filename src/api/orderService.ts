import { Proxy } from "./Proxy";



export async function GetAllOrder(request) {

    return await Proxy("post", "/order/get-all", request);
}

export async function GetAllOrderFK(request) {

    return await Proxy("post", "/order/get-all-fk", request);
}

export async function SaveOrder(request) {

    return await Proxy("post", "/order/create", request);
}
export async function SeachOrder(id, request) {

    return await Proxy("post", "/order/search/" + id, request);
}

export async function UpdateOrder(id, request) {

    return await Proxy("post", "/order/update/" + id, request);
}

export async function SaveOrder_UploadMutli(request) {

    return await Proxy("post_multi", "/order/create-upload-multi", request);
}
export async function UpdateOrder_UploadMutli(id, request) {

    return await Proxy("post_multi", "/order/update-upload-multi/" + id, request);
}


export async function DeleteOrder(id, request) {

    return await Proxy("post", "/order/delete/" + id, request);
}