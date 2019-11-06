import { take, call } from 'redux-saga/effects';

import { IMAGES } from '../constants/index';

// 'worker' saga
function* handleImagesLoad() {
  console.log('fetching images from unsplash')
}

function* handleDang() {
  console.log('DANG!!!')
}

// 'watcher' saga
function* rootSaga() {
  yield take(IMAGES.LOAD);
  yield call(handleImagesLoad);
  yield take('DANG');
  yield call(handleDang);
}

export default rootSaga;

// 'watcher' saga which listens to 'actions' dispatched from store and it will invoke to 'worker' saga
// 'take' effect is more controlled and fires 'workerSaga' once - blocking effect
// 'takeEvery' effect fires 'workerSaga' each time - non-blocking effect
