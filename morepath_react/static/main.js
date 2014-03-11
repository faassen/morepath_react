/** @jsx React.DOM */
"use strict";
(function() {
    var Render = Nanobviel.Render;

    var Document = Nanobviel.view({
        iface: 'Document',
        render: function() {
           return <li>{this.props.title}</li>;
        }
    });

    var DocumentAdd = React.createClass({
        getInitialState: function() {
            return {title: '',
                    content: ''};
        },
        handleTitleChange: function(event) {
            this.setState({title: event.target.value});
        },
        handleContentChange: function(event) {
            this.setState({content: event.target.value});
        },
        handleSubmit: function(event) {
            this.props.handleSubmit(this.state);
        },
        render: function() {
            return (
              <form>
                <input type="text" value={this.state.title}
                  onChange={this.handleTitleChange} />
                <input type="text" value={this.state.content}
                  onChange={this.handleContentChange} />
                <input type="button" value="Submit"
                  onClick={this.handleSubmit} />
            </form>);
        }
    });

    var DocumentCollection = Nanobviel.view({
        iface: 'DocumentCollection',
        // initialize the state from the props, perhaps a micro
        // obviel pattern
        getInitialState: function() {
            return this.props;
        },
        handleSubmit: function(data) {
            $.ajax({
                url: this.state.add,
                contentType: 'application/json',
                dataType: 'json',
                type: 'POST',
                processData: false,
                data: JSON.stringify(data)
            }).done(function(data) {
                this.setState(data);
            }.bind(this));
        },
        render: function() {
            var items = this.state.documents.map(function(document) {
                return <Render key={document.id} obj={document} />
            });
            return (
                 <div>
                    <ul>
                      {items}
                    </ul>
                    <DocumentAdd handleSubmit={this.handleSubmit} />
                 </div>
            );
        }
    });

    var Info = Nanobviel.view({
        iface: 'Info',
        render: function() {
            return <Render url={this.props.document_collection} />;
        }
    });

    $(document).ready(function() {
        React.renderComponent(Nanobviel.Render({url:'info'}),
                              document.getElementById('main'));
    });

}());
