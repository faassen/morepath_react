from fanstatic import Library, Resource

static = Library('static', 'static')

react = Resource(static, 'react.js')

main = Resource(static, 'main.js', depends=[react])

