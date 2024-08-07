import { useMemo } from 'react';
import styles from './RepoCard.module.scss';
import { RepoCardData } from './RepoCard.types';
import { StarFilledIcon } from '~/assets/icons';
import { getUUID } from '~/utils/getUUID';

interface RepoCardProps {
  data: RepoCardData | null;
}

export function RepoCard({ data }: RepoCardProps) {
  const topics = useMemo(() => {
    if (data === null) {
      return null;
    }
    if (data.topics.length === 0) {
      return null;
    }
    return data.topics.map((el) => ({ id: getUUID(), value: el }));
  }, [data]);

  return (
    <div className={styles.RepoCard}>
      {data === null && <div className={styles.emptyRepo}>Выберите репозиторий</div>}
      {data !== null && (
        <>
          <div className={styles.repoName}>{data.full_name || data.name}</div>
          <div className={styles.langAndStarsWrapper}>
            <div className={styles.lang}>{data.language || 'не указан'}</div>
            <div className={styles.stars}>
              <StarFilledIcon /> {data.stargazers_count.toLocaleString()}
            </div>
          </div>
          {topics && (
            <div className={styles.topics}>
              {topics.map((el) => (
                <div key={el.id} className={styles.topic}>
                  {el.value}
                </div>
              ))}
            </div>
          )}
          <div className={styles.lic}>{data.license?.name || 'Лицензия не указана'}</div>
        </>
      )}
    </div>
  );
}
