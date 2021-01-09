import PropTypes from 'prop-types'
import { useEffect } from 'react'
import { bindActionCreators } from 'redux'
import { setActive } from '@/store/navigation/action'
import { connect } from 'react-redux'

const NavigationWrapper = ({ children, slug, setActiveNavigation, inView }) => {
  useEffect(() => {
    if (inView) {
      setActiveNavigation(slug)
    }
  }, [inView])

  return children
}

const mapDispatchToProps = (dispatch) => {
  return {
    setActiveNavigation: bindActionCreators(setActive, dispatch)
  }
}

NavigationWrapper.propTypes = {
  children: PropTypes.any,
  inView: PropTypes.bool,
  setActiveNavigation: PropTypes.func,
  slug: PropTypes.string.isRequired
}

export default connect(null, mapDispatchToProps)(NavigationWrapper)
