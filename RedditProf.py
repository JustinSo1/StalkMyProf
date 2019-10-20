import time
import json
import praw
from praw.models import MoreComments


def authenticate():
    return praw.Reddit('prof_bot', user_agent="find_prof bot v01")


# Time delay required by Reddit
time_delay = 2
# Bot logs in to reddit
reddit_bot = authenticate()
subreddit_names = "yorku"
profs_name = "Hamzeh Roumani"
profs_name = profs_name.lower()
prof_permutations = profs_name.split()
prof_permutations.append(profs_name)

prof_post_and_comment = {}
# Counter to iterate through all prof permutations
i = 0
# Searches through all of subreddit's threads for keyword
for submission in reddit_bot.subreddit(subreddit_names).search(prof_permutations[i]):
    title = submission.title.lower()
    prof_post_and_comment[title] = []
    # Sorts all submission's comments by best
    submission.comment_sort = 'best'
    # Takes 5 top comments
    submission.comment_limit = 1
    # Appends post titles and top comment bodies to json data
    for top_level_comment in submission.comments:
        if isinstance(top_level_comment, MoreComments):
            continue
        prof_post_and_comment[title].append(top_level_comment.body)
        time.sleep(time_delay)

        json_data = json.dumps(prof_post_and_comment, sort_keys=True, indent=4)
    i += 1
with open("juicy.json", "w") as file:
    file.write(json_data)
