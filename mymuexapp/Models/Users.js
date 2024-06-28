var mongoose= require('mongoose');
const{ Schema } = mongoose;
//label 
const userSchema = new Schema({
    uname:String,
    umobile:Number,
    uemail:String,
    upassword:String

})
var userModel=mongoose.model("user",userSchema);
module.exports=userModel;
