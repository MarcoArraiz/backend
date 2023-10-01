import 'dotenv/config';
import bcrypt from 'bcrypt'


export const hashPassword = async (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(parseInt(process.env.SALT)));

export const validatePassword = async (password, hash) => bcrypt.compareSync(password, hash);