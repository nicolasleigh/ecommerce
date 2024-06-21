import jwt from "jsonwebtoken";

const createToken = async (data) => {
  const token = await jwt.sign(data, process.env.SECRET!, { expiresIn: "7d" });
  return token;
};

export default createToken;
