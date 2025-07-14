import { Proxy } from './Proxy';

export async function apiLogin(request) {
  return await Proxy('post', '/login', request, false);
}

export async function SignUp(request) {
  return await Proxy('post', '/signup', request, false);
}

export async function UpdateUserProfile(id, request) {
  return await Proxy(
    'post_multi',
    '/update-user-profile/' + id,
    request,
    false
  );
}

export async function SeachUserProfiles(id, request) {
  return await Proxy('post', '/search-profile/' + id, request, false);
}

export async function AuthVertify(request) {
  return await Proxy('post', '/auth-vertify/', request, true);
}

export async function RefreshToken(request) {
  return await Proxy('post', '/refresh-token/', request, false);
}
