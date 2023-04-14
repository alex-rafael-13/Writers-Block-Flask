import openai
import os



openai.api_key = API_KEY

response = openai.ChatCompletion.create(
    model='gpt-3.5-turbo',
    messages=[{"role": "system", "content": "You are an English teacher"},
            {"role": "user", "content": "what is your job?"}]

)

print(response['choices'][0]['message'])
