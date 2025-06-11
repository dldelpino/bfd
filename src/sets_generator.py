import requests
from bs4 import BeautifulSoup
import json

# al ejecutar este archivo, se crea un archivo JSON que contiene todos los sets de Pokémon del Frente Batalla de la cuarta generación
# tarda alrededor de un minuto en ejecutarse

sets = []

trainerClasses = ['Youngster', 'Lass', 'School Kid', 'Rich Boy', 'Lady', 'Tuber', 'Bug Catcher', 'Ninja Boy', 'Poké Kid', 'Fisherman', 'Camper', 'Picnicker', 'Guitarist', 'Idol', 'Pokéfan', 'Rancher', 'Cowgirl', 'Pokémon Breeder', 'Ace Trainer', 'Pokémon Ranger', 'Dragon Tamer', 'Black Belt', 'Battle Girl', 'Veteran', 'Socialite', 'Psychic', 'Waiter', 'Waitress', 'Cameraman', 'Reporter', 'Cyclist', 'PI', 'Jogger', 'Fisherman', 'Sailor', 'Hiker', 'Ruin Maniac', 'Collector', 'Roughneck', 'Scientist', 'Gentleman', 'Worker', 'Clown', 'Policeman', 'Bird Keeper', 'Parasol Lady', 'Beauty', 'Aroma Lady']

def stringToSpan(string): # convierte un string de la forma '<span>...</span>' en un objeto BeautifulSoup
    aux = BeautifulSoup(string, 'html.parser')
    bs = aux.span
    return bs

for trainerClass in trainerClasses:
    print(trainerClass)
    url = requests.get('https://bulbapedia.bulbagarden.net/wiki/List_of_Battle_Frontier_Trainers_in_Generation_IV/' + trainerClass)
    soup = BeautifulSoup(url.text, 'html.parser')
    tables = soup.find_all("table", attrs = {"class": "sortable"}) # tablas de la URL (parece que no puedo filtrar por más de una clase)
    trainers = soup.find_all("span", attrs = {"class": "mw-headline"}) # nombres encima de las tablas
    if trainerClass == 'Pokémon Ranger':
        # en la página de Bulbapedia de los Pokémon Ranger hay un fallo de código que hace que los nombres de algunos entrenadores no se muestren correctamente
        # tengo que hacer este chanchullo para añadirlos a mano
        trainers.append(stringToSpan('<span>Geoff and Alma</span>'))
        trainers.append(stringToSpan('<span>Gunther</span>'))
        trainers.append(stringToSpan('<span>Elise</span>'))
    header = ['Pokémon', 'Item', 'Moves', 'Nature', 'HP', 'Atk', 'Def', 'SpA', 'SpD', 'Spe', 'Trainers']
    N = len(tables)
    for i in range(N):
        table = tables[i]
        trainer = trainers[i] # nombre de los entrenadores a los que pertenecen los Pokémon de esta tabla
        trainer = trainer.text.replace(" and ", ", ")
        trainer = trainer.split(", ") # convierte "Antonio, Juan and Pedro" en ["Antonio", "Juan", "Pedro"]
        rows = table.find_all("tr", attrs = {"style": "text-align:center; background:#fff"})
        for row in rows:
            cells = row.find_all("td") # [número de Pokédex, foto, nombre, objeto, naturaleza, HP, Atk, Def, SpA, SpD, Spe]
            moves = row.find_all("th") # [ataque 1, ataque 2, ataque 3, ataque 4]
            data = {
                '#': cells[0].text.strip(), # strip elimina espacios al principio y al final y saltos de línea
                'Pokémon': cells[2].text.strip(),
                'Item': cells[3].text.strip(),
                'Moves': [
                    moves[0].text.strip(),
                    moves[1].text.strip(),
                    moves[2].text.strip(),
                    moves[3].text.strip(),
                ],
                'Nature': cells[4].text.strip(),
                'EVs': [
                    cells[5].text.strip(),
                    cells[6].text.strip(),
                    cells[7].text.strip(),
                    cells[8].text.strip(),
                    cells[9].text.strip(),
                    cells[10].text.strip(),
                ],
                'Trainers': trainer,
                'Trainer Class': trainerClass
            }
            sets.append(data)

with open("src/sets.json", "w", encoding="utf-8") as f: # "w" - write; "r" - read; "a" - append; "x" - create
    json.dump(sets, f, indent = 2, ensure_ascii = False) # indent = 2 hace que el JSON sea más legible; ensure_ascii = False hace que los caracteres no ASCII no den problemas
