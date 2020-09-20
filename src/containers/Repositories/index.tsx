import React, { useCallback, useEffect, useState } from 'react'
import moment from 'moment'

import { useLazyQuery } from '@apollo/client'
import get from 'lodash/get'
import debounce from 'lodash/debounce'

import { RepoCard, Container, Pagination, Layout, Header, Text, LoaderContainer } from '../../components'

import { GET_REPOSITORIES, GET_LICENSES } from './queries'

import { IRepositoryVariables, IRepositoryFields, ILicense } from './types'

import styles from './style.module.scss'

const defaultLicenses = [{ title: 'all', value: 'all' }]
const date = moment().subtract(30, 'days').format('YYYY-MM-DD')
const defaultQueryParams = `sort:stars language:javascript created:>${date}`
const defaultQueryCount = 20
const querySearchDebounceDelay = 1000

const Repositories = () => {
  const [querySearch, setQuerySearch] = useState('')
  const [license, setLicense] = useState('all')

  const queryLicense = license === 'all' ? '' : `license:${license}`

  const [getRepositories, { loading: repositoriesLoading, data: repositoriesData }] = useLazyQuery<IRepositoryVariables>(
    GET_REPOSITORIES,
    {
      notifyOnNetworkStatusChange: true,
      variables: {
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
  const hasPreviousPage = get(pageInfo, 'hasPreviousPage')
  const startCursor = get(pageInfo, 'startCursor')
  const endCursor = get(pageInfo, 'endCursor')

  const rawLicenses = get(licensesData, 'licenses') || []
  const licenses = [...defaultLicenses, ...rawLicenses.map((item : ILicense) => ({value: item.key, title: item.name }))]

  const isLoading = repositoriesLoading || licensesLoading

  const debouncedSearchInputChange = debounce(query => {
    setQuerySearch(query)
  }, querySearchDebounceDelay)

  const handleSearchInputChange = useCallback((inputValue) => {
    debouncedSearchInputChange(inputValue)
  }, [debouncedSearchInputChange])

  const handleLicenseChange = useCallback((e) => {
    setLicense(e.target.value)
  }, [])

  const handleNextButtonClick = useCallback(async (e) => {
    await getRepositories({
      variables: {
        query: `${querySearch} ${defaultQueryParams} ${queryLicense}`,
        after: endCursor,
        first: defaultQueryCount,
        last: null,
      }
    })
  }, [endCursor, querySearch, queryLicense, getRepositories])

  const handlePreviousButtonClick = useCallback(async (e) => {
    await getRepositories({
      variables: {
        query: `${querySearch} ${defaultQueryParams} ${queryLicense}`,
        before: startCursor,
        first: null,
        last: defaultQueryCount,
      }
    })
  }, [startCursor, querySearch, queryLicense, getRepositories])

  useEffect(() => {
    getLicenses()
  }, [getLicenses])

  useEffect(() => {
    getRepositories({
      variables: {
        query: `${querySearch} ${defaultQueryParams} ${queryLicense}`,
      }
    })
  }, [querySearch, queryLicense, getRepositories])

  return (
    <Layout>
      <Header
        licenses={licenses}
        onSearchInputChange={handleSearchInputChange}
        onLicenseChange={handleLicenseChange}
      />
      <LoaderContainer isLoading={isLoading}>
        <div className={styles.container}>
          <Container>
            {(repos.length === 0 && querySearch && !isLoading) ? (
              <Text>Repositories not found</Text>
            ) : (
              <div className={styles.repositories}>
                {repos.map((repo: IRepositoryFields) => {
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
              hasPreviousPage={hasPreviousPage}
              hasNextPage={hasNextPage}
              onPreviousButtonClick={handlePreviousButtonClick}
              onNextButtonClick={handleNextButtonClick}
            />
          </Container>
        </div>
      </LoaderContainer>
    </Layout>
  );
}

export default Repositories