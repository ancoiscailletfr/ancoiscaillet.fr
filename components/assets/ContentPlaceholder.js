import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { mix } from '@popmotion/popcorn'
import styled from '@emotion/styled'
import xw from 'xwind'
import { css } from '@emotion/react'

const randomInt = (min, max) => Math.round(mix(min, max, Math.random()))
const generateParagraphLength = () => randomInt(10, 20)
const generateWordLength = () => randomInt(20, 100)

/**
 * a rounded div
 * @param width of div
 * @returns {JSX.Element}
 * @constructor
 */
export const Word = ({ width }) => <WordStyled className='word' style={{ width }} />

Word.propTypes = {
  width: PropTypes.number
}

/**
 * a series of words
 * @param words
 * @returns {JSX.Element}
 * @constructor
 */
const Paragraph = ({ words }) => (
  <div css={xw`pb-5`}>
    {words.map((width, i) => (
      <Word key={i} width={width} />
    ))}
  </div>
)

Paragraph.propTypes = {
  words: PropTypes.array
}

/**
 * content placeholder
 * @see https://codesandbox.io/s/framer-motion-accordion-qx958?file=/src/ContentPlaceholder.tsx
 * @param nbParagraph paragraphs number
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
export const ContentPlaceholder = ({ nbParagraph, ...props }) => {
  const [paragraphs, setParagraphs] = useState([])
  useEffect(() => {
    // Randomly generate some paragraphs of word lengths
    setParagraphs([...Array(nbParagraph)].map(() => {
      return [...Array(generateParagraphLength())].map(generateWordLength)
    }))
  }, [])
  return (
    <ContentPlaceholderStyled {...props}>
      {paragraphs.map((words, i) => (
        <Paragraph key={i} words={words} />
      ))}
    </ContentPlaceholderStyled>
  )
}

const ContentPlaceholderStyled = styled.div([xw`
  py-6 h-full w-full 
  flex flex-col justify-between 
  text-justify overflow-hidden
`, css`max-height: 200px`])

const WordStyled = styled.div(xw`
  h-3 md:h-4 rounded-lg inline-block mb-2.5 mr-2
`)

ContentPlaceholder.propTypes = {
  nbParagraph: PropTypes.number
}
