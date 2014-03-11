/** @jsx React.DOM */

var DocumentCollection = React.createClass({
    render: function() {
        return (
            <p>Hello world!</p>
        );
    }
});

$(document).ready(function() {
    React.renderComponent(
        <DocumentCollection />,
        document.getElementById('main'));
});
