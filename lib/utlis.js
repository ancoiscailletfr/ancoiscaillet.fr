import { bp } from '@/lib/constants'
import useWindowDimension from '@/lib/useWindowDimension'

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
