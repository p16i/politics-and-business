# -*- coding: utf-8 -*

import requests
import pandas as pd
import sys
import json
import subprocess 
import glob
from  datetime import datetime

from multiprocessing import Pool

API = 'https://creden.co/sapi/get_list_partner_candidate'

def scrapeBusiness(d):
    i, n = d
    print('>> Scraping %3d : %s' % (i+1, n['name']))
    data = json.dumps(dict(text=n['name']), ensure_ascii=False).encode('utf-8')
    r = requests.post(API,
         data=data,
         headers={'Content-Type': 'application/json'}
        )

    res = json.loads(r.text)
    if 'data' in res.keys():
        n['relatedTo'] = list(res['data'])
    else:
        print('something bad happend to %s' % n['name'])
        print(res)
    return n

scrape_list = sys.argv[1]

with open(scrape_list, 'r') as f:
    names = list(map(lambda x: x.strip(), f.readlines()))

failure = []
for i, f in enumerate(names):
    filename = './data/party-politicians/%s.csv' % f

    df = pd.read_csv(filename, header=0, sep=",")
    candidates = df.to_dict('records')
    totalRecords = len(candidates)
    print('Scraping %d %s with %d records at %s' % (i+1, f, totalRecords, datetime.now().strftime("%Y-%m-%d %X")))

    candidatesWithIdx = zip(range(totalRecords), candidates)

    with Pool(1) as pool:
        candidatesWithIdx = zip(range(totalRecords), candidates)
        results = pool.map(scrapeBusiness, candidatesWithIdx)
        assert len(results) == totalRecords, 'we dont have the same no. of records'
        filename = filename.split('/')[-1]
        path = 'creden/%s.json' % filename
        print('| saving file to %s' % path)
        with open(path, 'w') as outfile:
            json.dump(results, outfile, ensure_ascii=False)