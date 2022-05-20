import re

input = open("dict_eng_txt.txt", "r") #aztertuko den hitzegia ireki
output = open("hiztegiOna.txt", "a") #emaitza gordeko duen fitxategia ireki/sortu

for line in input:
    emaitza = re.findall("^[A-ZÀ-ÿ]{5}$", line, re.UNICODE) #5 letrako hitzak lortu (letra larrikoak soilik, besteak azalpenak direlako)
    if emaitza:
        print(emaitza)
        output.write(emaitza[0].lower() + "\n") #5 letrako hitzak gorde (letra xehez, beste hiztegien formatuan gordetzeko)


input.close()
output.close()