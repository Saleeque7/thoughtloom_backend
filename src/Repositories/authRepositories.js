import schema from "../Entities/index.js";
const { User } = schema;
export const authRepositories = {
    registerUser: async (data) => {
        const {
            firstName,
            lastName,
            email,
            phone,
            password,
        } = data
        try {

            const userInfo = {
                name: firstName + ' ' + lastName,
                email,
                phone,
                password
            }
            const isEmail = await User.findOne({ email: email });
             if(isEmail){
                return {success:false , message:"user alraedy exist"}
             }
            const user = await User.create(userInfo);
            return { success: true, user }

        } catch (error) {
            console.error("Error in registerUser:", error.message);
            return { success: false, message: error.message }
        }

    },
    loginUser:async(data)=>{
        const {email }  = data
        try {
            const isEmail = await User.findOne({ email: email });
            if(!isEmail){
                return {success:false , message:"email does not exist"}
             }
             return { success: true, isEmail }
            
        } catch (error) {
            console.error("Error in loginUser:", error.message);
            return { success: false, message: error.message }
        }
    }
}