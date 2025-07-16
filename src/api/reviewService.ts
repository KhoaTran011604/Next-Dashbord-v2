import { Proxy } from "./Proxy";



export async function GetAllReview(request) {

    return await Proxy("post", "/review/get-all", request);
}

export async function GetAllReviewFK(request) {

    return await Proxy("post", "/review/get-all-fk", request);
}

export async function SaveReview(request) {

    return await Proxy("post", "/review/create", request);
}
export async function SeachReview(id, request) {

    return await Proxy("post", "/review/search/" + id, request);
}

export async function UpdateReview(id, request) {

    return await Proxy("post", "/review/update/" + id, request);
}

export async function DeleteReview(id, request) {

    return await Proxy("post", "/review/delete/" + id, request);
}