#!/usr/bin/env python3
import requests
import json
import sys
import os
from argparse import ArgumentParser
from dotenv import load_dotenv
load_dotenv()

base_url = "https://api.trello.com/1"

parser = ArgumentParser(
    description='A simple CLI for The trello API'
)

parser.add_argument(
    "--get-all-boards",
    dest='trello',
    help="Return all boards associated with the user's key",
    action='store_const',
    const={
        "url": "{}/members/me/boards".format(base_url), "query": '{"fields": "name,url"}', "method": "GET"
    },
)
parser.add_argument(
    "--get-board-info",
    dest='trello',
    help="Return information about the specified board",
    action='store_const',
    const={
        "url": "{}/boards/5f95fe1f7637446abbd8b28a".format(base_url), "method": "GET"
    }
)

args = parser.parse_args()

if args.trello == None:
    parser.print_help()
    sys.exit(0)

query = {
    'key': os.getenv('KEY'),
    'token': os.getenv('TOKEN')
}

if 'query' in args.trello:
    query_dict = json.loads(args.trello['query'])
    query.update(query_dict)

response = requests.request(
    args.trello['method'],
    args.trello['url'],
    params=query
)

parsed = json.loads(response.text)
print(json.dumps(parsed, indent=4, sort_keys=True))
