import React from 'react'
import Link from 'next/link'
import Input from '../../../../form/Input/Input'
import Button from '../../../../form/Button/Button'
import { UserLoginRequest } from '../../../../../services/api/user/login'

import styles from './LoginForm.module.css'

interface Props {
  errorMessage: string
  handleSubmit: (data: UserLoginRequest) => void
}

interface State {
  username: string
  password: string
}

class LoginForm extends React.Component<Props, State> {
  readonly state: State = {
    username: '',
    password: '',
  }

  handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      username: event.target.value,
    })
  }

  handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      password: event.target.value,
    })
  }

  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    this.props.handleSubmit({
      username: this.state.username,
      password: this.state.password,
    })
  }

  render() {
    const { errorMessage } = this.props
    const { username, password } = this.state
    const valid = username && password

    return (
      <form onSubmit={this.handleSubmit}>
        <Input
          id="username"
          type="text"
          label="Pseudo ou email"
          placeholder="Entrez votre pseudo ou votre email"
          value={username}
          onChange={this.handleUsernameChange}
        />
        <Input
          id="password"
          type="password"
          label="Mot de passe"
          placeholder="Entrez votre mot de passe"
          value={password}
          onChange={this.handlePasswordChange}
        >
          <Link href="/mot-de-passe-oublie">
            <a className={styles.forgotPasswordLink}>oublié&nbsp;?</a>
          </Link>
        </Input>
        {errorMessage && <p className={styles.error}>{errorMessage}</p>}
        <Button disabled={!valid} style="dark" type="submit">
          Valider
        </Button>
      </form>
    )
  }
}
export default LoginForm
