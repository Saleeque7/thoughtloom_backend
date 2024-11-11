import schema from "../Entities/index.js";
const { Article, User } = schema;

export const userrepositories = {
    addPreference: async (data, userId) => {
        try {

            const user = await User.findByIdAndUpdate(
                userId,
                {
                    $set: { articlePreference: data }, 
                },
                { new: true } 
            );
            if (!user) {
                return { success: false, message: "error in update user" }
            }
            return { success: true, user };
        } catch (error) {
            console.error("Error in userpreference:", error.message);
            return { success: false, message: error.message }
        }
    },
    createArticle: async (data, image, userId) => {
        try {
            const { title, subTitle, content } = data

            const articleInfo = {
                title,
                subTitle,
                overView: content,
                image,
                author: userId
            }
            const article = await Article.create(articleInfo)
            if (!article) {
                return { success: false, message: "error in create article" }
            }
            return { success: true, article };
        } catch (error) {
            console.error("Error in createArticle:", error.message);
            return { success: false, message: error.message }
        }
    },
    browseArticles: async (active, userId , id) => {
        try {
            let filter = {};
    
            if (active === 'For you') {
                filter = {};
            } else if (active === 'my_articles') {
                filter = { author: userId };
            } else if(!active && id !== null){
                filter = { _id: id };
    
            }
            else {
                filter = { subTitle: active };
            }
    
            const articles = await Article.find(filter)
                .sort({ createdAt: -1 })
                .populate('author');
    
            if (!articles) {
                return { success: false, message: "Error in browse article" };
            }
            return { success: true, articles };
        } catch (error) {
            console.error("Error in browseArticles:", error.message);
            return { success: false, message: error.message };
        }
    },
    editArticle: async (data, id) => {
        try {
            const updatedArticle = await Article.findByIdAndUpdate(
                id, 
                { $set: data }, 
                { new: true }
            );
            return { success: true, updatedArticle };
        } catch (error) {
            console.error("Error in editArticle:", error.message);
            return { success: false, message: error.message };
        }
    },
        deleteArticle:async(id)=>{
            try {
                const article  =  await Article.findByIdAndDelete(id)
             
                return  { success: true, article };
            } catch (error) {
                console.error("Error in deleteArticle:", error.message);
                return { success: false, message: error.message };
            }
        }
}