import { bp } from '@/lib/constants'
import useWindowDimension from '@/lib/useWindowDimension'
import { mix } from '@popmotion/popcorn'

/**
 * select responsive value
 * @param choice object of shape {_:number, md:number, lg:number...}
 * @returns number
 */
export const select = (choice, { width } = useWindowDimension()) => {
  if (width < bp.sm) {
    return choice._
  } else if (width < bp.md) {
    return choice.sm ?? choice._
  } else if (width < bp.lg) {
    return choice.md ?? choice.sm ?? choice._
  } else if (width < bp.xl) {
    return choice.lg ?? choice.md ?? choice.sm ?? choice._
  } else {
    return choice.xl ?? choice.lg ?? choice.md ?? choice.sm ?? choice._
  }
}

export const openLinkInNewTabProps = { target: '_blank', rel: 'noopener noreferrer' }

export const randomInt = (min, max) => Math.round(mix(min, max, Math.random()))
export const random = (min, max) => mix(min, max, Math.random())
