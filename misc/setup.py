import os

from setuptools import setup, find_packages

setup(name='neshack_app',
      version='0.0.1',
      author='Guto Maia',
      author_email='guto@guto.net',
      keywords='webapp javascript',
      packages=find_packages(),
      include_package_data=True,
      package_data={
        'neshack_app.static.app': ['*.js'],
        'neshack_app.static.app.views': ['*.js'],
        'neshack_app.static.app.templates': ['*.html'],
        'neshack_app.static.*': ['*.js'],
      },
      zip_safe=False,
      install_requires=[]
      )
