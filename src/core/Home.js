import React, { Component } from "react";
import Posts from "../post/Posts";
import searchYoutube from 'youtube-api-v3-search';
import YouTube from 'react-youtube';

class Home extends Component {
    constructor() {
        super();
        this.state = {
            youtubePosts: [],
            user: {}
        };

    }

    callback = (error, result) => {
        console.log(result);
        if (result && result.items) {
            const youtubePosts = [...this.state.youtubePosts];
            result.items.forEach(element => {
                youtubePosts.push(element);
            });
            this.setState({ youtubePosts });
        }
    }

    componentDidMount() {
        const jwtData = localStorage.getItem('jwt');
        const user = jwtData ? JSON.parse(jwtData).user : {};

        if (user && user.about) {
            const interestArr = user.about.replace().split(",");
            const options = {
                q: '',
                part: 'snippet',
                type: 'video'
            }
            interestArr.forEach(element => {
                options.q = element.trim();
                searchYoutube("AIzaSyD3PUYc4SMtnoT-5u6_2MAkpoqVpgRj_sc", options, this.callback);
            });
        }
        this.setState({ user });
    }

    render() {
        const opts = {
            height: '390',
            width: '100%',
            playerVars: { // https://developers.google.com/youtube/player_parameters
                autoplay: 0
            }
        };
        return (
            <div>
                <div className="jumbotron">
                    <h2>Home</h2>
                    <p className="lead"></p>
                </div>
                {this.state.user.name ? <div className="container">
                    {this.state.youtubePosts.length && this.state.youtubePosts.map(post => {
                        return (
                            <div className="row" key={post.id.videoId}><div className="col-lg-8 col-sm-8 col-xs-8"><YouTube
                                videoId={post.id.videoId}
                                opts={opts}
                            /></div>
                                <div className="col-lg-4 col-sm-4 col-xs-4">{post.snippet.description}</div>
                            </div>
                        )
                    })}
                    <Posts />
                </div> : <div className="text-center text-danger"><h3>Please Sign In to continue</h3></div>}

            </div>)
    }
}

export default Home;
