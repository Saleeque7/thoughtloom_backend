import { comparePassword, hashUserPassword } from "../Helpers/hashpassword.js";
import { generateToken } from "../Helpers/generateToken.js";
import jwt from 'jsonwebtoken'
export const authUseCase = {
    registerUseCase: (dependencies) => {
        const executeFunction = async (res, data) => {
            const { repositories: { authRepositories: { registerUser } } } = dependencies;
            try {
                const { password } = data
                const hashed = await hashUserPassword(password)
                data.password = hashed
                const result = await registerUser(data);
                if (!result.success) {
                    return { success: false, error: result.message || 'Unauthorized action', statusCode: 401 };
                }
                const { accessToken } = await generateToken(res, result.user._id)

                return { success: true, data: result.user, accessToken };

            } catch (error) {
                console.error("Error in executeFunction:", error);
                return { success: false, error: "An error occurred during user registration", statusCode: 500 };
            }
        };

        return { executeFunction };
    },
    loginUseCase: (dependencies) => {
        const executeFunction = async (res, data) => {
            const { repositories: { authRepositories: { loginUser } } } = dependencies;
            try {
                const result = await loginUser(data)
                if (!result.success) {
                    return { success: false, error: result.message || 'Unauthorized action', statusCode: 401 };
                }

                const isMatch = await comparePassword(data.password, result.isEmail.password)
                if (!isMatch) {
                    return { success: false, error: 'password do not match', statusCode: 401 };

                }
                const { accessToken } = await generateToken(res, result.isEmail._id)

                return { success: true, data: result.isEmail, accessToken };

            } catch (error) {
                console.error("Error in executeFunction:", error);
                return { success: false, error: "An error occurred during user login", statusCode: 500 };
            }
        }
        return { executeFunction }
    },
    refreshUsecase: (dependencies) => {
        const executeFunction = async (res, token) => {
            const { config: { JWT_SECRET } } = dependencies
            try {
                const decoded = jwt.verify(token, JWT_SECRET)
                const id = decoded.data.id;
                const { accessToken } = await generateToken(res, id)

                if (!accessToken) {

                    return { success: false, error: 'error in token generating', statusCode: 401 };
                }

                return { success: true, accessToken }

            } catch (error) {
                console.error("Error in executeFunction:", error);
                return { success: false, error: "An error occurred during user login", statusCode: 500 };
            }
        }
        return { executeFunction }
    }
};
