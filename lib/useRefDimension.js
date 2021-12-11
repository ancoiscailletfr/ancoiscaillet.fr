import { useEffect, useState } from 'react'

const useRefDimension = (ref) => {
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)
  useEffect(() => {
    const handleResize = () => {
      setWidth(ref.current.clientWidth)
      setHeight(ref.current.clientHeight)
    }

    if (ref.current) {
      setWidth(ref.current.clientWidth)
      setHeight(ref.current.clientHeight)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [ref])
  return { width, height }
}

export default useRefDimension
