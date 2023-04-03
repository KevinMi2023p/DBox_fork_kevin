import sys
import re
import os

file_to_change = "src/index.html"

output_file = "src/test.html"

if len(sys.argv) < 2:
    os.exit(1)
    
font_chosen = sys.argv[1]

text = open(file_to_change).read()  # read the entire file content



matches = re.findall(r'\"(.+?)\"',text)  # match text between two quotes
for m in matches:
    # if m is a font replace it with the font chosen
    text = text.replace('font-family: \"%s\"' % m, 'font-family: \"%s\"' % font_chosen)
    
# flag -o to overwrite the original file
if '-o' in sys.argv:
    output_file = file_to_change
    
with open(output_file, "w") as f:
    f.write(text)
