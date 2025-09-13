import { JwtPayload } from "jwt-decode";

interface ExtendedJwt extends JwtPayload {
    // your custom properties
    // adjust the types as well
    username:string
  }

export default ExtendedJwt