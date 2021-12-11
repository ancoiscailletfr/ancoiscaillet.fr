import styled from '@emotion/styled'
import xw from 'xwind'

/**
 * Button styled
 * @param children
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const Button = ({ children, ...props }) => {
  return (
    <ButtonStyled {...props}>
      {children}
    </ButtonStyled>
  )
}

const ButtonStyled = styled.button(xw`
  flex items-center justify-center select-none
  leading-5 px-2 py-0.5
  border border-transparent
  rounded-md
  uppercase font-medium tracking-wide text-gray-platinum
  bg-darkblue-600 bg-opacity-75 hover:bg-darkblue-500
  focus[outline-none ring bg-opacity-100]
`)

export default Button
