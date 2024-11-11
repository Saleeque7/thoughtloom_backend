
export const authController = (dependencies) => {
    return {
        registerController: async (req, res, next) => {
            const userData = req.body;
            const { useCases: { authUseCase: { registerUseCase } } } = dependencies;
            try {
                if (!userData) {
                    return res.status(400).json({ status: 'error', message: 'User data not available' });
                }

                const { executeFunction } = registerUseCase(dependencies);
                const result = await executeFunction(res, userData);

                if (!result.success) {
                    return res.status(result.statusCode).json({ status: 'error', message: result.error });
                }

                return res.status(200).json({ status: 'success', user: result.data, accessToken: result.accessToken });

            } catch (error) {
                error.statusCode = 500;
                next(error);
            }
        },
        loginController: async (req, res, next) => {
            const { useCases: { authUseCase: { loginUseCase } } } = dependencies
            try {
                const userData = req.body
                const { executeFunction } = await loginUseCase(dependencies)
                const result = await executeFunction(res, userData)
                if (!result.success) {
                    return res.status(result.statusCode).json({ status: 'error', message: result.error });

                }
                return res.status(200).json({ status: 'success', user: result.data, accessToken: result.accessToken });


            } catch (error) {
                error.statusCode = 500;
                next(error);
            }
        },
        refreshController: async (req, res, next) => {
            const { useCases: { authUseCase: { refreshUsecase } } } = dependencies
            try {
                const token = req.cookies.refreshToken;
                const { executeFunction } = await refreshUsecase(dependencies)
                const result = await executeFunction(res, token)
                if (!result.success) {
                    return res.status(result.statusCode).json({ message: result.message || 'Forbidden' })
                }
                return res.status(200).json({ accessToken: result.accessToken })


            } catch (error) {
                error.statusCode = 500;
                next(error);
            }
        }
    };
};