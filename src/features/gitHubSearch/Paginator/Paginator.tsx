import { Box, Button, MenuItem, Select } from '@mui/material';
import styles from './Paginator.module.scss';
import { ChevronLeftFilledIcon, ChevronRightFilledIcon } from '~/assets/icons';

interface PaginatorProps {
  onPageChange: (page: number) => void;
  onChangePerPage: (perPage: number) => void;
  page: number;
  pageCount: number;
  disabled: boolean;
  perPage: number;
}

const PER_PAGE_VALUES = Array(16)
  .fill(null)
  .map((_, i) => i + 5);

export function Paginator({ onPageChange, page, disabled, pageCount, onChangePerPage, perPage }: PaginatorProps) {
  const handleGoToFirstPage = () => {
    if (page !== 1) {
      onPageChange(1);
    }
  };

  const handleGoToLastPage = () => {
    if (page !== pageCount) {
      onPageChange(pageCount);
    }
  };

  const handleGoToToPrevPage = () => {
    if (page - 1 > 0) {
      onPageChange(page - 1);
    }
  };

  const handleGoToNextPage = () => {
    if (page + 1 <= pageCount) {
      onPageChange(page + 1);
    }
  };

  return (
    <Box className={styles.Paginator}>
      <Box className={styles.perPage}>
        <Box>Строк на странице</Box>
        <Select
          onChange={(e) => onChangePerPage(+e.target.value)}
          value={perPage.toString()}
          className={styles.select}
          disabled={disabled}
          sx={{ boxShadow: 'none', '.MuiOutlinedInput-notchedOutline': { border: 0 } }}
        >
          {PER_PAGE_VALUES.map((el) => (
            <MenuItem key={el} value={el}>
              {el}
            </MenuItem>
          ))}
        </Select>
      </Box>
      <Box className={styles.page}>
        {page}
        {' из '}
        {pageCount}
      </Box>
      <Box className={styles.buttons}>
        <Button className={styles.btn} onClick={handleGoToFirstPage} disabled={disabled}>
          <ChevronLeftFilledIcon />
          <ChevronLeftFilledIcon />
        </Button>
        <Button className={styles.btn} onClick={handleGoToToPrevPage} disabled={disabled}>
          <ChevronLeftFilledIcon />
        </Button>

        <Button className={styles.btn} onClick={handleGoToNextPage} disabled={disabled}>
          <ChevronRightFilledIcon />
        </Button>
        <Button className={styles.btn} onClick={handleGoToLastPage} disabled={disabled}>
          <ChevronRightFilledIcon />
          <ChevronRightFilledIcon />
        </Button>
      </Box>
    </Box>
  );
}
