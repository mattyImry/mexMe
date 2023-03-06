from django.http import HttpResponse, Http404, JsonResponse
from django.shortcuts import render

from .models import Tweet


def home_view(request, *args, **kwargs):
    return HttpResponse("<h1>Hello</h1>")


def tweet_detail_view(request, tweet_id, *args, **kwargs ):

    """
    REST API VIEW
    retunring json data
    """
    data = {
        "id": tweet_id,
    }
    status = 200
    try:
        obj = Tweet.objects.get(id=tweet_id)
        data['content'] = obj.content
    except Exception:
        data['message'] = "Not Found"
        status = 404
    return JsonResponse(data, status=status)
