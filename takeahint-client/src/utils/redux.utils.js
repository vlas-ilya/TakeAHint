export function change(filed, value) {
  const getValue = (action, state) => {
    if (value === undefined) {
      return action.payload;
    }
    if (typeof value === 'function') {
      return value(action.payload, state);
    }
    return value;
  };

  return (state, action) => ({
    ...state,
    [filed]: getValue(action, state),
  });
}
