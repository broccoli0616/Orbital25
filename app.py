from openai import OpenAI
from dotenv import load_dotenv
from flask import Flask, request, jsonify
from flask_cors import CORS
import traceback
import json
import os
import re

load_dotenv()
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

app = Flask(__name__)
CORS(app)

last_request = {}

product_database = [
  {"Items": "McSpicy Burger", "Stores": "McDonald's", "Prices": "6.95"},
  {"Items": "Double Cheeseburger", "Stores": "McDonald's", "Prices": "5.50"},
  {"Items": "Filet-O-Fish", "Stores": "McDonald's", "Prices": "5.20"},
  {"Items": "Chicken McNuggets (6pc)", "Stores": "McDonald's", "Prices": "5.50"},
  {"Items": "McCrispy Chicken Burger", "Stores": "McDonald's", "Prices": "6.95"},
  {"Items": "Big Mac", "Stores": "McDonald's", "Prices": "6.50"},
  {"Items": "Quarter Pounder with Cheese", "Stores": "McDonald's", "Prices": "7.20"},
  {"Items": "Happy Meal (Chicken Burger)", "Stores": "McDonald's", "Prices": "5.60"},
  {"Items": "Happy Meal (Nuggets)", "Stores": "McDonald's", "Prices": "5.60"},
  {"Items": "Big Breakfast", "Stores": "McDonald's", "Prices": "7.50"},
  {"Items": "Hotcakes", "Stores": "McDonald's", "Prices": "4.80"},
  {"Items": "Sausage McMuffin with Egg", "Stores": "McDonald's", "Prices": "5.00"},
  {"Items": "Egg McMuffin", "Stores": "McDonald's", "Prices": "4.50"},
  {"Items": "French Fries (Large)", "Stores": "McDonald's", "Prices": "3.20"},
  {"Items": "Apple Pie", "Stores": "McDonald's", "Prices": "1.80"},
  {"Items": "McFlurry (Oreo)", "Stores": "McDonald's", "Prices": "3.80"},
  {"Items": "Sundae (Chocolate)", "Stores": "McDonald's", "Prices": "2.50"},
  {"Items": "Iced Milo (Large)", "Stores": "McDonald's", "Prices": "3.20"},
  {"Items": "Coke (Large)", "Stores": "McDonald's", "Prices": "2.80"},
  {"Items": "Coffee (Regular)", "Stores": "McDonald's", "Prices": "2.50"},
  {"Items": "Cheeseburger", "Stores": "McDonald's", "Prices": "3.50"},
  {"Items": "Grilled Chicken Burger", "Stores": "McDonald's", "Prices": "6.20"},
  {"Items": "McWings (2pc)", "Stores": "McDonald's", "Prices": "4.50"},
  {"Items": "Salad (Garden)", "Stores": "McDonald's", "Prices": "4.00"},
  {"Items": "Hashbrown", "Stores": "McDonald's", "Prices": "2.00"},
  {"Items": "McChicken Burger", "Stores": "McDonald's", "Prices": "5.20"},
  {"Items": "Chocolate Muffin", "Stores": "McDonald's", "Prices": "2.20"},
  {"Items": "Vanilla Cone", "Stores": "McDonald's", "Prices": "1.50"},
  {"Items": "Milo Dinosaur", "Stores": "McDonald's", "Prices": "3.50"},
  {"Items": "Tea (Hot)", "Stores": "McDonald's", "Prices": "2.00"},
  {"Items": "2pc Chicken Meal", "Stores": "KFC", "Prices": "6.90"},
  {"Items": "3pc Chicken Meal", "Stores": "KFC", "Prices": "8.90"},
  {"Items": "Zinger Burger", "Stores": "KFC", "Prices": "6.50"},
  {"Items": "Cheesy Zinger", "Stores": "KFC", "Prices": "7.20"},
  {"Items": "Twister", "Stores": "KFC", "Prices": "6.20"},
  {"Items": "Popcorn Chicken (Regular)", "Stores": "KFC", "Prices": "4.50"},
  {"Items": "Colonel's Burger", "Stores": "KFC", "Prices": "5.20"},
  {"Items": "Colonel's Delight Burger", "Stores": "KFC", "Prices": "5.50"},
  {"Items": "Egg Tart", "Stores": "KFC", "Prices": "1.80"},
  {"Items": "Coleslaw (Regular)", "Stores": "KFC", "Prices": "2.50"},
  {"Items": "French Fries (Regular)", "Stores": "KFC", "Prices": "3.00"},
  {"Items": "Mashed Potato", "Stores": "KFC", "Prices": "3.20"},
  {"Items": "Hot Wings (2pc)", "Stores": "KFC", "Prices": "3.90"},
  {"Items": "Porridge", "Stores": "KFC", "Prices": "4.80"},
  {"Items": "Rice Bowl", "Stores": "KFC", "Prices": "5.50"},
  {"Items": "Cheezy Fries", "Stores": "KFC", "Prices": "4.20"},
  {"Items": "Nuggets (6pc)", "Stores": "KFC", "Prices": "4.50"},
  {"Items": "Chocolate Sundae", "Stores": "KFC", "Prices": "2.80"},
  {"Items": "Iced Lemon Tea", "Stores": "KFC", "Prices": "2.20"},
  {"Items": "Pepsi (Regular)", "Stores": "KFC", "Prices": "2.00"},
  {"Items": "Original Glazed Doughnut", "Stores": "Krispy Kreme", "Prices": "2.80"},
  {"Items": "Chocolate Iced Glazed", "Stores": "Krispy Kreme", "Prices": "3.20"},
  {"Items": "Caramel Iced Glazed", "Stores": "Krispy Kreme", "Prices": "3.20"},
  {"Items": "Strawberry Iced Glazed", "Stores": "Krispy Kreme", "Prices": "3.20"},
  {"Items": "Original Glazed Dozen", "Stores": "Krispy Kreme", "Prices": "29.60"},
  {"Items": "Assorted Dozen", "Stores": "Krispy Kreme", "Prices": "32.00"},
  {"Items": "Nutty Choco Doughnut", "Stores": "Krispy Kreme", "Prices": "3.50"},
  {"Items": "Cookies & Kreme", "Stores": "Krispy Kreme", "Prices": "3.50"},
  {"Items": "Oreo Cheesecake", "Stores": "Krispy Kreme", "Prices": "3.80"},
  {"Items": "New York Cheesecake", "Stores": "Krispy Kreme", "Prices": "3.80"},
  {"Items": "Signature Latte", "Stores": "Krispy Kreme", "Prices": "5.50"},
  {"Items": "Iced Americano", "Stores": "Krispy Kreme", "Prices": "4.80"},
  {"Items": "Hot Chocolate", "Stores": "Krispy Kreme", "Prices": "4.50"},
  {"Items": "Iced Milo", "Stores": "Krispy Kreme", "Prices": "4.20"},
  {"Items": "Bottled Water", "Stores": "Krispy Kreme", "Prices": "2.50"},
  {"Items": "Glazed Doughnut Hole (10pc)", "Stores": "Krispy Kreme", "Prices": "6.50"},
  {"Items": "Chocolate Doughnut Hole (10pc)", "Stores": "Krispy Kreme", "Prices": "6.50"},
  {"Items": "Doughnut Box (4pc)", "Stores": "Krispy Kreme", "Prices": "12.00"},
  {"Items": "Doughnut Box (8pc)", "Stores": "Krispy Kreme", "Prices": "22.00"},
  {"Items": "Seasonal Special Doughnut", "Stores": "Krispy Kreme", "Prices": "4.00"},
  {"Items": "Malaysia Lady Finger 250g", "Stores": "Sheng Siong", "Prices": "1.20"},
  {"Items": "China Kai Lan 250g", "Stores": "Sheng Siong", "Prices": "1.45"},
  {"Items": "China Cai Xin 250g", "Stores": "Sheng Siong", "Prices": "1.45"},
  {"Items": "China Xiang Mai 300g", "Stores": "Sheng Siong", "Prices": "1.60"},
  {"Items": "Thailand Baby Corn 100g", "Stores": "Sheng Siong", "Prices": "1.38"},
  {"Items": "China Baby Qing Bai 250g", "Stores": "Sheng Siong", "Prices": "1.45"},
  {"Items": "Malaysia Cameron White Sweet Corn 1pc", "Stores": "Sheng Siong", "Prices": "2.50"},
  {"Items": "Malaysia Red Cherry Tomato 320g", "Stores": "Sheng Siong", "Prices": "2.85"},
  {"Items": "China Spinach 200g", "Stores": "Sheng Siong", "Prices": "1.75"},
  {"Items": "USA Russet Potato 1pc", "Stores": "Sheng Siong", "Prices": "0.70"},
  {"Items": "China Enoki Mushroom 200g", "Stores": "Sheng Siong", "Prices": "0.75"},
  {"Items": "El-Dina Home-Style Balacan Chilli 200g", "Stores": "Sheng Siong", "Prices": "3.81"},
  {"Items": "Marigold King Of Kings Full Cream Evaporated Milk 395g", "Stores": "Sheng Siong", "Prices": "2.15"},
  {"Items": "Hal Di Lao Tomato Hot Pot Sauce 120g", "Stores": "Sheng Siong", "Prices": "1.80"},
  {"Items": "Bakers' Choice Superfine Wheat Flour 1kg", "Stores": "Sheng Siong", "Prices": "1.85"},
  {"Items": "Maggi Satay Chicken Paste 100g", "Stores": "Sheng Siong", "Prices": "2.10"},
  {"Items": "Maggi Aromatic Spiced Chicken Paste 100g", "Stores": "Sheng Siong", "Prices": "2.10"},
  {"Items": "Maggi Lemongrass Chicken Paste 100g", "Stores": "Sheng Siong", "Prices": "2.10"},
  {"Items": "BAMBOE Spice Mix Rendang 35g", "Stores": "Sheng Siong", "Prices": "1.81"},
  {"Items": "BAMBOE Spice Mix Soto Ayam 40g", "Stores": "Sheng Siong", "Prices": "1.81"},
  {"Items": "Happy Family Chicken Rice Chilli Sauce 230g", "Stores": "Sheng Siong", "Prices": "2.40"},
  {"Items": "Maltsuri Oyster Sauce 510g", "Stores": "Sheng Siong", "Prices": "3.07"},
  {"Items": "Hal Di Lao Hot Pot Soup Base 110g", "Stores": "Sheng Siong", "Prices": "4.50"},
  {"Items": "Natural Organic Pasta Fusilli 500g", "Stores": "Sheng Siong", "Prices": "3.56"},
  {"Items": "Natural Organic Pasta Macaroni 500g", "Stores": "Sheng Siong", "Prices": "3.56"},
  {"Items": "Natural Organic Pasta Penne 500g", "Stores": "Sheng Siong", "Prices": "3.56"},
  {"Items": "Natural Organic Pasta Vermicelli 250g", "Stores": "Sheng Siong", "Prices": "1.80"},
  {"Items": "WHITE PIGEON Beeltoon Cap Merpati 400g", "Stores": "Sheng Siong", "Prices": "1.20"},
  {"Items": "Happy Family Flour Vermicelli 250g", "Stores": "Sheng Siong", "Prices": "1.35"},
  {"Items": "Happy Family Claypot Yee Mee 375g", "Stores": "Sheng Siong", "Prices": "2.05"},
  {"Items": "Happy Family Rotini Macaroni 400g", "Stores": "Sheng Siong", "Prices": "2.20"},
  {"Items": "Happy Family Spaghetti Pasta 400g", "Stores": "Sheng Siong", "Prices": "2.20"},
  {"Items": "Happy Family Elbow Macaroni 400g", "Stores": "Sheng Siong", "Prices": "2.20"},
  {"Items": "Natural Pasta Sauce - Tomato with Pepper 340g", "Stores": "Sheng Siong", "Prices": "6.20"},
  {"Items": "Natural Pasta Sauce - Tomato with Kale 340g", "Stores": "Sheng Siong", "Prices": "6.20"},
  {"Items": "Silver Pomfret 300-400g", "Stores": "Sheng Siong", "Prices": "3.99"},
  {"Items": "Frozen Pork Collar Steak 500g", "Stores": "Sheng Siong", "Prices": "6.45"},
  {"Items": "Le Bao Frozen Pork Soft Bone 400g", "Stores": "Sheng Siong", "Prices": "5.50"},
  {"Items": "Le Bao Frozen Pork Collar Slices 300g", "Stores": "Sheng Siong", "Prices": "5.50"},
  {"Items": "Le Bao Frozen Steamboat Pork Belly Slices 300g", "Stores": "Sheng Siong", "Prices": "5.80"},
  {"Items": "Le Bao Frozen Steamboat Pork Collar Slices 500g", "Stores": "Sheng Siong", "Prices": "8.50"},
  {"Items": "Le Bao Frozen Minced Meat 500g", "Stores": "Sheng Siong", "Prices": "4.40"},
  {"Items": "Le Bao Frozen Packet Chicken Drumstick 450g", "Stores": "Sheng Siong", "Prices": "5.50"},
  {"Items": "Jean Fresh Packet Chicken Breast 200g", "Stores": "Sheng Siong", "Prices": "2.78"},
  {"Items": "Jean Fresh Packet Chicken Inner Fillet 500g", "Stores": "Sheng Siong", "Prices": "2.78"},
  {"Items": "MD Plain Breaded Chicken 500g", "Stores": "Sheng Siong", "Prices": "5.48"},
  {"Items": "MD Southern Fried Chicken 500g", "Stores": "Sheng Siong", "Prices": "5.48"}
]


