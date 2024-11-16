import bcrypt from "bcrypt"


export const createHash = (password)=>{
return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
};

export const isValidPassword = async (password, userPassword)=>{
return await bcrypt.compare(password, userPassword)
}