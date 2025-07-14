
import api from '../lib/api';
import { BaseResponse, MetaDataStruct } from './BaseResponse';

export const Proxy = async <T = any>(
  method: string,
  endpoint: string,
  request: any = {},
  isUseToken = true
): Promise<BaseResponse<T>> => {
  try {
    const config = {
      headers: {} as Record<string, any>,
    };

    if (isUseToken) {
      const accessToken = localStorage.getItem('@accessToken');
      if (accessToken) {
        config.headers['Authorization'] = `Bearer ${accessToken}`;
      }
    }

    if (method.toLowerCase() === 'post_multi') {
      config.headers['Content-Type'] = 'multipart/form-data';
    }

    let response;

    switch (method.toLowerCase()) {
      case 'get':
        response = await api.get(endpoint);
        break;
      case 'post':
      case 'post_multi':
        response = await api.post(endpoint, request, config);
        break;
      case 'put':
        response = await api.put(endpoint, request, config);
        break;
      case 'delete':
        response = await api.delete(endpoint, { data: request, ...config });
        break;
      default:
        throw new Error(`Unsupported method: ${method}`);
    }

    return new BaseResponse<T>(
      response.data?.success,
      '',
      response.data?.data,
      response.data?.metaData || new MetaDataStruct()
    );
  } catch (err: any) {
    return new BaseResponse<T>(
      false,
      err?.response?.data?.message || 'Request failed',
      null,
      new MetaDataStruct()
    );
  }
};
