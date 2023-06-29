ans = []

print("start")
with open("A_Z_medicines_dataset_of_India.csv","r") as f:
    lines = f.readlines()
    # print(lines)
    for i in range(1,len(lines)):
        data = str(lines[i]).split(",")
        ans.append(data[1])

with open("names.json","w") as f:
    f.write(str(ans))

print("stop")

