#!/usr/bin/env python
# -*- coding: UTF-8 -*
import cgi
import csv
import os
from datetime import datetime

fs = cgi.FieldStorage()
out_dir = "/tmp"
out_file = datetime.today().strftime("%Y-%m-%d")+ ".csv"
out_path = os.path.join(out_dir, out_file)
keys = ['unique_key', 'completed', 'food_preference', 'free_text']

if not os.path.isfile(out_path):
    with open(out_path, 'w+') as fh:
        fh.write(','.join(keys) + "\n")

with open(out_path, 'a') as fh:
    csv_writer = csv.writer(fh, quoting=csv.QUOTE_ALL, lineterminator='\n')
    csv_writer.writerow([fs.getvalue(k, "None") for k in keys])

print("Content-Type: text/plain;charset=utf-8")
print
