import React from 'react'
import debounce from 'awesome-debounce-promise'
import { checkEmailAvailabilty } from '../../../../../../services/api/user/signin'
import Input from '../../../../../form/Input/Input'

interface Props {
  handleChange: (value: string, valid: boolean) => void
}

interface State {
  value: string
  status: 'untouched' | 'success' | 'error'
  message?: string
}

class EmailField extends React.Component<Props, State> {
  readonly state: State = {
    value: '',
    status: 'untouched',
  }

  handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    this.setState({ value })

    const newState = await this.checkEmail(value)
    this.setState(newState, () => {
      this.props.handleChange(value, newState.status === 'success')
    })
  }

  checkEmail = debounce(async (value: string): Promise<State> => {
    if (value.indexOf('@') === -1) {
      return {
        value,
        status: 'error',
        message: 'Ça ne ressemble pas à une adresse email.',
      }
    }
    const isFree = await checkEmailAvailabilty(value)
    if (!isFree) {
      return {
        value,
        status: 'error',
        message:
          'Saperlipopette ! Cet email est déjà utilisé. Peut-être devriez-vous plutôt vous connecter ?',
      }
    }
    return {
      value,
      status: 'success',
      message: null,
    }
  }, 200)

  render() {
    const { value, status, message } = this.state
    return (
      <Input
        id="email"
        label="Email"
        placeholder="Ex: reblochon74@email.com"
        type="email"
        value={value}
        messageTxt={message}
        messageType={status}
        onChange={this.handleChange}
      />
    )
  }
}
export default EmailField
