import { connect } from 'react-redux'
import AccountLink from './AccountLink'
import { RootState } from '../../../../redux/rootReducer'

interface OwnProps {
  active?: boolean
}

const mapStateToProps = (state: RootState, ownProps: OwnProps) => ({
  username: state.user.user.username,
  ...ownProps,
})

export default connect(mapStateToProps)(AccountLink)
