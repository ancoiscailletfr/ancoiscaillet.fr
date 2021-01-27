import React from 'react'
import { openLinkInNewTabProps as newTab } from '@/lib/utlis'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import xw from 'xwind'

import Button from '@/components/assets/Button'

const ResumeButton = () => {
  return (
    <Button
      {...newTab}
      as='a'
      href='CV_François_Caillet.pdf'
      draggable={false}
    >
      Mon CV <FontAwesomeIcon icon='file-pdf' css={xw`ml-1 mb-0.5`} size='xs' />
    </Button>
  )
}

export default ResumeButton
