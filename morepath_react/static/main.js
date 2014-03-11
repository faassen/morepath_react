/** @jsx React.DOM */
"use strict";

var DocumentCollection = React.createClass({
    getInitialState: function() {
        return { documents: [],
                 previous: null,
                 next: null,
                 add: null };
    },
    componentWillMount: function() {
        $.getJSON(this.props.url).done(function(data) {
            this.setState(data);
        }.bind(this));
    },
    render: function() {
        var items = this.state.documents.map(function(document) {
            return <li>{document.title}</li>;
        });
        return (
            <ul>
              {items}
            </ul>
        );
    }
});

$(document).ready(function() {
    var promise = $.getJSON('info');
    promise.done(function(data) {
        var document_collection = data.document_collection;
        React.renderComponent(
                <DocumentCollection url={document_collection} />,
            document.getElementById('main'));
    });
});
