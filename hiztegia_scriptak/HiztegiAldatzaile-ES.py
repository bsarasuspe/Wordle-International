import re

input = open("hiztegi.txt", "r") #aztertuko den hitzegia ireki
output = open("hiztegiOna.txt", "a") #emaitza gordeko duen fitxategia ireki/sortu

for line in input:
    emaitza = re.findall("^[a-zA-ZÀ-ÿ]{5}$", line, re.UNICODE) #5 letrako hitzak lortu
    if emaitza:
        print(emaitza)
        output.write(emaitza[0] + "\n") #5 letrako hitzak gorde


input.close()
output.close()