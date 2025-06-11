import requests
from bs4 import BeautifulSoup
import json

moves = {} # JSON de tipo diccionario

url = requests.get('https://bulbapedia.bulbagarden.net/wiki/User:TehPerson/List_of_moves_(Generation_IV)')
soup = BeautifulSoup(url.text, 'html.parser')
table = soup.find("table", attrs = {"border": "1"})
tableBody = table.find("tbody")
rows = tableBody.find_all("tr")
for row in rows:
    cells = row.find_all("td")
    if len(cells) > 0: # por algún motivo, la primera celda está vacía
        moveName = cells[1].text.strip() # strip elimina los espacios vacíos de cells[1].text
        if moveName == "Smokescreen": # en la página hay un error; Smokescreen se usa a partir de sexta generación
            moveName = "SmokeScreen"
        elif moveName == "Curse":
            moveType = "Unknown"
        else:
            moveType = cells[2].text.strip()
        moves[moveName] = moveType 

with open("src/moveType.json", "w", encoding="utf-8") as f: # "w" - write; "r" - read; "a" - append; "x" - create
    json.dump(moves, f, indent = 2, ensure_ascii = False) # indent = 2 hace que el JSON sea más legible; ensure_ascii = False hace que los caracteres no ASCII no den problemas
