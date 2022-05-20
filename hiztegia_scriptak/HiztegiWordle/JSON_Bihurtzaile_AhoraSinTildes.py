import re, json
import unicodedata
def strip_accents(s):
   return ''.join(c for c in unicodedata.normalize('NFD', s)
                  if unicodedata.category(c) != 'Mn')

input = open("Hiztegi-ES.txt", "r") #aztertuko den hitzegia ireki
output = open("hiztegiJSON-ES.json", "a") #emaitza gordeko duen fitxategia ireki/sortu

hitzak = []

for line in input:
    lag = strip_accents(line)
    hitza = {'hitza' : lag.rstrip("\n")} #lerro jauziak kendu eta hitzak hiztegi indibidualetan gorde
    hitzak.append(hitza) #hiztegiak array batean gorde
    print(hitza)


emaitzaJSON = json.dumps({'hitzak' : hitzak}) #hiztegi batean hitzen hiztegien array-a txertatu eta JSON objektu bihurtu
print(emaitzaJSON)
output.write(emaitzaJSON)

input.close()
output.close()