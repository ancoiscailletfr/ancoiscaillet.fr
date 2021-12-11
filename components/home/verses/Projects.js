import Badges from '@/components/assets/Badges'
import Device from '@/components/assets/Device'
import { bp } from '@/lib/constants'
import { openLinkInNewTabProps as newTab } from '@/lib/utlis'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Box from '@/components/assets/Box'
import dynamic from 'next/dynamic'
import { connect } from 'react-redux'
import { Transformation } from 'cloudinary-react'
import RichTextContainer from '@/components/RichTextContainer'
import styled from '@emotion/styled'
import * as moment from 'moment'
import xw from 'xwind'
import { css } from '@emotion/react'
import Image from '@/components/Image'

const DragSlider = dynamic(() => import('@/components/assets/DragSlider'), { ssr: false })

const Projects = ({ projects }) => {
  const sortedProjects = projects.sort((a, b) => moment(b.beginning ?? moment.now()).diff(moment(a.beginning ?? moment.now())))
  return (
    <section className='container' css={xw`bg-yellow-400`}>
      <ProjectsSlider childPerPage={{ _: 1, md: 2, xl: 3 }} sliderRatio={{ _: 3, md: 2, xl: 1 }} nbProject={projects.length} css={xw`grid gap-4`}>
        {sortedProjects.map(projet => <Project key={projet.id} {...projet} />)}
      </ProjectsSlider>
    </section>
  )
}

const Project = ({ title, description, url, color, thumbnail, logo, badges, devices, beginning, ending }) => (
  <Box css={xw`grid grid-rows-5 bg-yellow-400 border-yellow-700 text-yellow-900 bg-opacity-75 border-opacity-50`}>
    <div
      css={[xw`select-none w-full bg-gray-800 overflow-hidden bg-repeat bg-center border-b-2 border-solid border-yellow-400`,
        css`background-image: url(${thumbnail?.url})`]}
    />
    <Logo
      css={color && css`background-color: ${color}`}
    >
      {logo
        ? (
          <Image image={logo}>
            <Transformation width='80' crop='fill' />
          </Image>
          )
        : <span css={xw`font-extrabold text-center text-6xl text-gray-800`}>α</span>}
    </Logo>
    <div css={xw`relative z-10 row-span-4 grid grid-rows-6`}>
      <div css={xw`grid grid-cols-3 items-center w-full border-b-2 border-solid border-yellow-400 border-opacity-75`}>
        <div css={xw`flex flex-row flex-wrap justify-center`}>
          {devices?.map(({ id, ...props }) => <Device key={id} {...props} />)}
        </div>
        <Badges
          badges={badges}
          line={2}
          css={xw`col-start-3 flex flex-row flex-wrap justify-end`}
        />
      </div>
      <div css={xw`px-4 pb-4 flex flex-col justify-between bg-yellow-300 bg-opacity-50 row-span-5`}>
        <div css={xw`grid grid-cols-7 gap-2 items-center py-2`}>
          <h1 css={xw`col-start-3 col-end-6 text-lg font-bold text-center uppercase text-gray-900 text-opacity-75 tracking-wide`}>
            {title}
          </h1>
          {beginning && (
            <span
              css={xw`col-start-6 col-end-8 text-xs font-light leading-relaxed text-gray-700 text-right`}
            >
              {moment(beginning).format('MM/YYYY')} - {ending ? moment(ending).format('MM/YYYY') : 'En cours'}
            </span>
          )}
        </div>
        <RichTextContainer css={xw`flex flex-col justify-evenly`}>
          {description}
        </RichTextContainer>
        {url && (
          <a
            css={xw`text-center uppercase font-light text-base font-bold mt-1.5 flex justify-center items-center hover:text-gray-900`}
            aria-label={title} href={url} {...newTab}
          >
            Accéder <FontAwesomeIcon css={xw`ml-1`} icon='external-link-alt' size='xs' />
          </a>
        )}
      </div>
    </div>
  </Box>
)

const ProjectsSlider = styled(DragSlider)(props => css`
  grid-template-columns: repeat(${props.nbProject}, minmax(0, 1fr));
  
  @media (min-width: ${bp.md}px){
    grid-template-columns: repeat(${props.nbProject + props.nbProject % 2}, minmax(0, 1fr));
  }

  @media (min-width: ${bp.xl}px){
    grid-template-columns: repeat(${props.nbProject + props.nbProject % 3}, minmax(0, 1fr));
  }
  
`)

const Logo = styled.div(xw`
  select-none absolute flex justify-center items-center
  top-1/5 left-1/2 w-28 h-28 p-3 rounded-full
  bg-gray-platinum 
  transform -translate-x-1/2 -translate-y-1/2 
  overflow-hidden 
  border-4 border-solid border-yellow-400
`)

const mapStateToProps = (state) => ({
  projects: state.api.projects
})

export default connect(mapStateToProps, null)(Projects)
