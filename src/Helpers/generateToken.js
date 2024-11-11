import jwt from "jsonwebtoken";
import config from '../config/config.js'

const generateAccessToken = (data) => {
    return jwt.sign({ data }, config.JWT_SECRET, {
        expiresIn: "1m",
    });
};
const generateRefreshToken = (data) => {
    return jwt.sign({ data }, config.JWT_SECRET, {
        expiresIn: "30d",
    });
};

export const generateToken = (res, data) => {

    const payLoad = {
        id: data,
    }
    console.log(payLoad, "pay");


    const accessToken = generateAccessToken(payLoad);
    const refreshToken = generateRefreshToken(payLoad);

    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'none',
        maxAge: 30 * 24 * 60 * 60 * 1000,
        path: '/'
    })

    return {
        accessToken
    };
};



