interface IRepositoryStargazers {
  totalCount: number
}

interface IRepositoryLicenseInfo {
  name: string
}

interface IRepositoryOwner {
  login: string,
  url: string,
}

interface IRepositoryPageInfo {
  hasNextPage: boolean
  hasPreviousPage: boolean,
  startCursor: string,
  endCursor: string,
}

export interface IRepositoryFields {
  pageInfo: IRepositoryPageInfo,
  createdAt: string,
  databaseId: number,
  stargazers: IRepositoryStargazers,
  description: string,
  licenseInfo: IRepositoryLicenseInfo
  name: string,
  owner: IRepositoryOwner,
  url: string,
}

export interface IRepositoryVariables {
  query: string,
  first: number,
  after: string,
}

export interface ILicense {
  name: string,
  key: string,
}