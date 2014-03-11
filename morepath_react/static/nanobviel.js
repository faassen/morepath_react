"use strict";

var Nanobviel = {};

(function() {

    // Nano-Obviel for React
    // this implements a special Render component that can render an object
    // or a URL
    var registry = {};

    Nanobviel.Render = React.createClass({
        getInitialState: function() {
            return {iface: null};
        },
        componentWillMount: function() {
            if (this.props.url !== undefined) {
                $.getJSON(this.props.url).done(function(data) {
                    this.setState(data);
                }.bind(this));
            } else if (this.props.obj !== undefined) {
                this.setState(this.props.obj);
            }
        },
        render: function() {
            var iface = this.state.iface;
            var klass = registry[iface];
            if (klass === undefined) {
                // XXX having to return a div here is annoying
                return React.DOM.div();
            }
            return klass(this.state);
        }
    });


    // may want to have a render variety where we specify the
    // iface (or component to use?) directly with the result from the URL

    Nanobviel.view = function(info) {
        // can possibly get iface from callee, see:
        // https://github.com/facebook/react/commit/f0fdabae7bbeadde9245d00893b194e0310c8d9b
        // for how React does it
        info.displayName = info.iface;
        var klass = React.createClass(info);
        registry[info.iface] = klass;
        return klass;
    };


}());
