import os
# import cv2 
import uuid
import json
import face_recognition
import mysql.connector as db
from matplotlib import pyplot as plt


    
   

def resource_path(relative):
    return os.path.join(
        os.environ.get(
            "_MEIPASS2",
            os.path.abspath(".")
        ),
        relative
    )
FOLDER_PATH = resource_path('faceid')
MAIN_PATH = resource_path('faceid_ia')
keysPath = os.path.join(MAIN_PATH, 'keys.json')
with open(keysPath) as json_file:
    keys = json.load(json_file)
IMAGES_PATH = os.path.join(MAIN_PATH, 'images')
TEST_PATH = os.path.join(MAIN_PATH, 'test')

def convertToBinaryData(filename):
    try:
        with open(filename, 'rb') as file:
            binaryData = file.read()
        return binaryData
    except:
        return 0

def write_file(data, path):
    with open(path, 'wb') as file:
        file.write(data)
        
def registerFace(name, userId, filepath):
    id = 0
    inserted = 0
    try:
        con = db.connect(host=keys["host"], user=keys["user"], password=keys["password"], database=keys["database"])
        cursor = con.cursor()
        sql = "INSERT INTO `faces` (name, userId, photo) VALUES (%s,%s,%s)"
        pic = convertToBinaryData(filepath)
        if pic:
            cursor.execute(sql, (name, userId, pic))
            con.commit()
            inserted = cursor.rowcount
            id = cursor.lastrowid
    except db.Error as e:
        print(f"Failed inserting image: {e}")
    finally:
        if con.is_connected():
            cursor.close()
            con.close()
    return {"id": id, "affected":inserted}

def getFaces(userId):
    id = 0
    rows = 0
    paths = []
    try:
        con = db.connect(host=keys["host"], user=keys["user"], password=keys["password"], database=keys["database"])
        cursor = con.cursor()
        sql = "SELECT * FROM `faces` WHERE userId = %s"
        cursor.execute(sql, (userId,))
        records = cursor.fetchall()

        for row in records:
            id = row[0]
            filename = f"{row[1]}_{id}.jpg"
            filepath = os.path.join(IMAGES_PATH, filename)
            paths.append(filepath)
            write_file(row[3], filepath)
        rows = len(records)
    except db.Error as e:
        print(f"Failed to read image: {e}")
    finally:
        if con.is_connected():
            cursor.close()
            con.close()
    return paths

def checkFace(path):
    image = face_recognition.load_image_file(path)
    encoding = face_recognition.face_encodings(image)
    return len(encoding) > 0

def register_face_db(name, userId, filepath):
    inserted = 0
    if checkFace(filepath) == True:
        res_bd = registerFace(name, userId, filepath)
        if(res_bd["affected"]):
            inserted += res_bd["affected"]
    os.remove(filepath)
    return inserted

def register_capture(name, userId, data):
    inserted = 0
    filename = f"{name}.jpg"
    filepath = os.path.join(IMAGES_PATH, filename)
    write_file(data, filepath)
    inserted += register_face_db(name, userId, filepath)
    return inserted

def registerFaces(name, userId, datalist):
    inserted = 0
    for data in datalist:
        res= register_capture(name, userId, data)
        inserted += res
    return inserted

def compareFaces(unknow, encodings):
    results = face_recognition.compare_faces(encodings, unknow)
    for result in results:
        if result==True:
            return result
    return False

def login(userId, data):
    filename = f"{userId}_login.jpg"
    filepath = os.path.join(IMAGES_PATH, filename)
    write_file(data, filepath)
    image = face_recognition.load_image_file(filepath)
    unknow_encoding = face_recognition.face_encodings(image)
    os.remove(filepath)
    if len(unknow_encoding) == 0:
        return False
    encodings = []
    paths = getFaces(userId)
    for path in paths:
        temp_img = face_recognition.load_image_file(path)
        temp_encodes = face_recognition.face_encodings(temp_img)
        for enc in temp_encodes:
            encodings.append(enc)
        os.remove(path)
    if len(encodings) == 0:
        return False   
    return compareFaces(unknow_encoding[0], encodings)