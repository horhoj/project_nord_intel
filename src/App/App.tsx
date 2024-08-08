import { Box } from '@mui/material';
import styles from './App.module.scss';
import { GitHubSearchWidget } from '~/features/gitHubSearch/GitHubSearchWidget';

export function App() {
  return (
    <>
      <Box className={styles.App}>
        <GitHubSearchWidget />
      </Box>
    </>
  );
}
