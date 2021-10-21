import { serverHttp } from "./app";

const PORT = process.env.PORT || 4000;

serverHttp.listen(PORT, () => {
  console.log(`🚀 Server is running on ${PORT}`);
});
