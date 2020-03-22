import React from 'react'
import UsernameField from './UsernameField/UsernameField'
import PasswordField from './PasswordField/PasswordField'
import EmailField from './EmailField/EmailField'
import EmailFrequencyField from './EmailFrequencyField/EmailFrequencyField'
import EmailUpdateFrequency from '../../../../../models/user/EmailUpdateFrequency'
import Recaptcha from './Recaptcha/Recaptcha'
import Button from '../../../../form/Button/Button'
import { UserSigninRequest } from '../../../../../services/api/user/signin'

import styles from './SigninForm.module.css'

interface Props {
  errorMessage: string
  handleSubmit: (data: UserSigninRequest) => void
}

interface Field {
  value: string
  valid: boolean
}

interface State {
  username: Field
  password: Field
  email: Field
  emailUpdateFrequency: EmailUpdateFrequency
  recatchaToken: string
}

class SigninForm extends React.Component<Props, State> {
  readonly state: State = {
    username: { value: '', valid: false },
    password: { value: '', valid: false },
    email: { value: '', valid: false },
    emailUpdateFrequency: 'never',
    recatchaToken: '',
  }

  handleFieldChange = (fieldName: 'username' | 'email' | 'password') => (
    value: string,
    valid: boolean,
  ) => {
    this.setState({
      ...this.state,
      [fieldName]: { value, valid },
    })
  }

  handleEmailFrequencyChange = (emailUpdateFrequency: EmailUpdateFrequency) => {
    this.setState({ emailUpdateFrequency })
  }

  handleRecaptchaChange = (recatchaToken: string) => {
    this.setState({ recatchaToken })
  }

  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    this.props.handleSubmit({
      username: this.state.username.value,
      email: this.state.email.value,
      password: this.state.password.value,
      emailUpdates: this.state.emailUpdateFrequency,
      recaptchaToken: this.state.recatchaToken,
    })
  }

  render() {
    const { username, password, recatchaToken } = this.state
    const { errorMessage } = this.props
    const valid = username.valid && password.valid && recatchaToken

    return (
      <form className="LoginPage_form" onSubmit={this.handleSubmit}>
        <UsernameField handleChange={this.handleFieldChange('username')} />
        <EmailField handleChange={this.handleFieldChange('email')} />
        <PasswordField handleChange={this.handleFieldChange('password')} />
        <EmailFrequencyField handleChange={this.handleEmailFrequencyChange} />
        <Recaptcha handleChange={this.handleRecaptchaChange} />
        {errorMessage && <p className={styles.error}>{errorMessage}</p>}
        <Button disabled={!valid} style="dark" type="submit">
          Valider
        </Button>
      </form>
    )
  }
}
export default SigninForm
