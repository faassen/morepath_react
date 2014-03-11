from morepath import redirect
from .model import Document, Root
from .main import app
from .collection import DocumentCollection
from .static import main

@app.html(model=Root)
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


@app.json(model=Root, name='info')
def info(self, request):
    return {
        'iface': 'Info',
        'document_collection': request.link(DocumentCollection())
    }


@app.json(model=Document)
def document_default(self, request):
    return {'id': self.id,
            'title': self.title,
            'content': self.content,
            'link': request.link(self) }


@app.json(model=DocumentCollection)
def document_collection_default(self, request):
    return {
        'iface': 'DocumentCollection',
        'documents': [request.view(doc) for doc in self.query()],
        'previous': request.link(self.previous(), default=None),
        'next': request.link(self.next(), default=None),
        'add': request.link(self, 'add'),
        }


@app.html(model=DocumentCollection, name='add')
def document_collection_add(self, request):
    return '''\
<html>
<body>
<form action="/documents/add_submit" method="POST">
title: <input type="text" name="title"><br>
content: <input type="text" name="content"><br>
<input type="submit" value="Add!"><br>
</form>
</body>
</html>
'''


@app.html(model=DocumentCollection, name='add_submit', request_method='POST')
def document_collection_add_submit(self, request):
    title = request.POST.get('title')
    content = request.POST.get('content')
    document = self.add(title=title, content=content)
    return "<p>Awesome %s</p>" % document.id
