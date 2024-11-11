import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
        },
        password: {
            type: String,
            required: true,
        },
        profile: {
            location: {
                type: String,
            },
            key: {
                type: String,
            },
        },
        phone: {
            type: String,
            trim: true,
        },
        bio: {
            type: String,
            maxLength: 200,
        },
        articlePreference: [
            {
              type: String,
            }
          ]
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model("User", userSchema);

export { User };
