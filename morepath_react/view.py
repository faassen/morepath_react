from morepath import redirect
from .model import Document, Root
from .main import App
from .collection import DocumentCollection
from .static import main

@App.html(model=Root)
def root_default(self, request):
    main.need()
    return '''\
<!DOCTYPE html>
<html>
  <head>
    <title>Morepath React Demo</title>
  </head>
  <body>
    <div id="main"></div>
  </body>
</html>'''


@App.json(model=Root, name='info')
def info(self, request):
    return {
        'iface': 'Info',
        'document_collection': request.link(DocumentCollection())
    }


@App.json(model=Document)
def document_default(self, request):
    return {
        'iface': 'Document',
        'id': self.id,
        'title': self.title,
        'content': self.content,
        'link': request.link(self)
    }


@App.json(model=DocumentCollection)
def document_collection_default(self, request):
    return {
        'iface': 'DocumentCollection',
        'documents': [request.view(doc) for doc in self.query()],
        'previous': request.link(self.previous(), default=None),
        'next': request.link(self.next(), default=None),
        'add': request.link(self, 'add'),
        }


@App.json(model=DocumentCollection, name='add', request_method='POST')
def document_collection_add(self, request):
    title = request.json.get('title')
    content = request.json.get('content')
    document = self.add(title=title, content=content)
    return request.view(self)
