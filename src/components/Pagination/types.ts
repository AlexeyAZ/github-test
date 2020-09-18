export interface IPaginationProps {
  hasPreviousPage: boolean,
  hasNextPage: boolean,
  onPreviousButtonClick?: (e: object) => void,
  onNextButtonClick?: (e: object) => void,
}