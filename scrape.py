from bs4 import BeautifulSoup
import requests
import re
import json


# Change name of prof and url
profName = "Burton Ma"
page_link = "https://www.ratemyprofessors.com/ShowRatings.jsp?tid=1471038&showMyProfs=true"


def getRateMyProf(url):
    page_response = requests.get(url, timeout=5)
    page_content = BeautifulSoup(page_response.content, "html.parser")
    textContent = []

    pageContent = page_content.find_all('tr')
    for i in pageContent:
        tbodies = i.text
        if "Level of Difficulty" in tbodies:
            textContent.append(tbodies)

    data = {}

    # Parse the comments from the html into a json
    for i in range(1, len(textContent)):
        textContent[i] = re.sub("[\\n]|[\\t]", " ", textContent[i])
        if "Level of Difficulty " in textContent[i]:
            data[i] = {}
            textContent[i] = textContent[i].split("Level of Difficulty ")[1]
        if "For Credit: " in textContent[i]:
            data[i]["name"] = textContent[i].split("For Credit: ")[
                0].strip(' ')
            textContent[i] = textContent[i].split("For Credit: ")[1]
        if "                            " in textContent[i]:
            data[i]["answer"] = textContent[i].split(
                "                  ")[1].strip(' ')

    # Get keywords from the comments to create the questions.

    # Map of keyword to theme.
    keywords = {
        "nice": "personality",
        "best": "personality",
        "worst": "personality",
        "great": "personality",
        "good": "personality",
        "GPA": "grade",
        "grade": "grade",
        "test": "grade",
        "pass": "grade",
        "lecture":  "lecture",
        "class": "lecture",
        "skip": "lecture",
        "topic": "material",
        "question": "material",
        "lab": "grade",
        "study": "study",
        "assignment": "study",
        "homeword": "study",
    }

    # count the keywords and maps them to the them.
    for key in list(data.keys()):
        comment = data[key]
        c = comment["answer"].lower()
        data[key]["keywords"] = []
        keywordsCount = {i: 0 for i in set(keywords.values())}
        for keyword in list(keywords.keys()):
            catergoryKeyword = keywords[keyword]
            if keyword in c and catergoryKeyword not in data[key]["keywords"]:
                keywordsCount[catergoryKeyword] = 1
                data[key]["keywords"].append(catergoryKeyword)
            elif keyword in c and keywordsCount[catergoryKeyword] < 3:
                keywordsCount[catergoryKeyword] += 1
        temp = {i: keywordsCount[i] for i in data[key]["keywords"]}
        data[key]["keywords"] = temp

    def createSentence(keyword, frequency, className):
        sentences = {
            "personality": {
                1: f"Is {profName} a nice professor for {className}? ",
                2: f"Will I enjoy taking {profName}'s class for {className} and what kind of prof are they? ",
                3: f"Is {profName} the best professor I can take for {className} or is there someone better and what are most people's opinions about their class? "
            },
            "grade": {
                1: f"Is {profName} giving good grades for {className}? ",
                2: f"Should I take {profName}'s {className} class if I care about my grades and GPA? ",
                3: f"How is {profName}'s grading if I want to get a high grade in {className}? Are his test very tricky and can I expect fair labs? ",
            },
            "material": {
                1: f"Does {profName} explain {className} well? ",
                2: f"Should I take the {className} with {profName} to understand the topics and material? ",
                3: f"How are the topics of {className} explained by {profName}? Do they go into a lot of details about the material? Will I understand them easily? ",
            },
            "lecture": {
                1: f"Should I attend {className} lectures with {profName}? ",
                2: f"Is attending {className} lecture from {profName} worth it to pass the class? ",
                3: f"What are the advantages of going to {className} lecture? Is it mandatory to attend the class? Can I skip the lectures? ",
            },
            "study": {
                1: f"Will I need to study a lot for {className} with {profName}? ",
                2: f"How much time is spent studying for assignments and homework for {className} with {profName}? ",
                3: f"Should I expect to be studying many hours for each test if I take {className} with {profName}? Is the homework a big part of the course? ",
            }
        }
        return sentences[keyword][frequency]

    questions = []

    # format a question based on the keywords and their frequencies.
    for key in list(data.keys()):
        keywords = data[key]["keywords"]
        if len(keywords) == 0:
            continue
        question = ""
        answer = data[key]["answer"]
        for keyword in keywords:
            temp = createSentence(
                keyword, keywords[keyword], data[key]["name"])
            question += temp
        toPost = {
            "type": "faq",
            "faq": {
                "question": question,
                "answer": answer,
            },
            "externalUrl": "http://test.co/info/{{$guid}}"
        }
        questions.append(toPost)
    return questions


questions = []
for i in range(1, 2):
    url = page_link
    questions.extend(getRateMyProf(url))

fileName = "".join(profName.split(" "))
with open(f"{fileName}.json", "w") as file:
    file.write(json.dumps(questions, indent=4))
