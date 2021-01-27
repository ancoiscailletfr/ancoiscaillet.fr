import PropTypes from 'prop-types'
import React from 'react'
import styled from '@emotion/styled'
import xw from 'xwind'
import { css } from '@emotion/react'
import mdToReact from '@/lib/mdToReact'

const RichTextContainer = ({ children, ...props }) => {
  return (
    <RichTextStyled className='richText' {...props}>
      {mdToReact(children)}
    </RichTextStyled>
  )
}

const RichTextStyled = styled.div([xw`
  block h-full w-full`, css`
  p {${xw`text-sm tracking-tight mb-3 text-justify`}}
  li {${xw`text-sm tracking-tight text-left mb-2`}}
  h1{${xw`text-3xl my-2.5 font-bold`}}
  h2 {${xw`font-medium text-lg tracking-wide ml-1 mb-3`}}
  h3 {${xw`text-base font-light leading-relaxed mb-3`}}
  strong {${xw`font-bold`}}
  em {${xw`italic`}}
  del {${xw`line-through`}}
  a {${xw`font-bold underline hover[no-underline] cursor-pointer`}}
  blockquote{${xw`ml-8 pl-2 border-l-4 border-gray-400`}}
  ul {${xw`list-disc mb-3 ml-6`}}
  ol {${xw`list-decimal`}}
  hr {${xw`h-0 my-3.5 overflow-hidden bg-transparent border-b`}}
  hr:before, hr:after {${xw`table`}; content: "";}
  hr:after {${xw`clear-both`}}
`])

RichTextContainer.propTypes = {
  children: PropTypes.string
}

export default RichTextContainer