def extract_json_block(text):
    try:
        match = re.search(r'{[\s\S]*}', text)
        if match:
            return match.group()
        return None
    except:
        return None


def format_database_hint():
    if not product_database:
        return "【注意】数据库为空，目前没有可用商品数据，生成结果将被限制为空。"

    entries = []
    for product in product_database:
        entries.append(f"{product['Items']} ({product['Stores']}, {product['Prices']} SGD)")
    return "以下是可用商品数据，请**只从这些商品中选择，不可自行编造商品**：\n" + "\n".join(entries)

def build_prompt(data, feedback=None):
    event_type = data.get("type", "")
    attendees = data.get("attendees", "")
    budgets = data.get("budgets", "")
    dietary = data.get("dietary", "")
    cookingInvolved = data.get("cookingInvolved", False)
    store = data.get("store", [])

    database_hint = format_database_hint()

    if feedback:
        prompt = f"""
你是一个购物助手，请根据以下信息生成购物清单，并考虑用户反馈进一步优化：

特定场合：{event_type}
人数：{attendees}
预算（新币）：{budgets}
饮食偏好：{dietary}
是否下厨：{"是" if cookingInvolved else "否"}
偏好的商店：{", ".join(store)}
用户反馈：{feedback}

请严格只输出以下模板的对象，不要有任何额外说明，也不要以json作为开头：
{{
  "shoppingList": [
    {{
      "Items": "商品名",
      "Stores": "商店",
      "Quantity": 数量,
      "Prices": 单价（字符串，带单位）,
      "Total": 总价（字符串，带货币符号）
    }},
    ...
  ],
  "cookingTutorial": "Step1\\nStep2\\nStep3..." 或 null（取决于是否下厨）
}}

{database_hint}
"""
    else:
        prompt = f"""
你是一个购物助手，请根据以下信息生成购物清单：

特定场合：{event_type}
人数：{attendees}
预算（新币）：{budgets}
饮食偏好：{dietary}
是否下厨：{"是" if cookingInvolved else "否"}
偏好的商店：{", ".join(store)}

请严格只输出以下模板的对象，不要有任何额外说明，也不要以json作为开头：
{{
  "shoppingList": [
    {{
      "Items": "商品名",
      "Stores": "商店",
      "Quantity": 数量,
      "Prices": 单价（字符串，带单位）,
      "Total": 总价（字符串，带货币符号）
    }},
    ...
  ],
  "cookingTutorial": "Step1\\nStep2\\nStep3..." 或 null（取决于是否下厨）
}}

{database_hint}
"""
    return prompt

