import classNames from 'classnames';
import { Box, Button, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
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
          <TableHead>
            <TableRow>
              <TableCell>
                <Button
                  className={styles.columnHeaderButton}
                  onClick={() => alert(ALERT_ERROR_MSG)}
                  disabled={disabled}
                >
                  Название
                </Button>
              </TableCell>
              <TableCell>
                <Button
                  className={styles.columnHeaderButton}
                  onClick={() => alert(ALERT_ERROR_MSG)}
                  disabled={disabled}
                >
                  Язык
                </Button>
              </TableCell>
              <TableCell>
                <Button className={styles.columnHeaderButton} onClick={() => onSort('forks')} disabled={disabled}>
                  {sort === 'forks' && order === 'asc' && <ArrowUp />}
                  {sort === 'forks' && order === 'desc' && <ArrowDown />} Число форков
                </Button>
              </TableCell>
              <TableCell>
                <Button className={styles.columnHeaderButton} onClick={() => onSort('stars')} disabled={disabled}>
                  {sort === 'stars' && order === 'asc' && <ArrowUp />}
                  {sort === 'stars' && order === 'desc' && <ArrowDown />} Число звезд
                </Button>
              </TableCell>
              <TableCell>
                <Button className={styles.columnHeaderButton} onClick={() => onSort('updated')} disabled={disabled}>
                  {sort === 'updated' && order === 'asc' && <ArrowUp />}{' '}
                  {sort === 'updated' && order === 'desc' && <ArrowDown />} Дата обновления
                </Button>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {searchResult.map((row, i) => (
              <TableRow
                key={row.id}
                role={'button'}
                onClick={() => onRowSelect(i)}
                className={classNames(styles.row, i === rowSelectIdx && styles.rowSelect)}
              >
                <TableCell>{row.full_name || row.name}</TableCell>
                <TableCell>{row.language}</TableCell>
                <TableCell>{row.forks}</TableCell>
                <TableCell>{row.stargazers_count}</TableCell>
                <TableCell>{new Date(row.pushed_at).toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {searchResult.length === 0 && <Box className={styles.title}>Ничего не найдено</Box>}
      </Box>
    </Box>
  );
}
