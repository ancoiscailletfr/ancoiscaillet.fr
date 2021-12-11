import { Fragment } from 'react'
import xw from 'xwind'
import { navigations } from '@/lib/constants'
import Link from '@/components/navigation/Link'
import ButtonContactStyled from '@/components/navigation/ButtonContactStyled'

/**
 * Links list component
 * @param noSeparator no '|'
 * @returns {JSX.Element}
 * @constructor
 */
const Links = ({ noSeparator }) => {
  return (
    <ul css={xw`justify-around items-center flex flex-row text-sm text-gray-platinum`}>
      {navigations.map((navigation) => (
        <Fragment key={navigation.slug}>
          <li css={xw`p-0.5`}>
            <Link {...navigation} />
          </li>
          {!noSeparator && <li>|</li>}
        </Fragment>
      ))}
      <li css={xw`p-0.5`}>
        <ButtonContactStyled />
      </li>
    </ul>
  )
}

export default Links
