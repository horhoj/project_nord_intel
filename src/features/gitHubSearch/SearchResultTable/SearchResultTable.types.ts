import { FetchReposResponse } from '~/api/gitHubSearchAPI.types';

export type SearchResultTableItem = Pick<
  FetchReposResponse['items'][number],
  'id' | 'stargazers_count' | 'language' | 'forks' | 'pushed_at' | 'name' | 'full_name'
>;

export type SortType = 'stars' | 'forks' | 'updated';
