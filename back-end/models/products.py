from typing import Optional
from datetime import datetime
from pydantic import BaseModel, PositiveFloat, PositiveInt, Field


class ProductModel(BaseModel):
    productId: Optional[int]
    name: str = Field(...)
    price: PositiveFloat = Field(...)
    imgSource: str = Field(...)
    qty: PositiveInt = Field(0)


class ProductsModel(BaseModel):
    products: list[ProductModel]


class RestockProductModel(BaseModel):
    name: str = Field(...)
    qtyChange: int = Field(...)

class UpdateProductModel(BaseModel):
    productId: Optional[int]
    name: str
    price: Optional[PositiveFloat]
    imgSource: Optional[str]
    qty: Optional[PositiveInt]


def ResponseModel(data, message):
    return {
        "data": data,
        "code": 200,
        "message": message,
    }


def ErrorResponseModel(code, message):
    return {
        "code": code,
        "message": message
    }
