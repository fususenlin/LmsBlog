import os
import sys
path = '/var/www/blog'
if path not in sys.path:
	sys.path.insert(0, path)
os.environ['DJANGO_SETTINGS_MODULE'] = 'conf.product'

import django
django.setup()

import django.core.handlers.wsgi
application = django.core.handlers.wsgi.WSGIHandler()

