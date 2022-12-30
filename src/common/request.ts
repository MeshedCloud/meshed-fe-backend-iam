import { request } from '@@/exports';
import { Method, PageInfo, PageParams, Response } from '@/common/models';
import { Convert, Struct, toTree } from '@/common/tree';

export class Request {
  static async getPage<T>(uri: string, params: PageParams & {}, options?: { [key: string]: any }) {
    const response = await request<PageInfo<T>>(uri, {
      method: Method.GET,
      params: {
        ...params,
      },
      ...(options || {}),
    });
    // response.total = response.totalCount;
    console.log(response);
    return response;
  }

  static async getList<T>(uri: string, params: {}, options?: { [key: string]: any }) {
    const response = await request<PageInfo<T>>(uri, {
      method: Method.GET,
      params: {
        ...params,
      },
      ...(options || {}),
    });
    // response.total = response.totalCount;
    console.log(response);
    return response;
  }

  static async get<T>(uri: string, params: {}, options?: { [key: string]: any }) {
    return await request<Response<T>>(uri, {
      method: Method.GET,
      params: {
        ...params,
      },
      ...(options || {}),
    });
  }

  static async getTree<T>(
    uri: string,
    params: {},
    struct: Struct,
    convert: Convert | undefined,
    options?: { [key: string]: any },
  ) {
    const response = await request<PageInfo<T>>(uri, {
      method: Method.GET,
      params: {
        ...params,
      },
      ...(options || {}),
    });
    response.data = toTree(response.data, struct, convert);
    return response;
  }

  static async getConvertTree<T>(
    uri: string,
    params: {},
    convert: Convert | undefined,
    options?: { [key: string]: any },
  ) {
    const struct: Struct = {
      id: 'id',
      parent: 'parentId',
      children: 'children',
    };
    return this.getTree<T>(uri, params, struct, convert, options);
  }

  static async getDefaultTree<T>(uri: string, params: {}, options?: { [key: string]: any }) {
    const struct: Struct = {
      id: 'id',
      parent: 'parentId',
      children: 'children',
    };
    return this.getTree<T>(uri, params, struct, undefined, options);
  }
}

export async function getData<T>(response: Response<T> | undefined, check: boolean, obj: T) {
  return check && response && response.success && response.data ? response.data : obj;
}
