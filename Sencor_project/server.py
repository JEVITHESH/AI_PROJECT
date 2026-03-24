from flask import Flask, request, jsonify, render_template
from groq import Groq
import csv
import os
from datetime import datetime

app = Flask(__name__)
client = Groq(api_key=os.environ.get("GROQ_API_KEY", "your_api_key_here"))

latest_data = {}
latest_story = "சென்சார் தரவுக்காக காத்திருக்கிறேன்..."
latest_coaching = ""
chat_history = []

CSV_FILE = "health_log.csv"

if not os.path.exists(CSV_FILE):
    with open(CSV_FILE, 'w', newline='') as f:
        writer = csv.writer(f)
        writer.writerow(["timestamp", "temperature", "humidity",
                         "air_quality", "sleep_score", "productivity_score"])


def get_storyteller_narration(temp, hum, air):
    prompt = f"""
நீ ஒரு வேடிக்கையான தமிழ் நண்பன்.
தற்போதைய அறை நிலைமை:
- வெப்பநிலை: {temp}°C
- ஈரப்பதம்: {hum}%
- காற்று தரம்: {air} / 1023

உதாரணம்:
- "மச்சி இந்த அறையில இருக்கவே முடியலை, சூடு தாங்கலை 😭 யாராவது ஒரு fan போடுங்க!"
- "காற்று நல்லா இருக்கு மச்சி, ஆனா வெப்பம் கொஞ்சம் அதிகமா இருக்கு!"
- "அறை சூப்பரா இருக்கு மச்சி, இப்படியே வெச்சுக்கோ 😄"

இப்போ தமிழில் மட்டும் 2-3 வாக்கியங்கள் சொல்லு!
"""
    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        max_tokens=200,
        messages=[
            {
                "role": "system",
                "content": "நீ ஒரு தமிழ் AI நண்பன். நீ எப்பவும் தமிழில் மட்டும் பதில் சொல்வாய். ஆங்கிலம் வார்த்தைகள் உபயோகிக்காதே. முழுக்க முழுக்க தமிழில் மட்டும் பேசு."
            },
            {
                "role": "user",
                "content": prompt
            }
        ]
    )
    return response.choices[0].message.content


def chat_with_room(user_message, temp, hum, air):
    global chat_history

    system_prompt = f"""
நீ ஒரு வேடிக்கையான தமிழ் AI நண்பன். அறையின் உள்ளே வாழுகிறாய்.
நீ எப்பவும் தமிழில் மட்டும் பேசுவாய். ஆங்கிலம் வார்த்தைகள் உபயோகிக்காதே.

தற்போதைய அறை நிலைமை:
- வெப்பநிலை: {temp}°C
- ஈரப்பதம்: {hum}%
- காற்று தரம்: {air} / 1023

விதிகள்:
- எப்பவும் தமிழில் மட்டும் பதில் சொல்லு
- சாதாரண பேச்சு வழக்கில் பேசு — மச்சி, டா, நண்பா
- நகைச்சுவையாகவும் உதவியாகவும் இரு
- 2-4 வாக்கியங்கள் மட்டும்
- அறை நிலைமையை reference பண்ணு
"""

    chat_history.append({"role": "user", "content": user_message})

    if len(chat_history) > 10:
        chat_history = chat_history[-10:]

    messages = [
        {
            "role": "system",
            "content": system_prompt
        }
    ] + chat_history

    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        max_tokens=200,
        messages=messages
    )

    reply = response.choices[0].message.content
    chat_history.append({"role": "assistant", "content": reply})
    return reply


