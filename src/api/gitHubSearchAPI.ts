import { memoize } from './../utils/memoize';
import { axiosInstance } from './apiTransport';
import { FetchReposResponse } from './gitHubSearchAPI.types';

export const fetchRepos = memoize(
  async ({
    page,
    search,
    perPage,
    order,
    sort,
  }: {
    search: string;
    page: number;
    perPage: number;
    sort: string | null;
    order: string | null;
  }) => {
    const params: Record<string, unknown> = { q: `name:${search}`, page, per_page: perPage };
    if (sort !== null) {
      params.sort = sort;
    }
    if (order !== null) {
      params.order = order;
    }
    const res = await axiosInstance.request<FetchReposResponse>({
      url: '/search/repositories',
      params,
    });

    return res.data;
  },
);
