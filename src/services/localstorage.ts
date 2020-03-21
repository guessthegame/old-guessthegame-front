import User from '../redux/features/user/models/User'

export function loadUserFromLocalStorage(): User {
  const jwt = localStorage.getItem('jwt')
  const username = localStorage.getItem('username')

  // If we cannot load the jwt or the username, we return an empty user that will need to login
  if (!jwt || !username) {
    return {
      jwt: null,
      username: null,
      canModerateScreenshots: false,
      lastViewedRandomScreenshots: [],
    }
  }

  // Else we return the logged user
  return {
    jwt,
    username,
    canModerateScreenshots: localStorage.getItem('canModerateScreenshots') === '1',
    lastViewedRandomScreenshots: retrieveStoredLastViewedRandomScreenshots(),
  }
}

export function saveUserInLocalStorage(user: User): void {
  localStorage.setItem('jwt', user.jwt)
  localStorage.setItem('username', user.username)
  localStorage.setItem('canModerateScreenshots', user.canModerateScreenshots ? '1' : '0')
  localStorage.setItem('lastViewedRandomScreenshots', user.lastViewedRandomScreenshots.join(','))
}

function retrieveStoredLastViewedRandomScreenshots() {
  const lastViewedRandomScreenshots = localStorage.getItem('lastViewedRandomScreenshots')
  if (!lastViewedRandomScreenshots) {
    return []
  }
  return lastViewedRandomScreenshots.split(',').map(n => Number.parseInt(n, 10))
}

export function removeUserFromLocalstorage(): void {
  localStorage.removeItem('jwt')
  localStorage.removeItem('username')
  localStorage.removeItem('canModerateScreenshots')
  localStorage.removeItem('lastViewedRandomScreenshots')
}
