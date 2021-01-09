import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import xw from 'xwind'

/**
 * my availability
 * @param available status from redux
 * @returns {JSX.Element}
 * @constructor
 */
const AvailableStatus = ({ available }) => (
  <>
    {'Actuellement '}
    {available
      ? <span css={xw`text-status-available`}>disponible</span>
      : <span css={xw`text-status-unavailable`}>indisponible</span>}
  </>
)

AvailableStatus.propTypes = {
  available: PropTypes.bool.isRequired
}

const mapStateToProps = (state) => ({
  available: state.api.us.available
})

export default connect(mapStateToProps, null)(AvailableStatus)
