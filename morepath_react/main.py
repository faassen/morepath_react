import morepath
import sqlalchemy
from more.transaction import TransactionApp
from more.static import StaticApp
from sqlalchemy.orm import scoped_session, sessionmaker
from zope.sqlalchemy import register
import waitress
import bowerstatic

from .model import Base

Session = scoped_session(sessionmaker())
register(Session)


class App(StaticApp, TransactionApp):
    pass


bower = bowerstatic.Bower()


components = bower.components(
    'components',
    bowerstatic.module_relative_path('bower_components'))


local = bower.local_components('local', components)


local.component(bowerstatic.module_relative_path('static'), version=None)


@App.static_components()
def get_static_components():
    return local


def main():
    engine = sqlalchemy.create_engine('sqlite:///morepath_react.db')
    Session.configure(bind=engine)
    Base.metadata.create_all(engine)
    Base.metadata.bind = engine

    morepath.autosetup()
    app = App()
    waitress.serve(app)
