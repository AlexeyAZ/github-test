import React from 'react'
import noop from 'lodash/noop'

import Button from '../Button'

import { IPaginationProps } from './types'

const Pagination: React.FC<IPaginationProps> = ({
  hasPreviousPage,
  hasNextPage,
  onPreviousButtonClick = noop,
  onNextButtonClick = noop,
}) => {
  if (hasPreviousPage && hasNextPage) {
    return (
      <div>
        <Button onClick={onPreviousButtonClick}>Previous</Button>
        {' '}
        <Button onClick={onNextButtonClick}>Next</Button>
      </div>
    )
  }
  if (hasPreviousPage) {
    return <Button onClick={onPreviousButtonClick}>Previous</Button>
  }
  if (hasNextPage) {
    return <Button onClick={onNextButtonClick}>Next</Button>
  }
  return null;
}

export default Pagination