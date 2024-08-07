import { FetchReposResponse } from '~/api/gitHubSearchAPI.types';

export type RepoCardData = Pick<
  FetchReposResponse['items'][number],
  'id' | 'language' | 'name' | 'full_name' | 'stargazers_count' | 'license' | 'topics'
>;
