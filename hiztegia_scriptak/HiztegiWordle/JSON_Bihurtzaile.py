import re, json

input = open("Hiztegi-EN.txt", "r") #aztertuko den hitzegia ireki
output = open("hiztegiJSON.json", "a") #emaitza gordeko duen fitxategia ireki/sortu

hitzak = []

for line in input:
    hitza = {'hitza' : line.rstrip("\n")} #lerro jauziak kendu eta hitzak hiztegi indibidualetan gorde
    hitzak.append(hitza) #hiztegiak array batean gorde
    print(hitza)


emaitzaJSON = json.dumps({'hitzak' : hitzak}) #hiztegi batean hitzen hiztegien array-a txertatu eta JSON objektu bihurtu
print(emaitzaJSON)
output.write(emaitzaJSON)

input.close()
output.close()