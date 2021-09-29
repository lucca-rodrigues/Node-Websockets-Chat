import { server, port } from "./http";
import "./websockets/ChatService";

server.listen(port, () => console.log(`server listened on port ${port}`));
