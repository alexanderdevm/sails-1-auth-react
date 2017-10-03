export function homeSetFirstValue(value) {
  return {
    type: 'homeSetFirstValue',
    value
  };
}

export function homeSetSecondValue(value) {
  return {
    type: 'homeSetSecondValue',
    value: value
  };
}

export function homeSetValues(first, second) {
  return dispatch => {
    dispatch(homeSetFirstValue(first));
    dispatch(homeSetSecondValue(second));
  };
}
