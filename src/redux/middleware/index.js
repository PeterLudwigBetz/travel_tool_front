import { all } from 'redux-saga/effects';
import { userAuth } from './userAuthSagas';
import {
  watchFetchRequests,
  watchCreateNewRequestAsync,
  watchFetchUserRequestsDetails,
  watchEditRequest,
} from './requestsSaga';
import {
  watchPostUserDataSagaAsync,
  watchGetUserDataSagaAsync
} from './userDataSaga';
import {
  watchGetRoleDataSagaAsync,
  watchPutRoleDataSagaAsync
} from './roleDataSaga';
import { watchFetchRoleUsers } from './roleSaga';
import {
  watchCreateComment,
  watchEditComment,
  watchDeleteComment
} from './commentsSaga';
import {
  watchFetchApprovals,
  watchUpdateRequestStatus
} from './approvalsSaga';
import {
  watchFetchNotifications,
  watchAddNotification,
  watchUpdateAllNotificationStatus,
  markSingleNotificationAsReadSaga
} from './notificationsSaga';

import { watchCreateAccommodationSagaAsync, watchFetchAccommodation, watchEditAccommodation } from './accommodationSaga';
import { watchUpdateUserProfileAsync } from './UserProfileSaga';

function* rootSaga() {
  yield all([
    userAuth(),
    watchFetchRequests(),
    watchFetchApprovals(),
    watchCreateNewRequestAsync(),
    watchPostUserDataSagaAsync(),
    watchGetUserDataSagaAsync(),
    watchGetRoleDataSagaAsync(),
    watchPutRoleDataSagaAsync(),
    watchFetchRoleUsers(),
    watchFetchUserRequestsDetails(),
    watchCreateComment(),
    watchDeleteComment(),
    watchUpdateRequestStatus(),
    watchEditComment(),
    watchFetchNotifications(),
    watchUpdateUserProfileAsync(),
    watchEditRequest(),
    watchAddNotification(),
    watchFetchAccommodation(),
    watchUpdateUserProfileAsync(),
    watchUpdateAllNotificationStatus(),
    watchCreateAccommodationSagaAsync(),
    markSingleNotificationAsReadSaga(),
    watchEditAccommodation()
  ]);
}

export default rootSaga;
