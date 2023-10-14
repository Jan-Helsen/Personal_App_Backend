import jwt from 'jsonwebtoken'
import * as dotenv from 'dotenv';

dotenv.config()

const jwtSecret = process.env.JWT_SECRET

const generateJwtToken = (useremail: string): string => {
    const options = { expiresIn: `${process.env.JWT_EXPIRES_HOURS}h`, issuer: "jwtShit"};
    try {
        return jwt.sign({ useremail }, jwtSecret, options);
    }
    catch (error) {
        console.log(error);
        throw new Error("Error generating JWT token, see server log for details")
    }
}

export default generateJwtToken;