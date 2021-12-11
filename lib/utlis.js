import { mix } from '@popmotion/popcorn'
import { bp } from '@/lib/constants'
import useWindowDimension from '@/lib/useWindowDimension'

/**
 * select responsive breakpoint
 * @param choice
 * @param width
 */
export const select = (choice, { width } = useWindowDimension()) => {
  if (width < bp.sm) {
    return choice._
  } if (width < bp.md) {
    return choice.sm ?? choice._
  } if (width < bp.lg) {
    return choice.md ?? choice.sm ?? choice._
  } if (width < bp.xl) {
    return choice.lg ?? choice.md ?? choice.sm ?? choice._
  }
  return choice.xl ?? choice.lg ?? choice.md ?? choice.sm ?? choice._
}

export const openLinkInNewTabProps = { target: '_blank', rel: 'noopener noreferrer' }

export const randomInt = (min, max) => Math.round(mix(min, max, Math.random()))
export const random = (min, max) => mix(min, max, Math.random())
