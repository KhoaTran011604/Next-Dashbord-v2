import { Proxy } from './Proxy';

export async function GetAllTodo(request) {
  return await Proxy('post', '/todo/get-all', request);
}

export async function GetCompletedTodo(request) {
  return await Proxy('post', '/todo/get-completed', request);
}

export async function GetAllTodoFK(request) {
  return await Proxy('post', '/todo/get-all-fk', request);
}

export async function CreateTodo(request) {
  return await Proxy('post', '/todo/create', request);
}
export async function SeachTodo(id, request) {
  return await Proxy('post', '/todo/search/' + id, request);
}

export async function UpdateTodo(id, request) {
  return await Proxy('post', '/todo/update/' + id, request);
}

export async function CompletedTodo(id, request = {}) {
  return await Proxy('post', '/todo/completed/' + id, request);
}

export async function DeleteTodo(id, request = {}) {
  return await Proxy('post', '/todo/delete/' + id, request);
}

export async function GetAllTodo_WithoutPanigation(request) {
  return await Proxy('post', '/todo/get-all-no-panigation', request);
}
export async function GetCompletedTodo_WithoutPanigation(request) {
  return await Proxy('post', '/todo/get-completed-no-panigation', request);
}
