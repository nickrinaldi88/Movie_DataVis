import os
import gspread
from oauth2client.service_account import ServiceAccountCredentials

print(os.listdir())

scope = ["https://spreadsheets.google.com/feeds", "https://www.googleapis.com/auth/spreadsheets",
         "https://www.googleapis.com/auth/drive.file", "https://www.googleapis.com/auth/drive"]

creds = ServiceAccountCredentials.from_json_keyfile_name("creds.json", scope)

client = gspread.authorize(creds)

sh = client.open("Movie Fridays")

movie_sheet = client.open("Movie Fridays").sheet1

director_sheet = sh.get_worksheet(4)  # director sheet
