import os
import sys
path = '/var/www/blog'
if path not in sys.path:
	sys.path.append(path)
os.environ['DJANGO_SETTINGS_MODULE'] = 'conf.product'

import django.core.handlers.wsgi
application = django.core.handlers.wsgi.WSGIHandler()

import django
django.setup()