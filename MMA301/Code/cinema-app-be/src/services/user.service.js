import userRepository from "../repositories/user.repository.js";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userService = {
    login: async (req) => {
        const { gmail, password } = req.body;
        try {
            const user = await userRepository.findUserByEmail(gmail);
            if (!user) {
                return { message: "Error", content: "User not found" };
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return { message: "Error", content: "Invalid password" };
            }

            console.log("isPasswordValid:" + isPasswordValid);

            const token = jwt.sign(
                { user: user },
                process.env.JWT_SECRET,
                { expiresIn: "1h" }
            );

            return { message: "Login successful", token };
        } catch (error) {
            return { message: "Error", content: error.toString() };
        }
    },
    register: async (req) => {
        const { gmail, password, firstName, lastName, phone_number } = req.body;
        const fullname = firstName + " " + lastName;
        try {
            let user = await userRepository.findUserByEmail(gmail);          
            if (user) {
                return { message: "Error", content: "Gmail already exists" };
            }
            user = await userRepository.findUserByPhoneNumber(phone_number);
            if (user) {
                return { message: "Error", content: "Phone number already exists" };
            }
            const hashedPassword = await bcrypt.hash(password, 10);

            const newUser = {
                gmail,
                fullname,
                phone_number,
                status: "active",
                role_id: 1,
                password: hashedPassword
            };
            const createdUser = await userRepository.createUser(newUser);
            return { message: "Success", content: createdUser };
        } catch (error) {
            return { message: "Error", content: error.toString() };
        }
    },

    resetPassword: async (req) => {
        const { gmail, old_password, new_password } = req.body;
        try {
            const user = await userRepository.findUserByEmail(gmail);
            if (!user) {
                return { message: "Error", content: "User not found" };
            }
            if(!bcrypt.compare(old_password, user.password)){
                return { message: "Error", content: "Old password is incorrect" };
            }
            const hashedPassword = await bcrypt.hash(new_password, 10);
            const updatedUser = await userRepository.updatePassword(gmail, hashedPassword);
                  
            return { message: "Success", content: updatedUser };
        } catch (error) {
            return { message: "Error", content: error.toString() };
        }
    }



};

export default userService;