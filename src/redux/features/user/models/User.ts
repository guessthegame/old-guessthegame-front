export default interface User {
  username: string
  jwt: string
  canModerateScreenshots: boolean
  lastViewedRandomScreenshots: Array<number>
}
