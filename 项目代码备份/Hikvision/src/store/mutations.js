export const setData = (state, {dataName, data}) => {
  console.log('params: ', dataName, data);
  state[dataName] = data;
}



