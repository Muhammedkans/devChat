const validator = require("validator")


const validateSignUpDate = (req)=>{

  const {firstName, lastName, emailId, password} = req.body;
  if(!firstName|| !lastName){
    throw new Error(" Name is not valid ")
  }
  else if(!validator.isEmail(emailId)){
   throw new Error("Email id is not valid ")
  }
  else if(!validator.isStrongPassword(password)){
    throw new Error("Plz enter a strong Passwod ")
  }

};


const validateEditProfileDate = (req)=> {

  const allowedEditField = ["firstName",  "lastName ", "gender","age" ,"about", "skills"];

const isEditAllowed = Object.keys(req.body).every((field)=>{
  return allowedEditField.includes(field)
});

return  isEditAllowed;
};



module.exports = {
  validateSignUpDate,
  validateEditProfileDate,
}
