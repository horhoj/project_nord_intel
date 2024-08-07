import { FormEvent, useEffect, useState } from 'react';
import classNames from 'classnames';
import styles from './Search.module.scss';

interface SearchProps {
  value: string;
  onSearch: (value: string) => void;
  disabled: boolean;
}
export function Search({ onSearch, value, disabled }: SearchProps) {
  const [searchValue, setSearchValue] = useState(value);

  useEffect(() => {
    setSearchValue(value);
  }, [value]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    onSearch(searchValue.trim());
  };

  return (
    <form className={classNames(styles.Search, disabled && styles.disabled)} noValidate={true} onSubmit={handleSubmit}>
      <input
        type="text"
        className={styles.searchInput}
        onChange={(e) => setSearchValue(e.target.value)}
        value={searchValue}
        autoFocus={true}
        placeholder={'Поисковый запрос'}
        readOnly={disabled}
      />
      <button type={'submit'} className={styles.searchBtn} disabled={disabled}>
        Искать
      </button>
    </form>
  );
}
