from fanstatic import Library, Resource

static = Library('static', 'static')

react = Resource(static, 'react.js')

jsx_transformer = Resource(static, 'jsx-transformer.js')

main = Resource(static, 'main.js', depends=[react, jsx_transformer])


