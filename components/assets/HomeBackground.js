import Particles from 'react-tsparticles'
import xw from 'xwind'
import { css } from '@emotion/react'

/**
 * Home fixed background with particles
 * https://particles.matteobruni.it/ 🪐
 * @returns {JSX.Element}
 * @constructor
 */
const HomeBackground = () => {
  return (
    <div
      css={[xw`fixed bg-gradient-to-br from-gray-900 to-wildblue-800 bg-fixed inset-0`,
        css`#tsparticles{${xw`h-full w-full bg-fixed bg-no-repeat bg-center`} canvas{${xw`absolute -z-10`}}}`]}
    >
      <Particles
        key='circle'
        options={{
          fpsLimit: 30,
          interactivity: {
            detectsOn: 'window',
            events: {
              onClick: {
                enable: true,
                mode: 'repulse'
              },
              onHover: {
                enable: true,
                mode: 'bubble'
              },
              resize: true
            },
            modes: {
              bubble: {
                distance: 200,
                duration: 3,
                opacity: 0,
                size: 0
              },
              repulse: {
                distance: 400,
                duration: 0.4,
                speed: 1
              }
            }
          },
          particles: {
            number: {
              value: 75,
              density: {
                enable: true,
                value_area: 700
              }
            },
            color: {
              value: '#e5e5e5'
            },
            shape: {
              type: 'circle'
            },
            opacity: {
              value: 1,
              random: true,
              anim: {
                enable: true,
                speed: 1,
                opacity_min: 0.05
              }
            },
            size: {
              value: 5,
              random: true
            },
            line_linked: {
              enable: true,
              color: '#ffffff',
              opacity: 0.45,
              width: 0.55,
              triangles: {
                enable: true,
                color: '#2B2E50',
                opacity: 0.1
              }
            },
            move: {
              enable: true,
              speed: 0.7,
              direction: 'none',
              random: true,
              out_mode: 'out'
            }
          },
          retina_detect: true
        }}
      />
    </div>
  )
}

export default HomeBackground
