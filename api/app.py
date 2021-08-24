import time
import os
import urllib.request
import pandas as pd
from flask import Flask, request, redirect, jsonify, json
from werkzeug.utils import secure_filename
from flask_cors import CORS
from pyresparser import ResumeParser

UPLOAD_FOLDER = "C:/Users/Irtiza/Documents/smproj1/smfe/uploads"

app = Flask(__name__)
CORS(app)
app.secret_key = "secret key"
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

ALLOWED_EXTENSIONS = set(['txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'])

def allowed_file(filename):
	return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def handler(event, context):
    return awsgi.response(app, event, context)

@app.route('/file-upload', methods=['POST'])
def upload_file():
	# check if the post request has the file part
	print(request.files['file'])
	if 'file' not in request.files:
		resp = jsonify({'message' : 'No file part in the request'})
		resp.status_code = 400
		return resp
	file = request.files['file']
	if file.filename == '':
		resp = jsonify({'message' : 'No file selected for uploading'})
		resp.status_code = 400
		return resp
	if file and allowed_file(file.filename):
		filename = secure_filename(file.filename)
		file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
		data = ResumeParser("C:/Users/Irtiza/Documents/smproj1/smfe/uploads/" + filename).get_extracted_data()
		forpar = pd.read_csv('newfilewhodis.csv')
		#newresp = forpar.to_dict()
		datad = pd.Series(data['skills'])

		#presentlist = forpar.Skills[forpar.Skills.isin(data['skills'])].values.tolist()
		#print(type(presentlist))

		

		lowerforpar = pd.Series([item.lower() for item in forpar.Skills])
		lowerdatadaf = pd.Series([item.lower() for item in datad])


		lista = lowerforpar[~lowerforpar.isin(lowerdatadaf)]  ## SKILLS NOT IN RESUME
		listb = lowerforpar[lowerforpar.isin(lowerdatadaf)]   ## EXISTS IN RESUME AND SKILL LIST
		listc = lowerdatadaf[~lowerdatadaf.isin(lowerforpar)] ## SKILLS IN RESUME NOT 
		
		respA=lista.tolist()
		respB=listb.tolist()
		respC=listc.tolist()
		#missinglist = forpar.Skills[~forpar.Skills.isin(datadf)].values.tolist()
		#otherskills = datadf[~datadf.isin(forpar.Skills)]

		respA=[resp.capitalize() for resp in respA]
		respB=[resp.capitalize() for resp in respB]
		respC=[resp.capitalize() for resp in respC]
		newdict = {"apple": respA[:20], "ball": respB[:20], "cat": respC[:20]}
		
		# newdict.append({"apple": respA[:5], "ball": respB[:5], "cat": respC[:5]})		

		print(type(lista))
		resp = jsonify(newdict)
		resp.headers = {
		'Access-Control-Allow-Headers': 'Content-Type',
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
		}


		### DO ALL PROCESSING HERE FOR skill matching and sorting and extraction
		

		### AFTER DONE SEGREGATE RESPONSIBILITY

		resp.status_code = 201
		return resp
	else:
		resp = jsonify({'message' : 'Allowed file types are txt, pdf, png, jpg, jpeg, gif'})
		resp.status_code = 400
		return resp