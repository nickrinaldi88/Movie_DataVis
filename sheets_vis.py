# Create prod.env file with json creds

import os
import gspread
import pandas as pd
from oauth2client.service_account import ServiceAccountCredentials

scope = ["https://spreadsheets.google.com/feeds", "https://www.googleapis.com/auth/spreadsheets",
         "https://www.googleapis.com/auth/drive.file", "https://www.googleapis.com/auth/drive"]

creds = ServiceAccountCredentials.from_json_keyfile_name("PMF_Duplicate_creds.json", scope)

client = gspread.authorize(creds)

user_row_mapping = {"Derek": 10,
                    "Dan": 11,
                    "DP": 12,
                    "Nick": 13,
                    "Austin": 14,
                    "Connor": 15,
                    "Basil": 16,
                    "Mike_V": 17,
                    "Gil": 18,
                    "Will": 19,
                    "Guest": 20
}

# open sheet
sh = client.open("Movie Fridays")

# find sheets films are on
movie_sheet = client.open("Movie Fridays").sheet1

# print(movie_sheet.get_all_records())

# create df
df = pd.DataFrame(movie_sheet.get_all_values())
header_row = 1
df.columns = df.iloc[header_row]
df = df[2:]
# remove Movie_Fridays header 

df.to_csv('out.csv', index=False)

# print(df['Nick'])
# print(df['Picked by:'])

# print(df)


# bro = input("Enter your bro: ")
# submitter = str(input("Enter the submitter"))

# picked_by = df[df['Picked by:'].str.contains(submitter)]
# bro = df['bro']
# date = df['Date']

# x = date
# y = rating

# hover to display movie name

# for bro, col_num in user_row_mapping.items():
#     if bro == 'Nick':
#         rating = df[bro]
        


#        # movie = df['']
# picked_by = df[df['Picked by:'].str.contains("Aust")]
# print(picked_by['Movie'], picked_by['Nick'])
    # df[]
    # Find values in Nick column, that are in same row as Picked By name
    # Then, select movie_name in that row
    # Then, add that as key of dict
    # The, add rating as value
    # Map dict to visualization
    # dynamically create dict of movie_name: rating
   
# print(val)

# convert sheet to dataframe
# 


# director_sheet = sh.get_worksheet(4)  # director sheet


# Create list of users
# Select one user
# Select another user
# Check 'Picked_by'. 
# For every row Austin is in Picked By, find Nick's rating for that row.

# cell value. Check everytime that value occurs.
# Then select cell where User's rating is where row is that movie.

# Two dropdowns
# if one dropdown selected, display ratings for others movies 
# i.e. [Nick] - [Austin]: Show Data Visualization of Relationship of ratings

