import { createAction } from 'redux-actions'
import actionTypes from './_action-types'

const sample = createAction(actionTypes.SAMPLE)

export default {
  sample,
}
