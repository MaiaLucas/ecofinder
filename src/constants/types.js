import API from "../API";

// let TYPES = ["E-Coleta", "EcoExperiências", "EcoCompras"];
let TYPES = [];

fetch(API + "/type")
  .then((res) => res.json())
  .then(
    (result) => {
      result.forEach((type) => {
        TYPES.push(type.name);
      });
    },
    (error) => {
      return error;
    }
  );

export default TYPES;
