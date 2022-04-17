import { ATLAS_URI } from "./config";

mongoose
  .connect(ATLAS_URI, { useNewUrlParser: true })
//   .then(() => {
//     console.log("Mongo DB connected");
//   })
//   .catch((error) => {
//     console.log(error);
//   });