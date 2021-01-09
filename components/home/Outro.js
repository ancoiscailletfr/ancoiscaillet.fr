import React from 'react'
import NavigationWrapper from '@/components/navigation/NavigationWrapper'
import { useInView } from 'react-intersection-observer'
import xw from 'xwind'

const Outro = () => {
  const [ref, inView] = useInView({ threshold: 0.5 })
  return (
    <NavigationWrapper slug='intro' inView={inView}>
      <div css={xw`h-96`} ref={ref} />
    </NavigationWrapper>
  )
}

export default Outro
