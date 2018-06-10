import React, { Component, createElement} from 'react';
import { socketResponse } from '../actions/SocketAction'
import createSocket, { Sockette } from "sockette-component";
import { connect } from 'react-redux';

const Socket = createSocket({
  Component,
  createElement
});

class SocketContainer extends Component {
    // Socket internal state
    state = {
        speech: null,
        endpoint: null,
        socket: null
    }

    componentDidUpdate() {
        if (this.props.text != "" && this.props.isRecording == false) {
            this.sendMessage();
        }
    }

    onOpen = ev => {
        console.log("> Connected!", ev);
    };

    onMessage = ev => {
        console.log("> Received:", ev.data);
        this.props.socketResponse(ev.data)
        //TODO: dispatch action with this ev.data
        
    };

    onReconnect = ev => {
        console.log("> Reconnecting...", ev);
    };

    sendMessage = _ => {
        // WebSocket available in state!
        const request = { "speech": this.props.text, "endpoint": "https://hap2a5df4m.execute-api.us-east-1.amazonaws.com/dev/ping", "state": { "directory": "home" } }
        console.log("VoiceButton this.state: ", this.state)
        console.log("ws: ", this.state.socket.send(JSON.stringify(request)))
    };

    setSocket = socket => {
        if (this.state.socket == null) {
            this.setState({socket: socket});
        }
    }

    render() {
        return(   
            <div>
                {
                    this.state.speech != null && 
                    <div>
                    <p>Websocket result: </p> <strong>{this.state.speech}</strong>
                    </div>
                }
                <Socket
                url='ws://secure-lowlands-10237.herokuapp.com/websocket/'
                // url="ws://localhost:8080/websocket/"
                getSocket={socket => { this.setSocket(socket) }}
                maxAttempts={2}
                onopen={this.onOpen}
                onmessage={this.onMessage}
                onreconnect={this.onReconnect}
                />
            </div>
        )
    }
}

const mapStateToProps = state => ({
    ...state.voiceReducer
})

const mapDispatchToProps = dispatch => ({
    socketResponse: (response) => dispatch(socketResponse(response))
})

export default connect(mapStateToProps, mapDispatchToProps)(SocketContainer)
