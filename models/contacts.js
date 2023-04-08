const { Schema, model, SchemaTypes } = require("mongoose");
const { handleSchemaErrorValidation } = require("../middlewars");

const contactSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
      match: /^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: SchemaTypes.ObjectId,
      ref: "user",
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

contactSchema.post("save", handleSchemaErrorValidation);

const Contact = model("contact", contactSchema);

module.exports = {
  Contact,
};
