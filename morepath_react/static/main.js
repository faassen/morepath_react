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
                this.setState(this.props.obj);
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


    // may want to have a render variety where we specify the
    // iface (or component to use?) directly with the result from the URL

    var view = function(info) {
        // can possibly get iface from callee, see:
        // https://github.com/facebook/react/commit/f0fdabae7bbeadde9245d00893b194e0310c8d9b
        // for how React does it
        info.displayName = info.iface;
        var klass = React.createClass(info);
        registry[info.iface] = klass;
        return klass;
    };

    var Document = view({
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

    var DocumentCollection = view({
        iface: 'DocumentCollection',
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
