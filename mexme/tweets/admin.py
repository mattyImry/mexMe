from django.contrib import admin
from .models import Tweet, tweetLike

# Register your models here..


class TweetLikeAdmin(admin.TabularInLine):
    model = TweetLike


class TweetAdmin(admin.ModelAdmin):
    inlines = [TweetLikeAdmin]
    list_display = ['__str__', 'user']
    search_fields = ['user__username', 'user__email']

    class Meta:
        model = Tweet


admin.site.register(Tweet, TweetAdmin)
