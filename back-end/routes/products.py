from fastapi import APIRouter, Body
from fastapi.encoders import jsonable_encoder

from database.mongo import get_products, add_product, delete_product,\
    update_product, restock_product

from models.products import ProductModel, ProductsModel, UpdateProductModel, \
    RestockProductModel, ResponseModel, ErrorResponseModel


router = APIRouter()


@router.get("/", response_description="Successfully retrieved the products data")
async def get_products_data():
    products = await get_products()
    return products \
        if products \
        else "No product yet."


@router.post("/", response_description="Successfully added new product into the database")
async def add_product_data(product: ProductModel = Body(...)):
    product = jsonable_encoder(product)
    new_product = await add_product(product)
    return ResponseModel(new_product, "Successfully added the product." \
        .format(new_product['name']))


@router.delete("/{name}", response_description="Successfully deleted the product from the database")
async def delete_product_data(name: str):
    is_deleted = await delete_product(name)
    return ResponseModel(name, "Successfully deleted the product.") \
        if is_deleted \
        else ErrorResponseModel(404, "Product name {} doesn't exist".format(name))


@router.put("/{name}", response_description="Successfully updated the product data")
async def update_product_data(name: str, req: UpdateProductModel = Body(...)):
    is_updated = await update_product(name, req.dict())
    return ResponseModel(name, "Successfully updated the product.") \
        if is_updated \
        else ErrorResponseModel(404, "Error updating the product name {}.".format(name))


@router.put("/restock/{name}", response_description="Successfully updated the product's quantity")
async def restock_product_data(name: str, qtyChange: int):
    is_restocked = await restock_product(name, qtyChange)
    return ResponseModel(name, "Successfully restocked the product.") \
        if is_restocked \
        else ErrorResponseModel(404, "Error restock the product name {}.".format(name))

# Get all products (R)

# Add new product (C)

# Delete product (D)

# Update product (U)
