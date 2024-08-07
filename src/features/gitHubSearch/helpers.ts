import { PER_PAGE } from '~/api/const';

export const getSearchParams = (searchParams: URLSearchParams) => {
  const search = searchParams.get('search') ?? '';

  const pageFromSearchParams = searchParams.get('page');
  let page = 1;
  if (pageFromSearchParams) {
    const tmp = Number.parseInt(pageFromSearchParams);
    if (Number.isFinite(tmp)) {
      page = tmp;
    }
  }

  const perPageFromSearchParams = searchParams.get('perPage');
  let perPage = PER_PAGE;
  if (perPageFromSearchParams) {
    const tmp = Number.parseInt(perPageFromSearchParams);
    if (Number.isFinite(tmp)) {
      perPage = tmp;
    }
  }

  const sort = searchParams.get('sort') ?? null;
  const order = searchParams.get('order') ?? null;

  return {
    search,
    page,
    perPage,
    sort,
    order,
  };
};

type Params = ReturnType<typeof getSearchParams>;

export const prepareParamsToURL = (params: Params): Record<string, string> => {
  const result: Record<string, string> = {};
  Object.keys(params).forEach((key) => {
    const value = params[key as keyof typeof params];
    if (value !== null) {
      if (typeof value === 'string') {
        result[key] = value;
      }
      if (typeof value === 'number') {
        result[key] = value.toString();
      }
    }
  });

  return result;
};

export const prepareParams = (params: Params): Params => params;

export const getLastPage = (total: number, perPage: number) => {
  // согласно ограничению гитхаба на 1000 элементов в поиске
  let actualTotal = 1000;
  if (total <= actualTotal) {
    actualTotal = total;
  }
  const lastPage = Math.ceil(actualTotal / perPage);

  return lastPage;
};

export const getSortParams = (sortType: string, currentSort: string | null, currentOrder: string | null) => {
  let sort: string | null = sortType;
  let order: string | null = null;
  if (sortType !== currentSort) {
    order = 'asc';
  }
  if (sortType === currentSort) {
    if (currentOrder === 'asc') {
      order = 'desc';
    }
    if (currentOrder === 'desc') {
      order = null;
      sort = null;
    }
    if (currentOrder === null) {
      order = 'asc';
    }
  }
  return { order, sort };
};
