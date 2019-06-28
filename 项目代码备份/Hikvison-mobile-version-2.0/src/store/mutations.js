export const setData = (state, { dataName, data }) => {

  if (dataName.indexOf(".") != -1) {
    state[dataName.split('.')[0]][dataName.split('.')[1]] = data;
  } else {
    state[dataName] = data;
  }
}



