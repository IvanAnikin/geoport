from django.shortcuts import render

import boto3
import json

# from ecoten_geoportal.templates.leaflet_tags import *


def index(request):
    s3 = boto3.client('s3')

    bucket_name = 'mangekyou-sharingan-api'
    folder_path = 'Berlin/.png/'

    response = s3.list_objects_v2(Bucket=bucket_name, Prefix=folder_path)

    urls_dict = {}

    for obj in response.get('Contents', []):
        object_key = obj['Key']
        expiration_time_in_seconds = 43200  # 12 hours

        url = s3.generate_presigned_url(
            'get_object',
            Params={'Bucket': bucket_name, 'Key': object_key},
            ExpiresIn=expiration_time_in_seconds
        )

        item_name = object_key.split('/')[-1]

        urls_dict[item_name] = url

    urls_json = json.dumps(urls_dict)


    # urls_json = json.dumps([])

    return render(request, 'index.html', {'urls_json': urls_json})


def login(request):
    return render(request, 'login.html')

# def leaflet(request):
#     return render(request, 'leaflet.html')

# def nocode(request):
#     return render(request, 'gojs_flowchart.html')

# def jointjs(request):
#     return render(request, 'jointjs.html')

# def data_view(request):
#     return render(request, 'leaflet.html')
