from parse_sentence import parse
import json
import random
import sys

# Mapping for skills (temporary for crude AI)
SKILL_MAPPING = {
        "Front End Developer" : [
            "React",
            "JS",
            "HTML",
            "JavaScript",
            "Graphic Design",
            "Adobe Illustrator",
            "UI/UX",
            "UI/UX Design",
            "Sketch",
            "Wireframing",
            "Photoshop",
            "Logo Design",
            "Angular",
            "TypeScript",
            "CSS",
            "Web Design",
            "HTML/CSS"
            ],

        "Back End Developer" : [
            "Python",
            "SQL",
            "Django",
            "PHP",
            "MySQL",
            "Laravel",
            "Node.js",
            "Express",
            "MongoDB"
            ],

        "Systems Programmer" : [

            ],

        "Devops Engineer" : [

            ],

        "Game Developer" : [

            ],

        "Mobile App Developer" : [
            "Java",
            "Spring Boot",
            ],

        "Marketing Expert" : [
            "Marketing",
            "SEO",
            "Content Strategy",
            "Copywriting",
            "Content Marketing",
            "Blogging"
            ],

        "Graphics Designer" : [
            "Graphic Design",
            "Photoshop",
            "Logo Design",
            "Illustration",
            "Digital Media",
            "Concept Art",
            "Painting",
            "Video Editing",
            "Adobe Premiere",
            "Motion Graphics"
            ],

        "Data Analyst" : [
            "Data Analysis",
            "Excel",
            "Statistics"
            ]
        }

def get_unique(data:list):
    """ Get unique data from list """

    unique = []
    for item in data:
        if item not in unique:
            unique.append(item)

    return unique

def get_filtered_users(user_list, job_list):
    """ Get users filtered based on broad jobs """

    filtered_data = {}

    # Gettings skill list
    skill_list = []
    for user in user_list:
        skill_list += get_unique(user["skills"])

    for job in job_list:
        skills_for_job = job_list[job]
        users_applicable = []

        for user in user_list:
            email = user["email"]

            for skill in user["skills"]:
                if skill in skills_for_job and email not in users_applicable:
                    users_applicable.append(email)

        filtered_data[job] = users_applicable

    return filtered_data

def get_employee(task):
    """ Returns employee corresponding to task """

    # Loading data
    with open("../src/constant/constant.json", "r") as f:
        data = json.load(f)

    users = data["users"]
    filtered_users = get_filtered_users(users, SKILL_MAPPING)

    # Parsing task
    job = parse(task)

    # Getting employee ( free and priority order not implemented )
    employees_for_job = filtered_users[job]

    return random.choices(employees_for_job)[0]

if __name__ == "__main__":
    task = sys.argv[1]
    print(get_employee(task))
