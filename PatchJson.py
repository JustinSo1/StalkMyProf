import requests
import os
import json

files = os.listdir("Professors")

categorieIds = {
    "SuprakashDatta": "8eecedda-22fd-42e8-983a-36b6928d62e8",
    "JeffEdmonds": "704e9418-0510-4700-886b-15dd9ec6c4a3",
    "HamzehRoumani": "38a6c313-59de-4ede-963d-3b61ba3014cb",
    "PeterCribb": "6c83f49f-5cf0-476a-8a1b-d568627b140a",
    "BurtonMa": "9d68a34c-de8d-4883-8ff9-faa93b06c276",
}

for file in files:
    fileName = file.split(".")[0]
    categorieId = categorieIds[fileName]

    with open("Professors/" + file, "r") as data:
        questions = json.loads(data.read())
        for ques in questions:
            ques["categories"] = [{"id": categorieId}]
            payload = json.dumps(ques, indent=2)
            print(payload)
            url = "https://api.genesysappliedresearch.com/v2/knowledge/knowledgebases/af4db8a6-518c-475d-9b43-ae3e8821a339/languages/en-US/documents/"
            headers = {
                'Content-Type': "application/json",
                'organizationid': "9bd12268-2d0c-4583-9623-d4ae3247370f",
                'token': "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJvcmdJZCI6IjliZDEyMjY4LTJkMGMtNDU4My05NjIzLWQ0YWUzMjQ3MzcwZiIsImV4cCI6MTU3MTU1NDM1OSwiaWF0IjoxNTcxNTUwNzU5fQ.t0Fxs6eM2iQaVF7_IgLtfrAou0LGQ5tGmRAbWgsf8ko",
                'User-Agent': "PostmanRuntime/7.18.0",
                'Accept': "*/*",
                'Cache-Control': "no-cache",
                'Postman-Token': "00819878-bee6-4b41-b072-c4662a1d5048,2194be47-1be0-4945-9165-886be7d629d8",
                'Host': "api.genesysappliedresearch.com",
                'Accept-Encoding': "gzip, deflate",
                'Content-Length': str(len(payload)),
                'Connection': "keep-alive",
                'cache-control': "no-cache"
            }

            response = requests.request(
                "POST", url, data=payload, headers=headers)

            print(response.text)


# url = "https://api.genesysappliedresearch.com/v2/knowledge/knowledgebases/af4db8a6-518c-475d-9b43-ae3e8821a339/languages/en-US/documents/"

# payload = "{\r\n  \"type\": \"faq\",\r\n  \"faq\": {\r\n    \"question\": \"Should I attend EECS300lectures with Peter ?\",\r\n    \"answer\": \"Essays are hard. Lectures are skeleton-like and expect too much participation from students. Lecture slides are useless. Massive curving though.\"\r\n  },\r\n  \"categories\": [\r\n    {\r\n      \"id\": \"6c83f49f-5cf0-476a-8a1b-d568627b140a\"\r\n    }\r\n  ]\r\n  \"externalUrl\": \"http://test.co/info/e8b7662f-0ad3-4da5-b714-5876053f6c6e\"\r\n}"
# headers = {
#     'Content-Type': "application/json",
#     'organizationid': "9bd12268-2d0c-4583-9623-d4ae3247370f",
#     'token': "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJvcmdJZCI6IjliZDEyMjY4LTJkMGMtNDU4My05NjIzLWQ0YWUzMjQ3MzcwZiIsImV4cCI6MTU3MTU1NDM1OSwiaWF0IjoxNTcxNTUwNzU5fQ.t0Fxs6eM2iQaVF7_IgLtfrAou0LGQ5tGmRAbWgsf8ko",
#     'User-Agent': "PostmanRuntime/7.18.0",
#     'Accept': "*/*",
#     'Cache-Control': "no-cache",
#     'Postman-Token': "00819878-bee6-4b41-b072-c4662a1d5048,2194be47-1be0-4945-9165-886be7d629d8",
#     'Host': "api.genesysappliedresearch.com",
#     'Accept-Encoding': "gzip, deflate",
#     'Content-Length': "437",
#     'Connection': "keep-alive",
#     'cache-control': "no-cache"
# }

# response = requests.request("POST", url, data=payload, headers=headers)

# print(response.text)