def get_health_coaching(data_rows):
    table = "\n".join([",".join(map(str, r)) for r in data_rows[-50:]])
    prompt = f"""
நீ ஒரு நகைச்சுவையான தமிழ் health coach.
நீ எப்பவும் தமிழில் மட்டும் பேசுவாய். ஆங்கிலம் வார்த்தைகள் உபயோகிக்காதே.

அறை சூழல் மற்றும் health data:
timestamp, temperature, humidity, air_quality, sleep_score, productivity_score
{table}

இந்த data-வை பார்த்து தூக்கம் மற்றும் productivity மேம்படுத்த
3 குறிப்புகள் தமிழில் சொல்லு. நண்பனிடம் பேசுவது போல் சொல்லு.
"""
    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        max_tokens=400,
        messages=[
            {
                "role": "system",
                "content": "நீ ஒரு தமிழ் health coach. எப்பவும் தமிழில் மட்டும் பதில் சொல்வாய். ஆங்கிலம் வார்த்தைகள் உபயோகிக்காதே."
            },
            {
                "role": "user",
                "content": prompt
            }
        ]
    )
    return response.choices[0].message.content


@app.route('/data', methods=['POST'])
def receive_data():
    global latest_data, latest_story
    try:
        data = request.get_json()
        latest_data = data
        latest_data['timestamp'] = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

        latest_story = get_storyteller_narration(
            data['temperature'], data['humidity'], data['air_quality']
        )

        with open(CSV_FILE, 'a', newline='') as f:
            writer = csv.writer(f)
            writer.writerow([
                latest_data['timestamp'],
                data['temperature'], data['humidity'], data['air_quality'],
                "", ""
            ])

        print(f"[{latest_data['timestamp']}] தரவு வந்தது!")
        print(f"Temp: {data['temperature']}°C | Hum: {data['humidity']}% | Air: {data['air_quality']}")
        print(f"AI Story: {latest_story[:80]}...")
        return jsonify({"status": "ok"})
    except Exception as e:
        print(f"Data error: {e}")
        return jsonify({"status": "error", "message": str(e)}), 500


@app.route('/chat', methods=['POST'])
def chat():
    try:
        body = request.get_json()
        user_message = body.get('message', '')

        if not user_message:
            return jsonify({"reply": "என்னன்னு சொல்லு மச்சி 😄"})

        temp = latest_data.get('temperature', '32')
        hum  = latest_data.get('humidity', '45')
        air  = latest_data.get('air_quality', '116')

        reply = chat_with_room(user_message, temp, hum, air)
        print(f"Chat → User: {user_message}")
        print(f"Chat → AI: {reply}")
        return jsonify({"reply": reply})

    except Exception as e:
        print(f"Chat error: {e}")
        return jsonify({"reply": f"என்னமோ error வந்துச்சு மச்சி 😅 {str(e)}"})


@app.route('/log_health', methods=['POST'])
def log_health():
    try:
        body = request.get_json()
        sleep = body.get('sleep', '')
        prod  = body.get('productivity', '')
        rows = []
        with open(CSV_FILE, 'r') as f:
            rows = list(csv.reader(f))
        if len(rows) > 1:
            rows[-1][4] = sleep
            rows[-1][5] = prod
        with open(CSV_FILE, 'w', newline='') as f:
            csv.writer(f).writerows(rows)
        return jsonify({"status": "health logged"})
    except Exception as e:
        print(f"Health log error: {e}")
        return jsonify({"status": "error"}), 500


@app.route('/coaching')
def coaching():
    global latest_coaching
    try:
        rows = []
        with open(CSV_FILE, 'r') as f:
            rows = list(csv.reader(f))[1:]
        if len(rows) < 2:
            latest_coaching = "இன்னும் கொஞ்சம் நேரம் sensor ஓட விடு மச்சி, data இல்லை இன்னும் 😄"
        else:
            latest_coaching = get_health_coaching(rows)
        return jsonify({"coaching": latest_coaching})
    except Exception as e:
        print(f"Coaching error: {e}")
        return jsonify({"coaching": "error வந்துச்சு மச்சி, மறுபடியும் try பண்ணு 😅"}), 500


@app.route('/')
def dashboard():
    return render_template('dashboard.html')


@app.route('/latest')
def latest():
    return jsonify({
        "data": latest_data,
        "story": latest_story,
        "coaching": latest_coaching
    })


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)