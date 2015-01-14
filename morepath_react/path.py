from .main import App, Session
from .model import Document, Root
from .collection import DocumentCollection


@App.path(model=Root, path='/')
def get_root():
    return Root()


@App.path(model=Document, path='documents/{id}',
          converters={'id': int})
def get_document(id):
    session = Session()
    return session.query(Document).filter(Document.id == id).first()


@App.path(model=DocumentCollection, path='documents')
def get_document_collection(offset=0, limit=10):
    return DocumentCollection(offset, limit)
