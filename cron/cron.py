#!/usr/bin/env python3

import sys
import os
from argparse import ArgumentParser

parser = ArgumentParser(
    description='Given a timestamp and a file containing a \
      list of cron jobs, this script will print the soonest \
      time each cron job will run relative to that timestamp')

parser.add_argument("time", help="Timestamp in the format HH:MM", type=str)

args = parser.parse_args()


def soonest_time_cron_job_will_run(**kwargs):
    input_time = kwargs['input_time']
    cron_time = kwargs['cron_time']
    cron_name = kwargs['cron_name']

    input_hour, input_minute = input_time.split(':')
    cron_minute, cron_hour = cron_time.split(' ')

    if (cron_hour == '*'):
        cron_hour = input_hour
    if (cron_minute == '*'):
        if (cron_hour == input_hour):
            cron_minute = input_minute
        else:
            cron_minute = '00'

    if (input_hour > cron_hour):  # will run tomorrow
        return f'{cron_hour}:{cron_minute} tomorrow -{cron_name}'
    elif (input_hour == cron_hour and input_minute > cron_minute):
        return f'{cron_hour}:{cron_minute} tomorrow -{cron_name}'
    elif (input_hour == cron_hour and input_minute <= cron_minute):
        return f'{cron_hour}:{cron_minute} today -{cron_name}'
    else:
        return f'{cron_hour}:{cron_minute} today -{cron_name}'


def read_config_line_by_line(**kwargs):
    input_time = kwargs['input_time']

    result = ''

    i = 0
    for line in sys.stdin:
        corrupted_line_numbers = []
        try:
            result += soonest_time_cron_job_will_run(
                input_time=args.time,
                cron_time=line.split('-')[0].strip(),
                cron_name=line.split('-')[1])
        except:
            corrupted_line_numbers.append(str(i + 1))

        i += 1

    if (len(corrupted_line_numbers)):
        result += f'\nCorrupted line numbers: ({", ".join(corrupted_line_numbers)})'
        result += '\nExpected format:        30 1 /bin/run_me_daily'

    return result


def parse_input(**kwargs):
    input_time = kwargs['input_time']
    try:
        input_hour, input_minute = input_time.split(':')
        if (len(input_hour) > 2 or len(input_minute) > 2 or len(input_hour) < 2 or len(input_minute) < 2):
            raise ValueError('Please enter a timestamp in the format HH:MM')
        if (input_hour > '23' or input_hour < '0'):
            raise ValueError('Please enter an hour value between 00-23')
        if (input_minute > '59' or input_minute < '0'):
            raise ValueError('Please enter an minute value between 00-59')

    except Exception as e:
        if ('not enough values to unpack' in str(e)):
            print('Please enter a timestamp in the format HH:MM')
        else:
            print(e)
        sys.exit()

    if os.isatty(0):
        print('No config file supplied to STDIN')
        sys.exit()

    return read_config_line_by_line(input_time=input_time)


result = parse_input(input_time=args.time)
print(result)
