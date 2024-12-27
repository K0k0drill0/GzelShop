from database import Database
import asyncio

db = Database(config_path="fillingConfig.json")

products = [[
    ["Gzhel Soup Bowl", "Deep bowl with traditional Gzhel painting, perfect for soups", 20.2, 50],
    ["Gzhel Appetizer Plate", "Flat plate with Gzhel-style patterns for serving appetizers", 25.5, 30],
    ["Gzhel Tea Set", "Tea set for 6 people, decorated with classic Gzhel patterns", 75.0, 20],
    ["Gzhel Mug", "Ceramic mug with hand-painted Gzhel designs", 15.4, 100],
    ["Gzhel Sugar Bowl", "Elegant sugar bowl with a lid, designed in Gzhel style", 18.9, 70],
], [
    ["Gzhel Coffee Pot", "Porcelain coffee pot with traditional Gzhel patterns", 30.0, 40],
    ["Gzhel Tea Cup and Saucer", "Cup and saucer with exquisite Gzhel ornaments", 22.5, 80],
    ["Gzhel Flower Vase", "Porcelain vase painted in blue tones, perfect for decoration", 35.0, 50],
    ["Gzhel Butter Dish", "Dish for storing butter with a lid, decorated in Gzhel style", 18.0, 90],
    ["Gzhel Dessert Plate", "Small plate for sweets, adorned with Gzhel patterns", 14.99, 120],
], [
    ["Gzhel Water Pitcher", "Ceramic pitcher with elaborate Gzhel-style painting", 40.0, 60],
    ["Gzhel Serving Tray", "Porcelain tray with hand-painted designs for serving drinks", 35.5, 45],
    ["Gzhel Serving Set", "Set of plates and bowls for table setting, styled in Gzhel design", 85.0, 15],
    ["Gzhel Salt and Pepper Shakers", "Spice set with Gzhel patterns", 12.99, 100],
    ["Gzhel Espresso Cup", "Miniature cup with traditional Gzhel painting", 10.5, 150],
], [
    ["Gzhel Candy Dish", "Porcelain candy dish with elegant Gzhel painting", 25.99, 80],
    ["Gzhel Soup Tureen", "Large tureen for serving hot dishes, adorned with classic Gzhel designs", 60.0, 40],
    ["Gzhel Milk Jug", "Jug for serving cream or milk, hand-painted in Gzhel style", 18.0, 70],
    ["Gzhel Bread Box", "Porcelain bread box for serving fresh bread with Gzhel motifs", 50.0, 25],
    ["Gzhel Tea Canister", "Tea storage jar with a lid, designed in Gzhel style", 22.5, 90],
], [
    ["Gzhel Oil Lamp", "Decorative porcelain lamp with Gzhel patterns", 45.0, 20],
    ["Gzhel Wine Glass", "Elegant porcelain wine glass with hand-painted designs", 30.5, 50],
    ["Gzhel Latte Cup", "Large cup with Gzhel painting, perfect for coffee drinks", 20.5, 100],
    ["Gzhel Jam Set", "Set of jars with Gzhel painting for serving jam", 55.0, 30],
    ["Gzhel Fruit Bowl", "Large bowl for fruits with unique hand-painted designs", 40.0, 60],
]]

def get_bytes_image(filename):
    with open("../resources/" + filename, "rb") as image_file:
        return image_file.read()

async def insert_products(categories, db):
    await db.connect()
    category_id = 1
    count = 1
    for category in categories:
        for product in category:
            async with db.pool.acquire() as conn:
                product_name = product[0]
                product_description = product[1]
                price = product[2]
                quantity = product[3]
                image_filename = str(count) + ".jpg"

                image_in_bytes = get_bytes_image(image_filename)
                await db.insert_product(conn, product_name, product_description, price, quantity, category_id, image_in_bytes)
                count += 1
        category_id += 1


asyncio.run(insert_products(products, db))