#!/usr/bin/env python
# -*- coding: UTF-8 -*
import cgi
import csv
import os
from datetime import datetime
import re, string

fs = cgi.FieldStorage()
out_dir = '/var/www/html'
out_file = datetime.today().strftime('%Y-%m-%d')+ '.csv'
out_path = os.path.join(out_dir, out_file)
keys = ['unique_key', 
        'overall_food_rating',
        'overall_food_text',
        'individual_food_query_1', 
        'individual_food_rating_1',
        'individual_food_text_1',
        'individual_food_query_2', 
        'individual_food_rating_2',
        'individual_food_text_2',
        'individual_food_query_3',
        'individual_food_rating_3',
        'individual_food_text_3']

if not os.path.isfile(out_path):
    with open(out_path, 'w+') as fh:
        header = ','.join(['time'] + keys)
        fh.write(header + '\n')

time = datetime.fromtimestamp(float(fs.getvalue('unique_key', 'None'))/1000).strftime('%Y-%m-%d %H:%M:%S')
vals = [fs.getvalue(k, 'None') for k in keys]

#Sanitize text values: remove all characters except alphanumerics, whitespaces, dashes, periods
#See https://docs.python.org/2/library/cgi.html
pattern = re.compile('[^a-zA-Z0-9._-]+$')   
san_vals = [pattern.sub('', v) for v in vals]

#Limit response string lengths to 200 characters
san_vals = [x[:200] if len(x) > 200 else x for x in san_vals]

row = [time] + san_vals 
with open(out_path, 'a') as fh:
    csv_writer = csv.writer(fh, quoting=csv.QUOTE_ALL, lineterminator='\n')
    csv_writer.writerow(row)

print('Content-Type: text/plain;charset=utf-8')
print
