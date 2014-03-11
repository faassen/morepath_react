import os
from setuptools import setup, find_packages

setup(name='morepath_react',
      version='0.1dev',
      description="Morepath React Demo with SQLAlchemy backend",
      author="Martijn Faassen",
      author_email="faassen@startifact.com",
      license="BSD",
      packages=find_packages(),
      include_package_data=True,
      zip_safe=False,
      install_requires=[
        'setuptools',
        'morepath',
        'fanstatic',
        'transaction',
        'more.transaction',
        'zope.sqlalchemy >= 0.7.4',
        'sqlalchemy >= 0.9',
      ],
      entry_points= {
        'console_scripts': [
            'morepath_react = morepath_react.main:main',
            ]
        },
      )
