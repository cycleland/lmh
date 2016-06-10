#!/usr/bin/env python
# -*- coding: UTF-8 -*
import cgi
import csv
import os
from datetime import datetime

fs = cgi.FieldStorage()
#out_dir = "/tmp"
out_dir = '/var/www/html'
out_file = datetime.today().strftime("%Y-%m-%d")+ ".csv"
out_path = os.path.join(out_dir, out_file)
keys = ['unique_key', 
        'completed', 
        'overall_food_rating',
        'overall_food_text',
        'individual_food_continue_query_1',
        'individual_food_rating_1',
        'individual_food_text_1',
        'individual_food_continue_query_2',
        'individual_food_rating_2',
        'individual_food_text_2',
        'individual_food_continue_query_3',
        'individual_food_rating_3',
        'individual_food_text_3']

if not os.path.isfile(out_path):
    with open(out_path, 'w+') as fh:
        fh.write(','.join(keys) + "\n")

with open(out_path, 'a') as fh:
    csv_writer = csv.writer(fh, quoting=csv.QUOTE_ALL, lineterminator='\n')
    csv_writer.writerow([fs.getvalue(k, "None") for k in keys])

print("Content-Type: text/plain;charset=utf-8")
print
