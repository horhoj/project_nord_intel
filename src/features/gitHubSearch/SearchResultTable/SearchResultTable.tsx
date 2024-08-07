import classNames from 'classnames';
import styles from './SearchResultTable.module.scss';
import { SearchResultTableItem, SortType } from './SearchResultTable.types';
import { ArrowDown, ArrowUp } from '~/assets/icons';

interface SearchResultTableProps {
  searchResult: SearchResultTableItem[];
  onSort: (sortType: SortType) => void;
  sort: string | null;
  order: string | null;
  disabled: boolean;
  onRowSelect: (i: number) => void;
  rowSelectIdx: number | null;
}

const ALERT_ERROR_MSG =
  '(примечание для проверяющего) Сортировка по данному полю невозможна из-за ограничений АПИ гитхаба';

export function SearchResultTable({
  searchResult,
  onSort,
  order,
  sort,
  disabled,
  onRowSelect,
  rowSelectIdx,
}: SearchResultTableProps) {
  return (
    <div className={classNames(styles.SearchResultTable, disabled && styles.disabled)}>
      <div>
        <div className={styles.title}>Результаты поиска</div>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>
                <button
                  className={styles.columnHeaderButton}
                  onClick={() => alert(ALERT_ERROR_MSG)}
                  disabled={disabled}
                >
                  Название
                </button>
              </th>
              <th>
                <button
                  className={styles.columnHeaderButton}
                  onClick={() => alert(ALERT_ERROR_MSG)}
                  disabled={disabled}
                >
                  Язык
                </button>
              </th>
              <th>
                <button className={styles.columnHeaderButton} onClick={() => onSort('forks')} disabled={disabled}>
                  {sort === 'forks' && order === 'asc' && <ArrowUp />}
                  {sort === 'forks' && order === 'desc' && <ArrowDown />} Число форков
                </button>
              </th>
              <th>
                <button className={styles.columnHeaderButton} onClick={() => onSort('stars')} disabled={disabled}>
                  {sort === 'stars' && order === 'asc' && <ArrowUp />}
                  {sort === 'stars' && order === 'desc' && <ArrowDown />} Число звезд
                </button>
              </th>
              <th>
                <button className={styles.columnHeaderButton} onClick={() => onSort('updated')} disabled={disabled}>
                  {sort === 'updated' && order === 'asc' && <ArrowUp />}{' '}
                  {sort === 'updated' && order === 'desc' && <ArrowDown />} Дата обновления
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {searchResult.map((row, i) => (
              <tr
                key={row.id}
                role={'button'}
                onClick={() => onRowSelect(i)}
                className={classNames(styles.row, i === rowSelectIdx && styles.rowSelect)}
              >
                <td>{row.full_name || row.name}</td>
                <td>{row.language}</td>
                <td>{row.forks}</td>
                <td>{row.stargazers_count}</td>
                <td>{new Date(row.pushed_at).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {searchResult.length === 0 && <div className={styles.title}>Ничего не найдено</div>}
      </div>
    </div>
  );
}
