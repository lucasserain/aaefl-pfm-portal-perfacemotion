export function putRequestWithBodyUploadFile(img,merda) {
  return {
    method: 'POST',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type',
      'Access-Control-Request-Method': '*'

    },
    body: img
  }
}
