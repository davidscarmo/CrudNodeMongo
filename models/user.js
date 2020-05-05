const mongoose = require('../database'); 
const bcrypt = require('bcryptjs'); 

const UserSchema = new mongoose.Schema(
    {
        name: 
        {
            type: String, 
            require: true, 
        }, 
        email: 
        {
            type: String, 
            unique: true, 
            required: true, 
            lowercase: true, 
        }, 
        password: 
        {
            type: String, 
            required: true, 
            select: false,
        }, 
        creatAt: 
        {
            type: Date, 
            default: Date.now, 
        }, 
    }); 

    UserSchema.pre('save', async function (next)
    {
        const hash = await bcrypt.hash(this.password, 10); // 10 is the number of hash rounds 
        
        
        this.password = hash; 

        next(); 
    });
    
    const User = mongoose.model('User', UserSchema); 

    module.exports = User; 