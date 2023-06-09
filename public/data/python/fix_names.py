# replace all logos and avatars' names - remove trailing spaces, replace spaces with underscores

import json
import os

images_dir = os.listdir('public/data/images')
json_dir = os.listdir('public/data/data')

# image name format: something else (doesnt end with .jpg)

# for image in images_dir:
#     new_name = image
#     # remove trailing spaces one or more
#     if image.endswith('  '):
#         os.rename('public/data/images/' + new_name, 'public/data/images/' + image[:-2])
#         new_name = image[:-2]
#     if image.endswith(' ') or image.endswith('_'):
#         os.rename('public/data/images/' + image, 'public/data/images/' + image[:-1])
#         new_name = image[:-1]
#     # replace spaces with underscores
#     if ' ' in image:
#         os.rename('public/data/images/' + new_name, 'public/data/images/' + image.replace(' ', '_'))

# do the same but in the json file:
# ["logo"] and ["members"][i]["avatar"]
# for jsony in json_dir:
#     file = open('public/data/data/' + jsony, 'r', encoding='utf-8')

#     data = json.load(file)
    
#     data["logo"] = data["logo"].replace('/public/data/images/', '/data/images/')
#     for member in data["members"]:
#         member["avatar"] = member["avatar"].replace('/public/data/images/', '/data/images/')

    # if data["logo"].endswith('  '):
    #     data["logo"] = data["logo"][:-2]
    # if data["logo"].endswith(' ') or data["logo"].endswith('_'):
    #     data["logo"] = data["logo"][:-1]

    # if ' ' in data["logo"]:
    #     data["logo"] = data["logo"].replace(' ', '_')
    
    # for member in data["members"]:
    #     if member["avatar"].endswith('  '):
    #         member["avatar"] = member["avatar"][:-2]
    #     if member["avatar"].endswith(' ') or member["avatar"].endswith('_'):
    #         member["avatar"] = member["avatar"][:-1]
    #     if ' ' in member["avatar"]:
    #         member["avatar"] = member["avatar"].replace(' ', '_')

    # print(data["logo"])
    # for member in data["members"]:
    #     print(member["avatar"])

    # # input("Press Enter to continue...")
    # file.close()
    # file2 = open('public/data/data/' + jsony, 'w', encoding='utf-8')
    # file2.write(json.dumps(data, indent=4, ensure_ascii=False))
    # file2.close()

file_teams = open('public/data/teams.json', 'r', encoding='utf-8')
data = json.load(file_teams)
# for team in data['data']:
#     if team["logo"].endswith('  '):
#         team["logo"] = team["logo"][:-2]
#     if team["logo"].endswith(' ') or team["logo"].endswith('_'):
#         team["logo"] = team["logo"][:-1]

#     if ' ' in team["logo"]:
#         team["logo"] = team["logo"].replace(' ', '_')

#     for member in team["members"]:
#         if member["profile_picture"].endswith('  '):
#             member["profile_picture"] = member["profile_picture"][:-2]
#         if member["profile_picture"].endswith(' ') or member["profile_picture"].endswith('_'):
#             member["profile_picture"] = member["profile_picture"][:-1]
#         if ' ' in member["profile_picture"]:
#             member["profile_picture"] = member["profile_picture"].replace(' ', '_')

# file_teams.close()
# file_teams2 = open('public/data/teams.json', 'w', encoding='utf-8')
# file_teams2.write(json.dumps(data, indent=4, ensure_ascii=False))
# file_teams2.close()

for team in data['data']:
    # replace the name of the file
    # current_name = team["name"].json
    # new_name = team["id"].json
    print(team["name"])
    if os.path.exists('public/data/data/' + team["name"] + '.json'):
        os.rename('public/data/data/' + team["name"] + '.json', 'public/data/data/' + str(team["id"]) + '.json')