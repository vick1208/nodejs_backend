import { Request, Response } from "express";
import ProductsModel from "@/models/products.model";
import CategoriesModel from "@/models/categories.model";

export default {
  async create(req: Request, res: Response) {
    try {
      // Cek nama product
      const product = await ProductsModel.findOne({
        name: req.body.name,
      });
      // Jika ada nama product yang sama, program akan return dengan error
      if (product) {
        return res.status(400).json({
          detail: `product with name ${req.body.name} already existed`,
          message: "Failed create product",
        });
      }

      // Mengambil category id dari body request
      const { categoryId } = req.body;

      if (categoryId) {
        const category = await CategoriesModel.findById(categoryId);
        if (!category) {
          return res.status(404).json({
            detail: "Category not found with the given category id",
            message: "Failed create product",
          });
        }
      } else {
        return res.status(404).json({
          detail: "Category id field cannot be empty",
          message: "Failed create product",
        });

      }

      const newProduct = await ProductsModel.create(req.body);

      await CategoriesModel.findByIdAndUpdate(
        categoryId,
        { $push: { products: newProduct._id } },
        { new: true, useFindAndModify: false }
      );

      res.status(201).json({
        data: newProduct,
        message: "Success create product",
      });
    } catch (error) {
      const err = error as Error;
      res.status(500).json({
        detail: err.message,
        message: "Failed create product",
      });
    }
  },
  async findAll(req: Request, res: Response) {
    try {

      const products = await ProductsModel.find();
      res.status(200).json({
        data: products,
        message: "Success get all products",
      });
    } catch (error) {
      const err = error as Error;
      res.status(500).json({
        detail: err.message,
        message: "Failed get all products",
      });
    }
  },
  async findOne(req: Request, res: Response) {
    try {
      const product = await ProductsModel.findOne({
        _id: req.params.id,
      });

      if (!product) {
        return res.status(404).json({
          detail: "Product not found with the given id",
          message: "Failed get one product",
        });
      }

      res.status(200).json({
        data: product,
        message: "Success get one product",
      });
    } catch (error) {
      const err = error as Error;
      res.status(500).json({
        data: err.message,
        message: "Failed get one product",
      });
    }
  },
  async update(req: Request, res: Response) {
    try {

      const existingProduct = await ProductsModel.findOne({
        _id: { $ne: req.params.id },
        name: req.body.name,
      });

      if (existingProduct) {
        return res.status(404).json({
          detail: `Product with name ${req.body.name} already exist`,
          message: "Failed update product"
        });
      }

      const { categoryId } = req.body;

      if (categoryId) {
        const category = await CategoriesModel.findById(categoryId);
        if (!category) {
          return res.status(404).json({
            detail: "Category not found with the given category id",
            message: "Failed create product"
          });
        }
      }

      const product = await ProductsModel.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        {
          new: true,
        }
      );

      if (!product) {
        return res.status(404).json({
          detail: "Product not found with the given id",
          message: "Failed update product"
        });
      } else {
        const categoryFound = await CategoriesModel.findById(categoryId);
        if (categoryFound) {
          const productExist = categoryFound.products.includes(product._id);
          if (!productExist) {
            categoryFound.products.push(product._id);
            await categoryFound.save();
          }
        }
      }

      res.status(200).json({
        data: product,
        message: "Success update product",
      });
    } catch (error) {
      const err = error as Error;
      res.status(500).json({
        detail: err.message,
        message: "Failed update product",
      });
    }
  },
  async delete(req: Request, res: Response) {
    try {
      const product = await ProductsModel.findOneAndDelete({
        _id: req.params.id,
      });

      if (!product) {
        return res.status(404).json({
          detail: "Product not found with the given id",
          message: "Failed delete product",
        });
      }


      await CategoriesModel.updateOne(
        { _id: product.categoryId },
        { $pull: { products: product._id } }
      );

      res.status(200).json({
        data: product,
        message: "Success delete product",
      });
    } catch (error) {
      const err = error as Error;
      res.status(500).json({
        detail: err.message,
        message: "Failed delete product",
      });
    }
  },
};
