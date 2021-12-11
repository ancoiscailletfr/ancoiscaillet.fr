import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'
import styled from '@emotion/styled'
import xw from 'xwind'

const Bridge = ({ title, content }) => {
  const [ref, inView] = useInView({
    /* Optional options */
    threshold: [0.2, 0.3, 0.4],
    triggerOnce: false
  })
  return (
    <div css={xw`bg-gray-900 bg-opacity-50 w-full mt-36 mb-36 z-10 shadow-xl`} ref={ref}>
      <BridgeContainer
        variants={bridgeVariants}
        animate={inView ? 'front' : 'behind'}
        transition={{
          duration: 0.5,
          type: 'spring',
          stiffness: 100,
          filter: { duration: 0.2, ease: 'linear' }
        }}
      >
        <h1 css={xw`font-extrabold text-2xl md:text-3xl lg:text-4xl text-gray-platinum mb-4 leading-10 tracking-tight`}>
          {title}
        </h1>
        {content}
      </BridgeContainer>
    </div>
  )
}

const bridgeVariants = {
  front: {
    opacity: 1
  },
  behind: {
    opacity: 0.5
  }
}

const BridgeContainer = styled(motion.section)(xw`
  mx-auto my-0 
  bg-gradient-to-br from-gray-900 to-wildblue-900 
  max-w-screen-lg w-full 
  shadow-inner shadow
  flex flex-col text-center 
  text-gray-100 
  py-12 lg:py-24 px-3 md:px-6 lg:px-12
`)

export default Bridge
