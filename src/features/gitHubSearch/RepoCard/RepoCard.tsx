import { useMemo } from 'react';
import { Box } from '@mui/material';
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
    <Box className={styles.RepoCard}>
      {data === null && <Box className={styles.emptyRepo}>Выберите репозиторий</Box>}
      {data !== null && (
        <>
          <Box className={styles.repoName}>{data.full_name || data.name}</Box>
          <Box className={styles.langAndStarsWrapper}>
            <Box className={styles.lang}>{data.language || 'не указан'}</Box>
            <Box className={styles.stars}>
              <StarFilledIcon /> {data.stargazers_count.toLocaleString()}
            </Box>
          </Box>
          {topics && (
            <Box className={styles.topics}>
              {topics.map((el) => (
                <Box key={el.id} className={styles.topic}>
                  {el.value}
                </Box>
              ))}
            </Box>
          )}
          <Box className={styles.lic}>{data.license?.name || 'Лицензия не указана'}</Box>
        </>
      )}
    </Box>
  );
}
