import { css } from '@emotion/react'

const AspectRatio = ({ children, ...props }) => {
  return (
    <div {...props}>
      <div css={css`padding-top: 100%`} />
      {children}
    </div>
  )
}

export default AspectRatio
