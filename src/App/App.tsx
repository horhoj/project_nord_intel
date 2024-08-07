import styles from './App.module.scss';
import { GitHubSearchWidget } from '~/features/gitHubSearch/GitHubSearchWidget';

export function App() {
  return (
    <>
      <div className={styles.App}>
        <GitHubSearchWidget />
      </div>
    </>
  );
}
