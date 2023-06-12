const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const gameSchema = new Schema(
  {
    title: String,
    release: String,
    description: String,
    metacritic: Number,
    image: {
        type: String,
        default: ""
    },
    video: {
        type: String,
        default: ""
    },
    genres: [String],
    platforms: [String],
},
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`    
    timestamps: true
  }
);

module.exports = model("Game", gameSchema);
