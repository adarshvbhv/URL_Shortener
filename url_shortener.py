import re
from urllib.parse import urlparse
from datetime import datetime, timedelta


class URLShortener:
    def __init__(self):
        self.url_database = {}
        self.counter = 0

    def is_valid_url(self, long_url):
        regex = re.compile(
         r"^(https?:\/\/)?(localhost:\d{1,5}|([a-zA-Z0-9-]+(\.[a-zA-Z0-9-]{2,})+))(:\d{1,5})?(\/[^\s]*)?$", re.IGNORECASE)
        return re.match(regex, long_url) is not None

    def shorten_url(self, long_url, ttl):
        if not self.is_valid_url(long_url):
            raise ValueError("Invalid URL")
        expiration_time = None
        if ttl is not None:
            expiration_time = datetime.now() + timedelta(hours=int(ttl))

        for i in self.url_database:
            if long_url == self.url_database[i]['long_url']:
                self.url_database[i]['expires_at'] = expiration_time
                # Reuse the existing short URL if the long URL already exists
                return i
        
        short_url = f"http://localhost:5000/{self.counter}"
        self.url_database[short_url] = {
            'long_url': long_url,
            'access_count': 0,
            'expires_at' : expiration_time
        }
       
        self.counter += 1
        return short_url


    def redirect_url(self, short_url):
        if short_url in self.url_database and self.url_database[short_url]['expires_at'] and datetime.now() > self.url_database[short_url]['expires_at']:
            raise KeyError("URL has expired")
        elif short_url in self.url_database:
            self.url_database[short_url]['access_count'] += 1
            return self.url_database[short_url]['long_url']
        else:
            raise KeyError("Short URL not found")

    def get_access_count(self, short_url):
        if short_url in self.url_database:
            return self.url_database[short_url]['access_count']
        raise KeyError("Short URL not found")