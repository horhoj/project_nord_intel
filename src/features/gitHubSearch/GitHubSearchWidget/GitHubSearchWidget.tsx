import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search } from '../Search';
import { getLastPage, getSearchParams, getSortParams, prepareParams, prepareParamsToURL } from '../helpers';
import { gitHubSearchSlice } from '../gitHubSearchSlice';
import { SearchResultTable } from '../SearchResultTable';
import { Paginator } from '../Paginator';
import { WelcomeMsg } from '../WelcomeMsg';
import { RepoCard } from '../RepoCard';
import styles from './GitHubSearchWidget.module.scss';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { Spinner } from '~/ui/Spinner';

export function GitHubSearchWidget() {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const fetchReposRequest = useAppSelector((state) => state.gitHubSearch.fetchReposRequest);
  const isLoading = useAppSelector(gitHubSearchSlice.selectors.isLoading);

  const [rowSelectIdx, setRowSelectIdx] = useState<number | null>(null);

  const params = getSearchParams(searchParams);

  useEffect(() => {
    if (params.search) {
      const params = getSearchParams(searchParams);
      dispatch(gitHubSearchSlice.thunks.fetchReposThunk(params));
    }
  }, []);

  const lastPage =
    fetchReposRequest.data === null ? null : getLastPage(fetchReposRequest.data.total_count, params.perPage);

  const handleSearch = (search: string) => {
    if (search) {
      const actualParams = prepareParams({ ...params, search, page: 1 });
      dispatch(gitHubSearchSlice.thunks.fetchReposThunk(actualParams));
      setSearchParams(prepareParamsToURL(actualParams), { replace: true });
    } else {
      dispatch(gitHubSearchSlice.actions.clear());
      setSearchParams({}, { replace: true });
    }
    setRowSelectIdx(null);
  };

  const handleChangePage = (page: number) => {
    const actualParams = prepareParams({ ...params, page });
    dispatch(gitHubSearchSlice.thunks.fetchReposThunk(actualParams));
    setSearchParams(prepareParamsToURL(actualParams), { replace: true });
    setRowSelectIdx(null);
  };

  const handleChangePerPage = (perPage: number) => {
    const actualParams = prepareParams({ ...params, perPage, page: 1 });
    dispatch(gitHubSearchSlice.thunks.fetchReposThunk(actualParams));
    setSearchParams(prepareParamsToURL(actualParams), { replace: true });
    setRowSelectIdx(null);
  };

  const handleSort = (sortType: string) => {
    const { order, sort } = getSortParams(sortType, params.sort, params.order);
    const actualParams = prepareParams({ ...params, order, sort });
    dispatch(gitHubSearchSlice.thunks.fetchReposThunk(actualParams));
    setSearchParams(prepareParamsToURL(actualParams), { replace: true });
    setRowSelectIdx(null);
  };

  return (
    <>
      <Spinner isShow={isLoading} />
      <div className={styles.GitHubSearchWidget}>
        <Search value={params.search} onSearch={handleSearch} disabled={isLoading} />
        {fetchReposRequest.error && (
          <div className={styles.error}>
            <div>
              <strong>Ошибка получения данных:</strong>
            </div>
            <div>{fetchReposRequest.error.errorResponseMessage || fetchReposRequest.error.errorMessage}</div>
          </div>
        )}
        <div className={styles.results}>
          <div className={styles.resultTable}>
            {params.search === '' && <WelcomeMsg />}
            {fetchReposRequest.data !== null && (
              <>
                <SearchResultTable
                  searchResult={fetchReposRequest.data.items}
                  onSort={handleSort}
                  order={params.order}
                  sort={params.sort}
                  disabled={isLoading}
                  onRowSelect={(i) => setRowSelectIdx(i)}
                  rowSelectIdx={rowSelectIdx}
                />
                {lastPage !== null && (
                  <Paginator
                    page={params.page}
                    pageCount={lastPage}
                    onPageChange={handleChangePage}
                    disabled={isLoading}
                    onChangePerPage={handleChangePerPage}
                    perPage={params.perPage}
                  />
                )}
              </>
            )}
          </div>
          {fetchReposRequest.data !== null && (
            <RepoCard data={rowSelectIdx === null ? null : fetchReposRequest.data.items[rowSelectIdx] ?? null} />
          )}
        </div>
      </div>
    </>
  );
}
