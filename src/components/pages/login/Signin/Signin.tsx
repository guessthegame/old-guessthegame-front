import React from 'react'
import Link from 'next/link'
import SigninForm from './SigninForm/SigninForm'
import PageSwitcher from '../../PageSwitcher/PageSwitcher'
import SmallContainer from '../../../Layout/SmallContainer/SmallContainer'
import LogoutButton from '../LogoutButton/LogoutButton.connect'
import {
  signin as apiSignin,
  UserSigninRequest,
  UserSigninResponse,
  UserSigninErrorCode,
} from '../../../../services/api/user/signin'

interface Props {
  username?: string
  handleLogUser: (data: UserSigninResponse) => void
}

interface State {
  errorMessage: string
  username: string
  password: string
}

const initialState: State = {
  errorMessage: null,
  username: '',
  password: '',
}

class LoginPage extends React.Component<Props, State> {
  readonly state: State = initialState

  handleSubmit = async (data: UserSigninRequest) => {
    const response = await apiSignin(data)

    console.log(response)

    // If the API returns an error
    if (response.error) {
      this.setState({
        errorMessage: this.errorCodeToText(response.error.code) || response.error.message,
      })
      return
    }

    // Else if login is successful
    this.setState(initialState)
    this.props.handleLogUser(response)
  }

  errorCodeToText = (errorCode: UserSigninErrorCode): string => {
    switch (errorCode) {
      case 'RECAPTCHA_ERROR':
        return 'Erreur lors de la vérification du reCAPTCHA.'
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
        <SmallContainer title="Inscription">
          {username ? (
            <div>
              Vous êtes inscrit(e) et connecté(e) en tant que <b>{username}</b> !
              <LogoutButton />
            </div>
          ) : (
            <div>
              <p style={{ fontStyle: 'italic' }}>
                (Si vous avez déjà un compte,{' '}
                <Link href="/login">
                  <a style={{ textDecoration: 'underline' }}>cliquez ici pour vous connecter</a>
                </Link>
                )
              </p>
              <SigninForm errorMessage={errorMessage} handleSubmit={this.handleSubmit} />
            </div>
          )}
        </SmallContainer>
      </div>
    )
  }
}
export default LoginPage
