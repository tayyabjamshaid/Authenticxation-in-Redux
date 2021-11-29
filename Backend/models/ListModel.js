import mongoose from "mongoose";

const listSchema = new mongoose.Schema(
  {
    listItems: [
      {
        title: { type: String, required: true },
        progress: { type: Number, required: true },
        task: { type: String, required: true },
        description: { type: String, required: true },
        attachment: { type: String, required: true },
        checkBox: { type: String, required: true },
      },
    ],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const List = mongoose.model("List", listSchema);
export default List;
