import api from "./apiConfig"

export default (async function callApiFrames(file,config) {
    api.post('/videos', file,config)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });


  });
