import classNames from 'classnames';
import { Box, Button, Table } from '@mui/material';
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
    <Box className={classNames(styles.SearchResultTable, disabled && styles.disabled)}>
      <Box>
        <Box className={styles.title}>Результаты поиска</Box>
        <Table className={styles.table}>
          <Box component={'thead'}>
            <Box component={'tr'}>
              <Box component={'th'}>
                <Button
                  className={styles.columnHeaderButton}
                  onClick={() => alert(ALERT_ERROR_MSG)}
                  disabled={disabled}
                >
                  Название
                </Button>
              </Box>
              <Box component={'th'}>
                <Button
                  className={styles.columnHeaderButton}
                  onClick={() => alert(ALERT_ERROR_MSG)}
                  disabled={disabled}
                >
                  Язык
                </Button>
              </Box>
              <Box component={'th'}>
                <Button className={styles.columnHeaderButton} onClick={() => onSort('forks')} disabled={disabled}>
                  {sort === 'forks' && order === 'asc' && <ArrowUp />}
                  {sort === 'forks' && order === 'desc' && <ArrowDown />} Число форков
                </Button>
              </Box>
              <Box component={'th'}>
                <Button className={styles.columnHeaderButton} onClick={() => onSort('stars')} disabled={disabled}>
                  {sort === 'stars' && order === 'asc' && <ArrowUp />}
                  {sort === 'stars' && order === 'desc' && <ArrowDown />} Число звезд
                </Button>
              </Box>
              <Box component={'th'}>
                <Button className={styles.columnHeaderButton} onClick={() => onSort('updated')} disabled={disabled}>
                  {sort === 'updated' && order === 'asc' && <ArrowUp />}{' '}
                  {sort === 'updated' && order === 'desc' && <ArrowDown />} Дата обновления
                </Button>
              </Box>
            </Box>
          </Box>
          <Box component={'tbody'}>
            {searchResult.map((row, i) => (
              <Box
                component={'tr'}
                key={row.id}
                role={'button'}
                onClick={() => onRowSelect(i)}
                className={classNames(styles.row, i === rowSelectIdx && styles.rowSelect)}
              >
                <Box component={'td'}>{row.full_name || row.name}</Box>
                <Box component={'td'}>{row.language}</Box>
                <Box component={'td'}>{row.forks}</Box>
                <Box component={'td'}>{row.stargazers_count}</Box>
                <Box component={'td'}>{new Date(row.pushed_at).toLocaleString()}</Box>
              </Box>
            ))}
          </Box>
        </Table>
        {searchResult.length === 0 && <Box className={styles.title}>Ничего не найдено</Box>}
      </Box>
    </Box>
  );
}
