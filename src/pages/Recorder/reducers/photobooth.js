const initialState = {
    videos: [],
    images: [],
    settings: {
        burst: 5,
        burstRate: 0.1,
        format: '.png',
        enableFeed: false
    },
    stream: null
};

function photobooth(state = initialState, action) {
    if (action.type === 'UPDATE_SETTINGS') {
        var settings = {...state.settings, ...action.payload}
        return {...state, settings}
    } else if (action.type === 'ADD_IMAGE') {
        var images = state.images;
        images.push(action.payload);
        return {...state, images}
    } else if (action.type === 'REMOVE_IMAGE'){
        var images = state.images.filter(image=>image !== action.payload)
        return {...state, images}
    } else if (action.type === 'DELETE_ALL'){
        return {...state, images: [], videos: []}
    } else if (action.type === 'SET_STREAM'){
        var stream = action.payload;
        return {...state, stream}
    } else {
        return state;
    }
};

export default photobooth;