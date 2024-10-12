const mongoose = require("mongoose");


const connectionRequestSchema = new mongoose.Schema({

  fromUserId : {
    type: mongoose.Schema.Types.ObjectId,
  },

  toUserId: {
    type: mongoose.Schema.Types.ObjectId,
  },

  status:{
    type: String,
    enum:{
  values: ["ignored", "interested", "accepted", "rejected"],
  message: `{VALUE} is incorrect status type`
    },
  },
},{
  timestamps:true,
});


connectionRequestSchema.pre("save", function (next){
connectionRequest = this;

if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
throw new Error("connaot sent connection request to yourself");
}
next();
})


const ConnectionRequestModel = new mongoose.model("ConnectionRequest",connectionRequestSchema);



module.exports = ConnectionRequestModel;