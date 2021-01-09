import React from 'react'
import MenuBurger from '@/components/navigation/MenuBurger'
import styled from '@emotion/styled'
import Links from '@/components/navigation/Links'
import xw from 'xwind'

/**
 * navigation component
 * through my website 🧭
 * @returns {JSX.Element}
 * @constructor
 */
const Navigation = () => {
  return (
    <>
      <NavigationContainerStyled>
        <Links />
      </NavigationContainerStyled>
      <MenuBurger />
    </>
  )
}

const NavigationContainerStyled = styled.div(xw`
 hidden lg[block w-3/5] xl[w-1/2] max-w-3xl
 `)

export default Navigation
