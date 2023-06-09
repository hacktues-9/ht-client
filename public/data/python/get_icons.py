""" array of this
{
    "id": 87,
    "name": "StanaGreshka",
    "logo": "https://api.hacktues.bg/api/image/StanaGreshka",
    "members": [{
      "id": 134,
      "name": "Иван Станчев",
      "profile_picture": "https://api.hacktues.bg/api/image/Иван Станчев",
      "role": "CAPTAIN",
      "class": "12 А",
      "email": "ivan.r.stanchev.2018@elsys-bg.org",
      "discord": "IvanStanchev#6961",
      "github": "IvanStanchev"
    }, {
      "id": 226,
      "name": "Златина Лилова",
      "profile_picture": "https://api.hacktues.bg/api/image/Златина Лилова",
      "role": "MEMBER",
      "class": "12 А",
      "email": "zlati.lilova@gmail.com",
      "discord": "Fennecing fox#0828",
      "github": "zlatililova"
    }, {
      "id": 402,
      "name": "Боряна Стефанова",
      "profile_picture": "https://api.hacktues.bg/api/image/Боряна Стефанова",
      "role": "MEMBER",
      "class": "12 А",
      "email": "boryana.ya.stefanova.2018@elsys-bg.org",
      "discord": "boryana#5084",
      "github": ""
    }, {
      "id": 401,
      "name": "Елена Върбанова",
      "profile_picture": "https://api.hacktues.bg/api/image/Елена Върбанова",
      "role": "MEMBER",
      "class": "12 А",
      "email": "elena.s.varbanova.2018@elsys-bg.org",
      "discord": "Eli_varbanova#8546",
      "github": ""
    }],
    "project": {
      "id": 66,
      "name": "Алармена система за откриване и гасене на пожар",
      "description": "Засичане на пожар чрез сензор за качество на въздуха, информиране чрез звуков сигнал и SMS, отваряне на пожарен кран. Измерените от сензора данни се записват в блокчейн, за да улесняване на разследването на причините за инцидента. ",
      "logo": "",
      "github": "",
      "website": "",
      "technologies": null,
      "photos": null
    },
    "technologies": ["Web Development", "Swift", "SQL", "Smart contracts", "Solidity", "REST", "ReactJS", "Python", "OOPs", "NodeJS", "MySQL", "Mobile Development", "Linux", "Kotlin", "JavaScript", "IoT", "Java", "HTML", "2D Art", "Arduino", "Blockchain", "C", "CSS", "Django", "Embedded", "Flutter", "Firebase", "ESP32 / ESP8266", "NoSQL", "PHP", "Bootstrap", "Git"],
    "isVerified": false
  },

"""

# download logos and avatars
# members->profile_picture goes to /avatars
# logo goes to /logos

import io
import json
import os
import shutil
from urllib.request import Request, urlopen

import requests

# get data
url = "https://api.hacktues.bg/api/team/get"
response = requests.get(url)
data = response.json()

# # create folders
# if not os.path.exists("avatars"):
#     os.mkdir("avatars")
# if not os.path.exists("logos"):
#     os.mkdir("logos")

# print("Downloading avatars and logos")

# # download avatars
# for team in data['data']:
#     for member in team["members"]:
#         if member["profile_picture"]:
#             url = member["profile_picture"]
#             response = requests.get(url)
#             print(f"Downloading {member['name']} avatar")
#             with open("avatars/" + member["name"] + ".jpg", "wb") as f:
#                 f.write(response.content)
#     # downlaod logo
#     if team['logo']:
#         url = team["logo"]
#         response = requests.get(url)
#         print(f"Downloading {team['name']} logo")
#         with open("logos/" + team["name"] + ".jpg", "wb") as f:
#             f.write(response.content)

url2 = 'https://api.hacktues.bg/api/team/get/'

if not os.path.exists('data'):
    os.mkdir('data')

for team in data['data']:
    if team['id']:
        # ensure utf-8 encoding from response
        print(url2 + str(team['id']))
        request_site = Request(url2 + str(team['id']), headers={'User-Agent': 'Mozilla/5.0'})
        res = urlopen(request_site)
        response = json.loads(res.read().decode('utf-8'))
        # print(response['data'])
        # input()

        if response['data']:
            print('Writing ' + team['name'] + '.json')
            # create file using io
            with open('public/data/data/' + team['name'] + '.json', 'w+', encoding='utf-8') as f:
                f.write(json.dumps(response['data'], ensure_ascii=False, indent=4))
            

# convert all images in logos and avatars to webp

# def convert_to_webp(folder, new_folder):
#     for file in os.listdir(folder):
#         if file.endswith('.jpg'):
#             os.system(f'cwebp -q 80 "{folder}/{file}" -o "{new_folder}/{file[:-4]}.webp"')
#             print(f'Converted {file} to webp')



# print("Converting to webp")
# convert_to_webp('logos', 'new_logos')
# convert_to_webp('avatars', 'new_avatar')