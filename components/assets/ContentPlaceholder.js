import { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import xw from 'xwind'
import { css } from '@emotion/react'
import { randomInt } from '@/lib/utlis'

const generateParagraphLength = () => randomInt(10, 20)
const generateWordLength = () => randomInt(20, 100)

/**
 * word placeholder a rounded div
 * @param width of div
 * @returns {JSX.Element}
 * @constructor
 */
export const Word = ({ width }) => <WordStyled className='word' style={{ width }} />

/**
 * paragraph placeholder, a series of words
 * @param words
 * @returns {JSX.Element}
 * @constructor
 */
const Paragraph = ({ words }) => (
  <div css={xw`pb-5`}>
    {words.map((width, i) => (
      // eslint-disable-next-line react/no-array-index-key -- here we dont give a fuu
      <Word key={i} width={width} />
    ))}
  </div>
)

/**
 * content placeholder, a series of paragraphs
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
        // eslint-disable-next-line react/no-array-index-key
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
