import motor.motor_asyncio
from bson import ObjectId
import os

client = motor.motor_asyncio.AsyncIOMotorClient(os.environ["MONGODB_URL"])

database = client.test

products_collection = database.get_collection('products')


def product_helper(product) -> dict:
    return {
        "id": str(product['_id']),
        "productId": product['productId'],
        "name": product['name'],
        "price": product['price'],
        "qty": product['qty'],
        "imgSource": product['imgSource'],
    }


async def get_products() -> list[dict]:
    products = []
    async for product in products_collection.find():
        products.append(product_helper(product))
    return products


async def add_product(product: dict) -> dict:
    product = await products_collection.insert_one(product)
    new_product = await products_collection.find_one({"_id": product.inserted_id})
    return product_helper(new_product)


async def delete_product(name: str):
    product = await products_collection.find_one({"name": name})
    if product:
        await products_collection.delete_one({"name": name})
        return True


async def update_product(name: str, data: dict):
    product = await products_collection.find_one({"name": name})
    if product:
        products_collection.update_one({"name": name}, {'$set': data})
        return True


async def restock_product(name: str, qtyChange: dict):
    product = await products_collection.find_one({"name": name})
    if product:
        products_collection.update_one({"name": name},
                                       {"$inc": {"qty": qtyChange}})
        return True
