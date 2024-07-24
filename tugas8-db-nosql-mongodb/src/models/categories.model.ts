import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const CategorySchema = new Schema(
    {
        name:{
            type: String,
            required: true,
        },
        products:[{
            type: Schema.Types.ObjectId,
            ref: "Products"
        }]
    },
    {
        timestamps: true,
    }
);

const CategoriesModel = mongoose.model("Category",CategorySchema);

export default CategoriesModel;