import { Image, Transformation } from 'cloudinary-react'

const CloudinaryImage = ({
  image: {
    providerMetadata: { publicId }, alternativeText, width, height,
  }, children, ...props
}) => {
  return (
    <Image
      {...props}
      publicId={publicId}
      alt={alternativeText}
      width={width}
      height={height}
      secure='true'
      loading='lazy'
      draggable={false}
    >
      {children}
      <Transformation fetchFormat='auto' quality='auto' dpr='2.0' />
    </Image>
  )
}

export default CloudinaryImage
