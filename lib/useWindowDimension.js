import { useEffect, useState } from 'react'

const useWindowDimension = () => {
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)
  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth)
      setHeight(window.innerHeight)
    }

    setWidth(window.innerWidth)
    setHeight(window.innerHeight)

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])
  return { width, height }
}

export default useWindowDimension
