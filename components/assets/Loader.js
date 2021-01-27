import xw from 'xwind'
import { css } from '@emotion/react'
import styled from '@emotion/styled'

/**
 * app loader
 * a pulsing logo
 * wait until onload fired
 * @returns {JSX.Element}
 * @constructor
 */
const Loader = () => (
  <LoaderContainer id='loader'>
    <div css={xw`relative w-44 h-44 flex`}>
      <LogoWrapper className='logo-bg'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          css={xw`w-1/2 overflow-visible text-gray-platinum stroke-4`}
          viewBox='0 0 100 100'
        >
          <defs>
            <linearGradient
              id='paint0_linear'
              x1='101'
              y1='51'
              x2='0.999998'
              y2='51'
              gradientUnits='userSpaceOnUse'
            >
              <stop stopColor='#B5B8D7' />
              <stop offset='1' stopColor='#B5B8D7' stopOpacity='0' />
            </linearGradient>
          </defs>
          <path
            d='M100 92.25V7.75C100 3.46979 96.5302 0 92.25 0H50H7.74996C3.46975 0 0 3.46979 0 7.75V52.011C0 56.2912 3.46975 59.761 7.74995 59.761H42.2528C46.533 59.761 50 63.2308 50 67.511V92.25C50 96.5302 53.4698 100 57.75 100H92.25C96.5302 100 100 96.5302 100 92.25Z'
            fill='url(#paint0_linear)'
          />
          <path
            d='M100.5 8.75V93.25H101.5V8.75H100.5ZM93.25 100.5H58.75V101.5H93.25V100.5ZM51.5 93.25V68.511H50.5V93.25H51.5ZM43.2528 60.261H1V61.261H43.2528V60.261ZM1 1.5H51V0.5H1V1.5ZM51 1.5H93.25V0.5H51V1.5ZM50.5 1V38.4502H51.5V1H50.5ZM33.6943 78.6712L0.723248 100.584L1.27675 101.416L34.2478 79.5041L33.6943 78.6712ZM51.5 68.511C51.5 63.9548 47.8094 60.261 43.2528 60.261V61.261C47.2566 61.261 50.5 64.5067 50.5 68.511H51.5ZM58.75 100.5C54.7459 100.5 51.5 97.2541 51.5 93.25H50.5C50.5 97.8063 54.1936 101.5 58.75 101.5V100.5ZM100.5 93.25C100.5 97.2541 97.2541 100.5 93.25 100.5V101.5C97.8063 101.5 101.5 97.8063 101.5 93.25H100.5ZM101.5 8.75C101.5 4.19365 97.8063 0.5 93.25 0.5V1.5C97.2541 1.5 100.5 4.74594 100.5 8.75H101.5Z'
            stroke='currentColor'
          />
        </svg>
      </LogoWrapper>
      <span css={xw`animate-ping absolute inline-flex h-full w-full rounded-full bg-gray-platinum opacity-10`} />
    </div>
  </LoaderContainer>
)

const LoaderContainer = styled.div([xw`
  fixed inset-0 
  bg-gradient-to-br from-gray-900 to-wildblue-800 
  flex flex-col justify-center items-center
`, css`
  z-index: 20000; 
  &[data-hide='true']{
    animation: fadeOut ease-out 0.5s;
    animation-fill-mode: forwards;
  } 
  @keyframes fadeOut { 
    0% {opacity:1}  
    100% {opacity:0; visibility: hidden}
  }
`])

const LogoWrapper = styled.div(xw`
  w-44 h-44 rounded-full 
  flex justify-center items-center 
  animate-pulse
`)

export default Loader
