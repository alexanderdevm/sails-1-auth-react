export default function homeReducer(
  state = {
    firstValue: '',
    secondValue: ''
  },
  action
) {
  switch (action.type) {
    case 'homeSetFirstValue':
      state = {
        ...state,
        firstValue: action.value
      };
      break;
    case 'homeSetSecondValue':
      state = {
        ...state,
        secondValue: action.value
      };
      break;
    default:
      return state;
  }
  return state;
}
