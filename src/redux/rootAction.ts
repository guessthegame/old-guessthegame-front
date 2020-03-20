import { ActionType } from 'typesafe-actions'
import * as commonActions from './common/actions'

const rootAction = {
  common: commonActions,
}
export default rootAction

export type RootAction = ActionType<typeof rootAction>