@app.route("/generate", methods=["POST"])
def generate():
    global last_request
    try:
        data = request.get_json()
        feedback = data.get("feedback")

        if feedback:
            if last_request:
                prompt = build_prompt(last_request, feedback)
            else:
                return jsonify({"error": "初始请求为空，无法基于 feedback 生成"}), 400
        else:
            last_request = data
            prompt = build_prompt(data)

        response = client.chat.completions.create(
            model="gpt-4-turbo",
            messages=[
                {"role": "system", "content": "你是一个精通新加坡超市和外卖市场的购物助手"},
                {"role": "user", "content": prompt}
            ],
            temperature=0.5,
            max_tokens=1000
        )

        response_result = response.choices[0].message.content
        print("GPT原始输出：", response_result)

        json_string = extract_json_block(response_result)

        if json_string is None:
            return jsonify({"error": "输出格式错误，未能识别为有效JSON"}), 500

        parsed_output = json.loads(json_string)

        if "shoppingList" not in parsed_output or "cookingTutorial" not in parsed_output:
            raise ValueError("输出缺少必须字段")

        return jsonify(parsed_output)

    except Exception as e:
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500

application = app

@app.route('/')
def home():
    return jsonify({
        "status": "API is running",
        "available_endpoint": {
            "POST /generate": "Generate shopping lists"
        }
    })

if __name__ == "__main__":
    app.run(debug=True)
