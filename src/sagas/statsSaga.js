import { take, fork, put, call } from 'redux-saga/effects';

import { IMAGES } from '../constants/index';
import { fetchImageStats } from '../api/index';
import { loadImageStats, setImageStats, setImageStatsError } from '../actions/index';

function* handleStatsRequest(id) {
  for (let i = 0; i < 3; i++) {
    try {
      yield put(loadImageStats(id));
      const res = yield call(fetchImageStats, id);
      yield put(setImageStats(id, res.downloads.total));
    } catch (e) {
      yield put(setImageStatsError(id));
    }
  }
}

export default function* watchStatsRequest() {
  while (true) {
    const { images } = yield take(IMAGES.LOAD_SUCCESS);
    // yield not working inside forEach!!!!
    // images.forEach(image => {
    //   yield fork(handleStatsRequest, image.id)
    // });
    for (let i = 0; i < images.length; i++) {
      yield fork(handleStatsRequest, images[i].id);
    }
  }
}
