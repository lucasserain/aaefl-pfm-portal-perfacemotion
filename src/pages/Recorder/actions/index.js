export function updateSettings(payload) {
  return { type: 'UPDATE_SETTINGS', payload };
}

export function removeImage(payload) {
  return { type: 'REMOVE_IMAGE', payload };
}

export function addImage(payload) {
  return { type: 'ADD_IMAGE', payload };
}

export function addVideo(payload) {
  return { type: 'ADD_VIDEO', payload };
}

export function removeVideo(payload) {
  return { type: 'REMOVE_VIDEO', payload };
}

export function deleteAll(payload) {
  return { type: 'DELETE_ALL', payload };
}

export function setStream(payload) {
  return { type: 'SET_STREAM', payload };
}
