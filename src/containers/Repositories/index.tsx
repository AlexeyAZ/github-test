import React, { useCallback, useEffect, useState } from 'react'
import moment from 'moment'

import { useQuery, useLazyQuery } from '@apollo/client'
import get from 'lodash/get'
import debounce from 'lodash/debounce'

import { RepoCard, Loader, Container, Pagination, Layout, Header, Text } from '../../components'

import { GET_REPOSITORIES, GET_LICENSES } from './queries'

import styles from './style.module.scss'

interface RepositoryStargazers {
  totalCount: number
}

interface RepositoryLicenseInfo {
  name: string
}

interface RepositoryOwner {
  login: string,
  url: string,
}

interface RepositoryPageInfo {
  hasNextPage: boolean
  hasPreviousPage: boolean,
  startCursor: string,
  endCursor: string,
}

interface RepositoryFields {
  pageInfo: RepositoryPageInfo,
  createdAt: string,
  databaseId: number,
  stargazers: RepositoryStargazers,
  description: string,
  licenseInfo: RepositoryLicenseInfo
  name: string,
  owner: RepositoryOwner,
  url: string,
}

interface RepositoryRefetchVariables {
  after: string,
}

interface License {
  name: string,
  key: string,
}

const defaultLicenses = [{ title: 'all', value: 'all' }]
const date = moment().subtract(30, 'days').format('YYYY-MM-DD')
const defaultQueryParams = `sort:stars language:javascript created:>${date}`
const defaultQueryCount = 20

const Repositories = () => {
  const [querySearch, setQuerySearch] = useState('')
  const [license, setLicense] = useState('all')

  const queryLicense = license === 'all' ? '' : `license:${license}`

  const { loading: repositoriesLoading, data: repositoriesData, refetch: repositoriesRefetch } = useQuery<RepositoryRefetchVariables>(
    GET_REPOSITORIES,
    {
      notifyOnNetworkStatusChange: true,
      variables: {
        query: `${querySearch} ${defaultQueryParams} ${queryLicense}`,
        first: defaultQueryCount,
      }
    }
  )

  const [getLicenses, { loading: licensesLoading, data: licensesData }] = useLazyQuery(
    GET_LICENSES
  )

  const repos = get(repositoriesData, 'search.nodes') || []
  const pageInfo = get(repositoriesData, 'search.pageInfo')
  const hasNextPage = get(pageInfo, 'hasNextPage')
  const endCursor = get(pageInfo, 'endCursor')

  const rawLicenses = get(licensesData, 'licenses') || []
  const licenses = [...defaultLicenses, ...rawLicenses.map((item : License) => ({value: item.key, title: item.name }))]

  const isRepositoriesLoading = repositoriesLoading || licensesLoading

  const debouncedSearchInputChange = debounce(query => {
    setQuerySearch(query)
  }, 1000)

  const handleSearchInputChange = useCallback((inputValue) => {
    debouncedSearchInputChange(inputValue)
  }, [debouncedSearchInputChange])

  const handleLicenseChange = useCallback((e) => {
    setLicense(e.target.value)
  }, [])

  const handleNextButtonClick = useCallback((e) => {
    repositoriesRefetch({
      after: endCursor
    })
  }, [endCursor, repositoriesRefetch])

  useEffect(() => {
    getLicenses()
  }, [getLicenses])

  return (
    <Layout>
      <Header
        licenses={licenses}
        onSearchInputChange={handleSearchInputChange}
        onLicenseChange={handleLicenseChange}
      />
      {isRepositoriesLoading && (
        <div className={styles.loaderWrap}>
          <Container>
            <Loader />
          </Container>
        </div>
      )}

      <div className={styles.container}>
        <Container>
          {(repos.length === 0 && querySearch && !isRepositoriesLoading) ? (
            <Text>Repositories not found</Text>
          ) : (
            <div className={styles.repositories}>
              {repos.map((repo: RepositoryFields) => {
                const id = get(repo, "databaseId");
                const repoName = get(repo, "name");
                const repoUrl = get(repo, "url");
                const ownerName = get(repo, "owner.login");
                const ownerUrl = get(repo, "owner.url");
                const license = get(repo, "licenseInfo.name");
                const stars = get(repo, "stargazers.totalCount");
                const createdAt = moment(get(repo, "createdAt")).format(
                  "DD-MM-YYYY"
                );
                return (
                  <div key={id} className={styles.repoCardWrap}>
                    <RepoCard
                      repoName={repoName}
                      repoUrl={repoUrl}
                      ownerName={ownerName}
                      ownerUrl={ownerUrl}
                      license={license}
                      stars={stars}
                      createdAt={createdAt}
                      className={styles.repoCard}
                    />
                  </div>
                );
              })}
            </div>
          )}
          <Pagination
            hasNextPage={hasNextPage}
            onNextButtonClick={handleNextButtonClick}
          />
        </Container>
      </div>
    </Layout>
  );
}

export default Repositories