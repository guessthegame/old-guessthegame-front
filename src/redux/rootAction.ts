import { ActionType } from 'typesafe-actions'
import * as commonActions from './common/actions'
import * as userActions from './features/user/actions'

const rootAction = {
  common: commonActions,
  user: userActions,
}
export default rootAction

export type RootAction = ActionType<typeof rootAction>
