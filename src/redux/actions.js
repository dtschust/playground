import { createAction } from 'redux-act'

export const fakeAction = createAction('fake action')

export const fakeThunkAction = function () {
  return (dispatch) => {
    // do some stuff here
  }
}
