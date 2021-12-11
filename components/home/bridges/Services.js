import styled from '@emotion/styled'
import RichTextContainer from '@/components/RichTextContainer'
import { connect } from 'react-redux'
import xw from 'xwind'
import { css } from '@emotion/react'

const Services = ({ services }) => {
  const { brief, service1, service2 } = services
  return (
    <>
      <p css={xw`w-full md:w-2/3 mx-auto px-4`}>{brief}</p>
      <div css={xw`flex flex-row flex-wrap mt-3 mb-3 md[mt-6 mb-0]`}>
        <Service>
          <div className='thumbnail'>
            <img
              width={587} height={398}
              src='/images/service-leaddev.svg'
              alt='Lead developer'
            />
          </div>
          <ServiceBrief>
            {service1}
          </ServiceBrief>
        </Service>
        <Service>
          <div className='thumbnail'>
            <img width={561} height={472} src='/images/service-dev.svg' alt='Développement spécifique' />
          </div>
          <ServiceBrief>
            {service2}
          </ServiceBrief>
        </Service>
      </div>
    </>
  )
}

const Service = styled.div([xw`
  w-full md:w-1/2 flex flex-col px-4
`, css`
  .thumbnail {
    ${xw`w-full flex justify-center items-center h-56 md:h-80 py-4`}
  }
  .thumbnail img {
    ${xw`max-h-full w-3/5 md:w-1/2 mx-auto my-0`}
  }
`])

const ServiceBrief = styled(RichTextContainer)([xw`h-auto`, css`
  h2{
    ${xw`font-bold text-2xl text-gray-platinum mb-2`}
  }
  p{
    ${xw`text-center`}
  }
`])

const mapStateToProps = (state) => ({
  services: state.api.services
})

export default connect(mapStateToProps, null)(Services)
