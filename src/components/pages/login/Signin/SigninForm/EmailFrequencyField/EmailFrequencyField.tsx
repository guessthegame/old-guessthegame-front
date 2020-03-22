import React from 'react'
import EmailUpdateFrequency from '../../../../../../models/user/EmailUpdateFrequency'

interface Props {
  handleChange: (value: string, valid: boolean) => void
}

interface State {
  value: EmailUpdateFrequency
}

class EmailFrequencyField extends React.Component<Props, State> {
  readonly state: State = {
    value: 'never',
  }

  handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value as EmailUpdateFrequency
    this.setState({ value })
    this.props.handleChange(value, true)
  }

  render() {
    const { value } = this.state
    return (
      <div>
        <p style={{ marginBottom: '0.5em' }}>
          Souhaitez vous être averti par email lorsque de nouveaux screenshots sont ajoutés au
          site&nbsp;?
        </p>
        <select value={value} onChange={this.handleChange} style={{ width: '100%' }}>
          {[
            { label: "Non, pas d'email SVP", value: 'never' },
            {
              label: "Oui, dès qu'un nouveau screenshot est posté",
              value: 'asap',
            },
            { label: 'Oui, une fois par jour', value: 'daily' },
            { label: 'Oui, une fois par semaine', value: 'weekly' },
          ].map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    )
  }
}
export default EmailFrequencyField
