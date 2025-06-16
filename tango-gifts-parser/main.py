import json

import pandas as pd

gifts_data = pd.read_excel('./tango-gifts.xlsx')

gifts = {
	category: [] for category in gifts_data['category-name'].unique()
}

for image_url, price, category_name in gifts_data.itertuples(index=False):
	gifts[category_name].append({"image": image_url, "timeValue": price})

with open('./gifts.json', 'w') as file:
	json.dump(gifts, file)