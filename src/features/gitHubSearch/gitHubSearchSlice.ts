import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getApiErrors } from '~/api/common';
import { ApiError } from '~/api/common.types';
import { fetchRepos } from '~/api/gitHubSearchAPI';
import { FetchReposResponse } from '~/api/gitHubSearchAPI.types';
import { makeRequestExtraReducer, makeRequestStateProperty, RequestList, RequestStateProperty } from '~/store/helpers';

const SLICE_NAME = 'gitHubSearch';

interface IS {
  fetchReposRequest: RequestStateProperty<FetchReposResponse, ApiError>;
}

const initialState: IS = {
  fetchReposRequest: makeRequestStateProperty(),
};

const { actions, reducer, selectors } = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    clear: () => initialState,
  },
  extraReducers: (builder) => {
    makeRequestExtraReducer<RequestList<IS>>(builder, fetchReposThunk, 'fetchReposRequest');
  },
  selectors: {
    isLoading: (state) => state.fetchReposRequest.isLoading,
  },
});

interface FetchReposThunkPayload {
  search: string;
  page: number;
  perPage: number;
  sort: string | null;
  order: string | null;
}

// Санка для запроса поиска по репозиториям
const fetchReposThunk = createAsyncThunk(
  `SLICE_NAME/fetchCommentsThunk`,
  async ({ page, search, perPage, order, sort }: FetchReposThunkPayload, store) => {
    try {
      const res = await fetchRepos({ page, search, perPage, order, sort });
      return store.fulfillWithValue(res);
    } catch (e: unknown) {
      return store.rejectWithValue(getApiErrors(e));
    }
  },
);

export const gitHubSearchSlice = { actions, selectors, thunks: { fetchReposThunk } } as const;

export const gitHubSearchReducer = reducer;
