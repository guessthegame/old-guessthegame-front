import React from 'react'
import Button from '../../../form/Button/Button'

interface Props {
  handleLogout: () => {}
}

const LogoutButton: React.FunctionComponent<Props> = ({ handleLogout }) => (
  <Button style="dark" onClick={handleLogout}>
    Déconnexion
  </Button>
)
export default LogoutButton
