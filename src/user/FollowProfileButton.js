import React, { Component } from "react";
import { follow, unfollow, addChildren } from "./apiUser";

class FollowProfileButton extends Component {
    followClick = () => {
        this.props.onButtonClick(follow);
    };

    unfollowClick = () => {
        this.props.onButtonClick(unfollow);
    };

    addChildren = () => {
        this.props.onButtonClick(addChildren);
    }

    render() {
        return (
            <div className="d-inline-block">
                {!this.props.following ? (
                    <button
                        onClick={this.followClick}
                        className="btn btn-success btn-raised mr-5"
                    >
                        Add as friend
                    </button>
                ) : (
                        <button
                            onClick={this.unfollowClick}
                            className="btn btn-warning btn-raised"
                        >
                            UnFriend
                    </button>
                    )}
                {this.props.parent && !this.props.parent.length ? <button
                    onClick={this.addChildren}
                    className="btn btn-success btn-raised mr-5"
                >
                    Add as Child
                    </button> : null}

            </div>
        );
    }
}

export default FollowProfileButton;
