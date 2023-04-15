import openai
import os

from flask import Blueprint, request, jsonify
from flask_login import login_required


chatgpt_routes = Blueprint('chatgpt', __name__)


openai.api_key = os.environ.get('GPT_KEY')






@chatgpt_routes.route('', methods=['POST'])
@login_required
def send_message():

    print(openai.api_key,'-------===++++++')

    data = request.get_json()

    print(data,'====================')

    response = openai.ChatCompletion.create(
        model='gpt-3.5-turbo',
        messages=data

    )


    return jsonify(response['choices'][0]['message'])
