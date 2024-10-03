import { jwtDecode as decode } from "jwt-decode";
import { User } from '../types';

function decodeToken(token: string): User {
  const user: User = decode(token);
  return user;
}

export default decodeToken;