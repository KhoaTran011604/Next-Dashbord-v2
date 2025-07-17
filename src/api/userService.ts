import { Proxy } from "./Proxy";



export async function GetAllUser(request) {

    return await Proxy("post", "/user/get-all", request);
}

export async function GetAllUserFK(request) {

    return await Proxy("post", "/user/get-all-fk", request);
}

export async function SaveUser(request) {

    return await Proxy("post", "/user/create", request);
}
export async function SeachUser(id, request) {

    return await Proxy("post", "/user/search/" + id, request);
}

export async function UpdateUser(id, request) {

    return await Proxy("post", "/user/update/" + id, request);
}


export async function SaveUser_UploadMutli(request) {

    return await Proxy("post_multi", "/user/create-upload-multi", request);
}
export async function UpdateUser_UploadMutli(id, request) {

    return await Proxy("post_multi", "/user/update-upload-multi/" + id, request);
}
export async function DeleteUser(id, request) {

    return await Proxy("post", "/user/delete/" + id, request);
}

export async function ChangePassword(id, request) {

    return await Proxy("post", "/user/change-password/" + id, request);
}

export async function ChangeStatus(id, request) {

    return await Proxy("post", "/user/change-status/" + id, request);
}