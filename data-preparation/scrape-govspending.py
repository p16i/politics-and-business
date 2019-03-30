# -*- coding: utf-8 -*
import requests
import pandas as pd
import sys
import json
import subprocess 
import glob
import numpy as np
import os

from time import sleep
from multiprocessing import Pool

USER_TOKEN = os.environ['GOVSPENDING_TOKEN']
API = 'https://govspendingapi.data.go.th/api/service/cgdcontract?limit=100&user_token={token}&winner_tin={id}'

def giveMeNumber(s):
    return float(s.replace(',', ''))

def scrapeGovSpending(b, maxRetries = 5):
    print('>> Scraping %s' % (b['_id']))
    
    r = requests.get(API.format(id=b['_id'], token=USER_TOKEN))

    try:
        res = json.loads(r.text)
    except:
        if maxRetries < 0:
            SystemExit('Really bad thing happen! we failed more than 5 times')
        print('---- Something went wrong sleep for 1m at retry')
        sleep(60)
        return scrapeGovSpending(b, maxRetries=maxRetries-1)

    projects = res['result']

    totalProjects = len(projects)

    if totalProjects > 0:
        print('--- Found %d projects' % totalProjects)
        price_agrees = []
        price_builds = []

        for p in projects:
            spa = giveMeNumber(p['sum_price_agree'])
            pb = p['price_build']
            if pb == '-':
                pb = spa
            else:
                pb = giveMeNumber(pb)

            price_agrees.append(spa)
            price_builds.append(pb)

        price_builds, price_agrees = np.array(price_builds), np.array(price_agrees)

        b['totalProjects'] = totalProjects
        b['totalPriceBuild'] = np.sum(price_builds)
        b['totalPriceAgree'] = np.sum(price_agrees)
        ns = np.where(price_builds == 0, np.finfo(float).eps, 0)
        price_builds = price_builds + ns
        b['avgPriceDiff'] = np.mean((price_agrees - price_builds) / price_builds)

    if totalProjects > 0:
        print(">>>> H1: %s" % b['_id'])
    elif totalProjects > 10:
        print(">>>> H10: %s" % b['_id'])
    elif totalProjects == 100:
        print(">>>> H100: %s" % b['_id'])

    return b

scrape_list = sys.argv[1]

with open(scrape_list, 'r') as f:
    names = list(map(lambda x: x.strip(), f.readlines()))

failure = []
for i, partyName in enumerate(names):
    filename = './creden/%s.csv.json' % partyName

    with open(filename) as json_file:  
        politicians = json.load(json_file)
        countPolsHaveBusiness = 0
        for i, p in enumerate(politicians):
            print('%s (%d) | %s involes %d companies' % (partyName, i+1, p['name'], len(p['relatedTo'])))

            if len(p['relatedTo']) > 0:
                countPolsHaveBusiness = countPolsHaveBusiness + 1

            for b in p['relatedTo']:
                scrapeGovSpending(b)

            if (countPolsHaveBusiness+1) % 30 == 0:
                print('Taking a break as we have %d politicians with buisness' % countPolsHaveBusiness)
                sleep(60)
                countPolsHaveBusiness = 0


    path ='./creden-meet-govspending/%s.json' % partyName
    print('| saving file to %s' % path)
    with open(path, 'w') as f:
        json.dump(politicians, f, ensure_ascii=False)