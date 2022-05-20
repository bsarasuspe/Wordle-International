import re

input = open("hiztegia-EUS.txt", "r") #Aztertuko den hiztegia ireki
output = open("hiztegiOna.txt", "a") #Emaitza gordeko duen fitxategia sortu/ireki

for line in input:
    hitzakLag = line.split('"')
    hitzak = [value for value in hitzakLag if value != ","]
    print(hitzak)
    for hitz in hitzak:
        output.write(hitz + "\n") #5 letrako hitzak gorde
    


input.close()
output.close()