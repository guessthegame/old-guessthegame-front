import { connect } from 'react-redux'
import Login from './Login'
import { RootState } from '../../../../redux/rootReducer'
import { logUser } from '../../../../redux/features/user/actions'

const mapStateToProps = (state: RootState) => ({
  username: state.user.user.username,
})

const dispatchProps = {
  handleLogUser: logUser,
}

export default connect(mapStateToProps, dispatchProps)(Login)
