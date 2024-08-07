import styles from './Paginator.module.scss';

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
    <div className={styles.Paginator}>
      <div className={styles.perPage}>
        <span>Строк на странице</span>
        <select
          onChange={(e) => onChangePerPage(+e.target.value)}
          value={perPage.toString()}
          className={styles.select}
          disabled={disabled}
        >
          {PER_PAGE_VALUES.map((el) => (
            <option key={el} value={el}>
              {el}
            </option>
          ))}
        </select>
      </div>
      <div className={styles.page}>
        {page}
        {' из '}
        {pageCount}
      </div>
      <div className={styles.buttons}>
        <button className={styles.btn} onClick={handleGoToFirstPage} disabled={disabled}>
          {'<<'}
        </button>
        <button className={styles.btn} onClick={handleGoToToPrevPage} disabled={disabled}>
          {'<'}
        </button>

        <button className={styles.btn} onClick={handleGoToNextPage} disabled={disabled}>
          {'>'}
        </button>
        <button className={styles.btn} onClick={handleGoToLastPage} disabled={disabled}>
          {'>>'}
        </button>
      </div>
    </div>
  );
}
