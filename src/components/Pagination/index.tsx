import React from 'react'
import noop from 'lodash/noop'

import Button from '../Button'

interface IPaginationProps {
  hasNextPage: boolean
  onNextButtonClick?: (e: object) => void,
}

const Pagination = ({
  hasNextPage,
  onNextButtonClick = noop,
}: IPaginationProps) => {
  if (hasNextPage) {
    return <Button onClick={onNextButtonClick}>Next</Button>
  }
  return null
}

export default Pagination