import { takeEvery, put } from 'redux-saga/effects';

// 'worker' saga
function* workerSaga() {
  console.log('hey from worker');
  console.log(put({ type: 'ACTION_FROM_WORKER'}));
  yield put({ type: 'ACTION_FROM_WORKER'})
}

// 'watcher' saga
function* rootSaga() {
  yield takeEvery('hello', workerSaga)
}

export default rootSaga;

// 'watcher' saga which listens to 'actions' dispatched from store and it will invoke to 'worker' saga
