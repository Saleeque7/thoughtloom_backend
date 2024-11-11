export const userController = (dependencies) => {
    return {
        addPreferenceController: async (req, res, next) => {
            const { useCases: { userUsecase: { addPreferenceuseCase } } } = dependencies;
            try {
                const preference = req.body.preferences
                const userId = req.userId
                const { executeFunction } = await addPreferenceuseCase(dependencies)
                const result = await executeFunction(preference, userId)
                if (!result.success) {
                    return res.status(result.statusCode).json({ status: 'error', message: result.error })
                }
                return res.status(200).json({ status: 'success', user: result.data });
            } catch (error) {
                error.statusCode = 500;
                next(error);
            }
        },
        articleController: async (req, res, next) => {
            const { useCases: { userUsecase: { articleUsecase } } } = dependencies;
            const userId = req.userId
            const data = req.body
            const { key, location } = req.file
            const image = { location, key }

            try {
                const { executeFunction } = await articleUsecase(dependencies)
                const result = await executeFunction(data, image, userId)
                if (!result.success) {
                    return res.status(result.statusCode).json({ status: 'error', message: result.error })
                }
                return res.status(200).json({ status: 'success' })
            } catch (error) {
                error.statusCode = 500
                next(error)
            }

        },
        browseArticleController: async (req, res, next) => {
            const { useCases: { userUsecase: { browseArticleusecase } } } = dependencies
            const active = req.query.Head
            const userId = req.userId
            const { id } = req.params

            try {
                if (!active && !id) {
                    return res.status(401).json({ message: "active head not available" })
                }
                const { executeFunction } = await browseArticleusecase(dependencies)
                const result = await executeFunction(active, userId, id)
                if (!result.success) {
                    return res.status(result.statusCode).json({ status: 'error', message: result.error })
                }
                return res.status(200).json({ status: 'success', articles: result.articles })
            } catch (error) {
                error.statusCode = 500
                next(error)
            }
        },
        editArticleController: async (req, res, next) => {
            const { useCases: { userUsecase: { editarticleUsecase } } } = dependencies;
            const data = req.body;
            const { id } = req.params;
            const { title, subTitle, content } = data;

            let updatedData = {
                title,
                subTitle,
                overView: content,
            };

            if (req.file) {
                const { key, location } = req.file;
                updatedData.image = { location, key };
            }

            try {
                const { executeFunction } = await editarticleUsecase(dependencies);
                const result = await executeFunction(updatedData, id);

                if (!result.success) {
                    return res.status(result.statusCode).json({ status: 'error', message: result.error });
                }

                return res.status(200).json({ status: 'success' });
            } catch (error) {
                error.statusCode = 500;
                next(error);
            }
        },
        deleteArticleController: async (req,res,next) => {
        
            const { useCases: { userUsecase: { deleteArticleUsecase } } } = dependencies

            const { id } = req.params
            try {
                if (!id) {
                    return res.status(403).json({ status: 'error', message: 'credential not available' })
                }
                const { executeFunction } = await deleteArticleUsecase(dependencies)
                const result = await executeFunction(id)
                if (!result.success) {
                    return res.status(result.statusCode).json({ status: 'error', message: result.error })
                }
                return res.status(200).json({ status: 'success', message: result.message })
            } catch (error) {
                error.statusCode = 500;
                next(error);
            }
        }

    }
}