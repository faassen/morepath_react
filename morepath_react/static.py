from fanstatic import Library, Resource
from js.jquery import jquery

static = Library('static', 'static')

react = Resource(static, 'react.js')

jsx_transformer = Resource(static, 'jsx-transformer.js')

def jsx_renderer(url):
    return '<script type="text/jsx" src="%s"></script>' % url

main = Resource(static, 'main.js', depends=[react, jsx_transformer,
                                            jquery],
                renderer=jsx_renderer)
