import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";
import * as dotenv from "dotenv";
import { payload } from "../dto/user.dto";

dotenv.config();
const { JWT_SECRET = "" } = process.env;
export class encrypt {
  static async encryptpass(password: string) {
    const salt = await bcrypt.genSaltSync(12);
    // return bcrypt.hashSync(password, salt);
    const hash = bcrypt.hashSync(password, salt);
    // console.log("This is teh"+hash)
     return hash
  }

  static comparepassword(hashPassword: string, password: string) {
    return bcrypt.compareSync(password, hashPassword);
  }

  static generateToken(payload: payload) {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: "35d" });
  }
}
