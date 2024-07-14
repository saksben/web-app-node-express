import axios from "axios";

function speakerService() {
  function getSpeakerById(id) {
    return new Promise((resolve, reject) => {
      axios
        .get("http://localhost:3000/speakers/" + id)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
  return { getSpeakerById };
}

export default speakerService();
