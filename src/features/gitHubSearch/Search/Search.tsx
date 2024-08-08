import { FormEvent, useEffect, useState } from 'react';
import classNames from 'classnames';
import { Box, Button, Input } from '@mui/material';
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
    <Box
      component={'form'}
      className={classNames(styles.Search, disabled && styles.disabled)}
      noValidate={true}
      onSubmit={handleSubmit}
    >
      <Input
        type="text"
        className={styles.searchInput}
        onChange={(e) => setSearchValue(e.target.value)}
        value={searchValue}
        autoFocus={true}
        placeholder={'Поисковый запрос'}
        readOnly={disabled}
        disableUnderline={true}
      />
      <Button type={'submit'} className={styles.searchBtn} disabled={disabled}>
        Искать
      </Button>
    </Box>
  );
}
