import Orbit from '@/components/assets/Orbit'
import xw from 'xwind'

const SkillsSystem = ({ orbit1, orbit2, orbit3, orbit4, orbit5, orbit6 }) => {
  return (
    <div css={xw`absolute inset-0 m-auto select-none`}>
      <Orbit css={xw`w-full h-full`} from={66} duration={44} skills={orbit6} />
      <Orbit css={xw`w-10/12 h-10/12`} from={70} duration={80} skills={orbit5} />
      <Orbit css={xw`w-8/12 h-8/12`} from={0} duration={60} skills={orbit4} />
      <Orbit css={xw`w-6/12 h-6/12`} from={-20} duration={38} skills={orbit3} />
      <Orbit css={xw`w-4/12 h-4/12`} from={-45} duration={24} skills={orbit2} />
      <Orbit css={xw`w-2/12 h-2/12`} from={90} duration={34} skills={orbit1} />
    </div>
  )
}

export default SkillsSystem
