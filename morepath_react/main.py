import morepath
import sqlalchemy
from more.transaction import TransactionApp
from sqlalchemy.orm import scoped_session, sessionmaker
from zope.sqlalchemy import register
from fanstatic import Fanstatic
import waitress

from .model import Base

Session = scoped_session(sessionmaker())
register(Session)


class App(TransactionApp):
    pass


def main():
    engine = sqlalchemy.create_engine('sqlite:///morepath_react.db')
    Session.configure(bind=engine)
    Base.metadata.create_all(engine)
    Base.metadata.bind = engine

    morepath.autosetup()
    fanstatic_app = Fanstatic(App(), versioning=True)
    waitress.serve(fanstatic_app)
