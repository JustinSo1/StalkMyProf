import requests

page_link = "https://www.ratemyprofessors.com/ShowRatings.jsp?tid=14682&showMyProfs=true"
page_response = requests.get(page_link, timeout=5)
with open("hamzeh_roumani.html", "w") as file:
    file.write(page_response.text)
