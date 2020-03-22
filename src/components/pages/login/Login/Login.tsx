import React from 'react'
import LoginForm from './LoginForm/LoginForm'
import {
  login as apiLogin,
  UserLoginRequest,
  UserLoginResponse,
  UserLoginErrorCode,
} from '../../../../services/api/user/login'
import PageSwitcher from '../../PageSwitcher/PageSwitcher'
import SmallContainer from '../../../Layout/SmallContainer/SmallContainer'
import LogoutButton from '../LogoutButton/LogoutButton.connect'

interface Props {
  username?: string
  handleLogUser: (data: UserLoginResponse) => void
}

interface State {
  errorMessage: string
  username: string
  password: string
}

class LoginPage extends React.Component<Props, State> {
  readonly state: State = {
    errorMessage: null,
    username: '',
    password: '',
  }

  handleSubmit = async (data: UserLoginRequest) => {
    const response = await apiLogin(data)

    // If the API returns an error
    if (response.error) {
      this.setState({
        errorMessage: this.errorCodeToText(response.error.code) || response.error.message,
      })
      return
    }

    // Else if login is successful
    this.setState({ errorMessage: null, password: null })
    this.props.handleLogUser(response)
  }

  errorCodeToText = (errorCode: UserLoginErrorCode): string => {
    switch (errorCode) {
      case 'LOGIN_USER_NOT_FOUND':
        return 'Email ou pseudo inconnu.'

      case 'LOGIN_INCORRECT_PASSWORD':
        return 'Mot de passe incorrect.'
    }
  }

  render() {
    const { errorMessage } = this.state
    const { username } = this.props
    return (
      <div>
        <PageSwitcher
          links={[
            { label: 'Inscription', href: '/signin' },
            { label: 'Connexion', href: '/login' },
          ]}
        />
        <SmallContainer title="Connexion">
          {username ? (
            <div>
              Vous êtes connecté(e) en tant que <b>{username}</b> !
              <LogoutButton />
            </div>
          ) : (
            <LoginForm handleSubmit={this.handleSubmit} errorMessage={errorMessage} />
          )}
        </SmallContainer>
      </div>
    )
  }
}
export default LoginPage
