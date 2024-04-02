const { User } = require("../models/user")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const SECRET_KEY = "123456789"

const resolvers = {
  
  Query: {
    getUser: async (_, { id }) => {
      try {
        const user = await User.findById(id);
        console.log("User information:", user);
      } catch (error) {
      
        throw new Error("Error while getting user", error)
      }
    },
  },
  //  { ...rest }): This part is using destructuring assignment. It seems to be a function with two parameters.
  //  The first parameter (_) is often used as a convention when you don't need the value of the parameter. 
  //  The second parameter is using object destructuring ({ ...rest }), which means it is extracting all the properties
  //   of the second argument object into a variable named restF
  Mutation: {
    createUser: async (_, { ...rest }) => {
      const { firstName, lastName, password, email, phoneNumber } = rest.input
      try {
        const existingUser = await User.findOne({ email })
        if (existingUser) {
          return {
            code: "409",
            success: false,
            message: "User with this email already exists",
          }
        }
        const hashedPassword = await bcrypt.hash(password, 11)
        const user = new User({
          firstName,
          lastName,
          email,
          phoneNumber,
          password: hashedPassword,
        })
        console.log("User information:", user);
        await user.save()

        const token = jwt.sign({ userId: user._id }, SECRET_KEY, {
          expiresIn: "7d",
        })
        return {
          code: "200",
          success: true,
          message: "User created",
          user: { token, ...user.toJSON() },
        }
      } catch (error) {
        const message = error?.message || "Something went wrong"
        return {
          code: "500",
          success: false,
          message: message,
        }
      }
    },

    login: async (_, { email, password }) => {
      try {
        const user = await User.findOne({ email })
        if (!user) {
          throw new Error("Credentials Invalid")
        }
        const passwordMatch = await bcrypt.compare(password, user.password)
        if (!passwordMatch) {
          throw new Error("Credentials Invalid")
        }
        const token = jwt.sign({ userId: user._id }, SECRET_KEY, {
          expiresIn: "7d",
        })
        return {
          code: "200",
          success: true,
          message: "Login successful",
          user: { token, ...user.toJSON() },
        }
      } catch (error) {
        const message = error?.message || "Something went wrong"
        return {
          code: "500",
          success: false,
          message: message,
        }
      }
    },


    updateUser: async (_, { id, input }) => {
      try {
        const updatedUser = await User.findByIdAndUpdate(id, input, {
          new: true,
        })
        console.log("User information:", updatedUser);
        return {
          code: "200",
          success: true,
          message: "User updated",
          // user: updatedUser.toJSON(),
        }
       
      } catch (error) {
        console.error("Error in updateUser resolver:", error)
        throw new Error("Error updating user")
      }
    },

    deleteAccount: async (_, { id }) => {
      try {
        await User.findByIdAndDelete(id)
        console.log("User information:", User);
        return {
          code: "200",
          success: true,
          message: "Account deleted",
        }
      } catch (error) {
        return {
          code: "500",
          success: false,
          message: "Error deleting account",
        }
      }
    },


  },
}

module.exports = resolvers
