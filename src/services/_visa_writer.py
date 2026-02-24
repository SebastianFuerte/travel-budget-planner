import os

out_path = 'C:/Users/sebas/OneDrive/Desktop/SF_Workspace/travel-budget-planner/travel-budget-planner/src/services/visaRequirements.ts'
content_path = 'C:/Users/sebas/OneDrive/Desktop/SF_Workspace/travel-budget-planner/travel-budget-planner/src/services/_visa_content.txt'

with open(content_path, 'r', encoding="utf-8") as f:
    content = f.read()

with open(out_path, 'w', encoding="utf-8", newline="
") as f:
    f.write(content)

os.remove(content_path)
print('Written', os.path.getsize(out_path), 'bytes')
