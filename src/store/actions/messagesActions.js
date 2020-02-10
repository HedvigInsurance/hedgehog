import {
  ADD_MESSAGE,
  CLEAR_MESSAGES_LIST,
  EDIT_MEMBER_DETAILS,
  EDIT_MEMBER_DETAILS_SUCCESS,
  ERROR_RECEIVED,
  MEMBER_REQUEST_ERROR,
  MEMBER_REQUEST_SUCCESS,
  MEMBER_REQUESTING,
  MESSAGE_RECEIVED,
  SET_ACTIVE_CONNECTION,
} from '../constants/members'

export const addMessage = (
  message,
  forceSendMessage,
  memberId,
  stompClient,
) => ({
  type: ADD_MESSAGE,
  message,
  forceSendMessage,
  memberId,
  stompClient,
})

export const messageReceived = (message) => ({
  type: MESSAGE_RECEIVED,
  message,
})

export const errorReceived = (error) => ({
  type: ERROR_RECEIVED,
  error,
})

export const clearMessagesList = () => ({
  type: CLEAR_MESSAGES_LIST,
})

export const setActiveConnection = (connection) => ({
  type: SET_ACTIVE_CONNECTION,
  connection,
})

export const memberRequest = (id) => ({
  type: MEMBER_REQUESTING,
  id,
})

export const memberRequestSuccess = (member) => ({
  type: MEMBER_REQUEST_SUCCESS,
  member,
})

export const memberRequestError = (error) => ({
  type: MEMBER_REQUEST_ERROR,
  error,
})

export const editMemberDetails = (member) => ({
  type: EDIT_MEMBER_DETAILS,
  member,
})

export const editMemberDetailsSuccess = (member) => ({
  type: EDIT_MEMBER_DETAILS_SUCCESS,
  member,
})
