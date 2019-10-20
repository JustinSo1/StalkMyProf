import json
with open("Professors/profs.json", "r") as f:
    seen = set()
    data = json.load(f)
    d = 0
    while d < len(data):
        if data[d]["faq"]["question"] not in seen and len(data[d]["faq"]["answer"]) > 15:
            seen.add(data[d]["faq"]["question"])
        else:
            print(json.dumps(data[d], indent=2))
            # del data[d]
        d += 1

    # with open("Professors/profs.json", "w") as t:
    #     t.write(json.dumps(data, indent=2))
