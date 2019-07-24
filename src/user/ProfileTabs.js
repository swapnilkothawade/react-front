import React, { Component } from "react";
import { Link } from "react-router-dom";
import DefaultProfile from "../images/avatar.jpg";
import { follow, unfollow, addChildren } from "./apiUser";
import { isAuthenticated } from "../auth";

class ProfileTabs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isParent: false
        }
        this.checkParent = this.checkParent.bind(this);
    }

    checkParent() {
        const { userId, parent } = this.props;
        for (let i in parent) {
            if (userId === parent[i]) {
                this.setState({ isParent: true });
                break;
            }
        }
    }

    clickFollowButton = (callApi, id) => {
        const { currentUserProfile } = this.props;
        const token = isAuthenticated().token;

        callApi(currentUserProfile, token, id).then(data => {
            if (data.error) {
                this.setState({ error: data.error });
            } else {
                this.setState({ user: data, following: !this.state.following });
                window.location.reload(true)
            }
        });
    };

    unfollowClick(id) {
        this.clickFollowButton(unfollow, id);
    };
    render() {
        const { following, followers, children, userId, parent } = this.props;
        return (
            <div>
                <div className="row">
                    {/* <div className="col-md-4">
                        <h3 className="text-primary">
                            {followers.length} Followers
                        </h3>
                        <hr />
                        {followers.map((person, i) => (
                            <div key={i}>
                                <div>
                                    <Link to={`/user/${person._id}`}>
                                        <img
                                            style={{
                                                borderRadius: "50%",
                                                border: "1px solid black"
                                            }}
                                            className="float-left mr-2"
                                            height="30px"
                                            width="30px"
                                            onError={i =>
                                                (i.target.src = `${DefaultProfile}`)
                                            }
                                            src={`${
                                                process.env.REACT_APP_API_URL
                                                }/user/photo/${person._id}`}
                                            alt={person.name}
                                        />
                                        <div>
                                            <p className="lead">
                                                {person.name}
                                            </p>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div> */}

                    <div className="col-md-8">
                        <h3 className="text-primary">
                            {following.length} Friends
                        </h3>
                        <hr />
                        {following.map((person, i) => (
                            <div className="row" key={i}>
                                <div className="col-md-8">
                                    <Link to={`/user/${person._id}`}>
                                        <img
                                            style={{
                                                borderRadius: "50%",
                                                border: "1px solid black"
                                            }}
                                            className="float-left mr-2"
                                            height="30px"
                                            width="30px"
                                            onError={i =>
                                                (i.target.src = `${DefaultProfile}`)
                                            }
                                            src={`${
                                                process.env.REACT_APP_API_URL
                                                }/user/photo/${person._id}`}
                                            alt={person.name}
                                        />
                                        <div>
                                            <p className="lead">
                                                {person.name}
                                            </p>
                                        </div>
                                    </Link>
                                </div>
                                <div className="col-md-4">{this.checkParent ? <span onClick={() => this.unfollowClick(person._id)}>Unfriend</span> : null}</div>
                            </div>
                        ))}
                    </div>

                    {this.props.children ?
                        <div className="col-md-4">
                            <h3 className="text-primary">{children.length} Children</h3>
                            <hr />
                            {children.map((person, i) => (
                                <div key={i}>
                                    <div>
                                        <Link to={`/user/${person}`}>
                                            <img
                                                style={{
                                                    borderRadius: "50%",
                                                    border: "1px solid black"
                                                }}
                                                className="float-left mr-2"
                                                height="30px"
                                                width="30px"
                                                onError={i =>
                                                    (i.target.src = `${DefaultProfile}`)
                                                }
                                                src={`${
                                                    process.env.REACT_APP_API_URL
                                                    }/user/photo/${person}`}
                                                alt={person.name}
                                            />
                                            <div>
                                                <p className="lead">
                                                    {person.name}
                                                </p>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div> : null}
                </div>
            </div>
        );
    }
}

export default ProfileTabs;
