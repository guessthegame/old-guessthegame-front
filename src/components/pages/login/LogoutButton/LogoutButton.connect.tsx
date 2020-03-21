import { connect } from 'react-redux'
import { logout } from '../../../../redux/features/user/actions'
import LogoutButton from './LogoutButton'

const dispatchProps = {
  handleLogout: logout,
}

export default connect(null, dispatchProps)(LogoutButton)
