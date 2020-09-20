export interface IHeaderProps {
  licenses?: {
    value: string,
    title: string
  }[],
  onSearchInputChange: (e: object) => void,
  onLicenseChange?: (e: object) => void,
}