import React, { useCallback, useEffect, useState } from 'react'
import moment from 'moment'

import { useQuery, useLazyQuery } from '@apollo/client'
import get from 'lodash/get'
import debounce from 'lodash/debounce'

import { RepoCard, Container, Pagination, Layout, Header, Text, LoaderContainer, Button } from '../../components'

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
  const [prevPageCursor, setPrevPageCursor] = useState(null)
  const [license, setLicense] = useState('all')

  const queryLicense = license === 'all' ? '' : `license:${license}`

  const { loading: repositoriesLoading, data: repositoriesData, refetch: repositoriesRefetch } = useQuery<IRepositoryVariables>(
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
    await repositoriesRefetch({
      after: endCursor
    })
    setPrevPageCursor(startCursor)
  }, [endCursor, repositoriesRefetch])

  const handlePrevButtonClick = useCallback(async (e) => {
    await repositoriesRefetch({
      before: prevPageCursor
    })
  }, [endCursor, repositoriesRefetch])

  console.log(pageInfo)
  console.log(prevPageCursor)

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
            <Button onClick={handlePrevButtonClick}>Prev</Button>
            <Pagination
              hasNextPage={hasNextPage}
              onNextButtonClick={handleNextButtonClick}
            />
          </Container>
        </div>
      </LoaderContainer>
    </Layout>
  );
}

export default Repositories