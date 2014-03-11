/** @jsx React.DOM */
"use strict";
(function() {

    var registry = {};

    var Render = React.createClass({
        getInitialState: function() {
            return {iface: null};
        },
        componentWillMount: function() {
            if (this.props.url !== undefined) {
                $.getJSON(this.props.url).done(function(data) {
                    this.setState(data);
                }.bind(this));
            } else if (this.props.obj !== undefined) {
                this.setState(obj);
            }
        },
        render: function() {
            var iface = this.state.iface;
            var klass = registry[iface];
            if (klass === undefined) {
                return <div />;
            }
            return klass(this.state);
        }
    });

    var view = function(info) {
        var klass = React.createClass(info);
        registry[info.iface] = klass;
        return klass;
    };

    // var DocumentCollection = view({
    //     iface: 'DocumentCollection',
    //     getInitialState: function() {
    //         return { documents: [],
    //                  previous: null,
    //                  next: null,
    //                  add: null };
    //     },
    //     componentWillMount: function() {
    //         $.getJSON(this.props.url).done(function(data) {
    //             this.setState(data);
    //         }.bind(this));
    //     },
    //     render: function() {
    //         var items = this.state.documents.map(function(document) {
    //             return <li key={document.id}>{document.title}</li>;
    //         });
    //         return (
    //                 <ul>
    //                 {items}
    //             </ul>
    //         );
    //     }
    // });

    var DocumentCollection = view({
        iface: 'DocumentCollection',
        render: function() {
            var items = this.props.documents.map(function(document) {
                return <li key={document.id}>{document.title}</li>;
            });
            return (
                    <ul>
                    {items}
                </ul>
            );
        }
    });

    var Info = view({
        iface: 'Info',
        render: function() {
            return <Render url={this.props.document_collection} />;
        }
    });

    $(document).ready(function() {
        React.renderComponent(Render({url:'info'}),
                              document.getElementById('main'));


        // var promise = $.getJSON('info');
        // promise.done(function(data) {
        //     var document_collection = data.document_collection;
        //     React.renderComponent(
        //             <DocumentCollection url={document_collection} />,
        //         document.getElementById('main'));
        // });
    });

}());
