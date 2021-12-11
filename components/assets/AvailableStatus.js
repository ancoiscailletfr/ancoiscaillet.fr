import { connect } from 'react-redux'
import xw from 'xwind'

/**
 * my availability status
 * @param available status from store
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

const mapStateToProps = (state) => ({
  available: state.api.us.available
})

export default connect(mapStateToProps, null)(AvailableStatus)
