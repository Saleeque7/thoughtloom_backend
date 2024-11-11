export const userUsecase = {
    addPreferenceuseCase: (dependencies) => {
        const { repositories: { userrepositories: { addPreference } } } = dependencies;

        const executeFunction = async (data, userId) => {
            try {
                const result = await addPreference(data, userId)
                if (!result.success) {
                    return { success: false, error: result.message || 'Unauthorized action', statusCode: 401 };
                }
                return { success: true, data: result.user }
            } catch (error) {
                console.error("Error in executeFunction:", error);
                return { success: false, error: "An error occurred during add userpreferances", statusCode: 500 };
            }

        }
        return { executeFunction }
    },
    articleUsecase: (dependencies) => {
        const { repositories: { userrepositories: { createArticle } } } = dependencies;

        const executeFunction = async (data, image, userId) => {
            try {

                if (!data) {
                    return { success: false, error: 'Missing required data', statusCode: 400 };
                }
                const result = await createArticle(data, image, userId)
                if (!result.success) {
                    return { success: false, error: result.message || 'Unauthorized action', statusCode: 401 };
                }
                return { success: true, message: "article saved successfully" }
            } catch (error) {
                console.error("Error in executeFunction:", error);
                return { success: false, error: "An error occurred during add article", statusCode: 500 };
            }
        }
        return { executeFunction }
    },
    browseArticleusecase: (dependencies) => {
        const executeFunction = async (active, userId, id) => {
            const { repositories: { userrepositories: { browseArticles } } } = dependencies
            try {
                const result = await browseArticles(active, userId, id)
                if (!result.success) {
                    return { success: false, error: result.message || 'Unauthorized action', statusCode: 401 };
                }
                return { success: true, articles: result.articles }
            } catch (error) {
                console.error("Error in executeFunction:", error);
                return { success: false, error: "An error occurred during get article", statusCode: 500 };
            }
        }
        return { executeFunction }
    },
    editarticleUsecase: (dependencies) => {
        const { repositories: { userrepositories: { editArticle } } } = dependencies;

        const executeFunction = async (data, id) => {
            try {
                if (!data) {
                    return { success: false, error: 'Missing required data', statusCode: 400 };
                }
                const result = await editArticle(data, id);
                if (!result.success) {
                    return { success: false, error: result.message || 'Unauthorized action', statusCode: 401 };
                }
                return { success: true, message: "Article edited successfully" };
            } catch (error) {
                console.error("Error in executeFunction:", error);
                return { success: false, error: "An error occurred during edit article", statusCode: 500 };
            }
        };
        return { executeFunction };
    },
    deleteArticleUsecase: (dependencies) => {


        const { repositories: { userrepositories: { deleteArticle } } } = dependencies
        const executeFunction = async (id) => {
            try {
                const result = await deleteArticle(id)
                if (!result.success) {
                    return { success: false, error: result.message || 'Unauthorized action', statusCode: 401 };
                }


                return { success: true, message: "Article deleted successfully" };
            } catch (error) {
                console.error("Error in executeFunction:", error);
                return { success: false, error: "An error occurred during delete article", statusCode: 500 };
            }
        }
        return { executeFunction }
    }

}