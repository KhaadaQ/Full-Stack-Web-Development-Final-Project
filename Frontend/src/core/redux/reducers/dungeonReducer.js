const initialState = {
    dungeons: [],
  };
  
  const dungeonReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_DUNGEONS':
        return {
          ...state,
          dungeons: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default dungeonReducer;