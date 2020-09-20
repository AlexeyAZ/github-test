import React from 'react'
import cn from 'classnames'

import { Title, Text } from '../Typography'
import { IRepoCardProps } from './types'

import styles from './style.module.scss'

const RepoCard: React.FC<IRepoCardProps> = ({
  repoName,
  repoUrl,
  ownerName,
  ownerUrl,
  license,
  stars,
  createdAt,
  className = "",
}) => {
  const isLicenseExist = Boolean(license)
  return (
    <div className={cn(styles.repoCard, className)}>
      <div className={styles.titleWrap}>
        <Title className={styles.title}>
          <a
            title={repoName}
            className={styles.titleLink}
            target="_blank"
            rel="noopener noreferrer"
            href={repoUrl}
          >
            {repoName}
          </a>
        </Title>
      </div>

      <Text>
        Owner:{" "}
        <a target="_blank" rel="noopener noreferrer" href={ownerUrl}>
          {ownerName}
        </a>
      </Text>
      <Text>
        License:{" "}
        <Text as="span" fontWeight={isLicenseExist ? "medium" : "normal"}>
          {license || "not indicated"}
        </Text>
      </Text>
      <Text>Stars: {stars}</Text>
      <Text>Created at: {createdAt}</Text>
    </div>
  );
};

export default RepoCard