from .main import app, Session
from .model import Document, Root
from .collection import DocumentCollection

@app.path(model=Root, path='/')
def get_root():
    return Root()

@app.path(model=Document, path='documents/{id}',
          converters={'id': int})
def get_document(id):
    session = Session()
    return session.query(Document).filter(Document.id == id).first()


@app.path(model=DocumentCollection, path='documents')
def get_document_collection(offset=0, limit=10):
    return DocumentCollection(offset, limit)
