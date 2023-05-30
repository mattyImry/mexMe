import React, { useEffect, useState } from "react";

import { loadTweets } from "../lookup/components";

export function TweetComponent(props) {
    const textAreaRef = React.createRef();
    const [newTweets, setNewTweets] = useState([]);

    const handleSubmit = (event) => {
        event.preventDefault();
        const newValue = textAreaRef.current.value;
        let tempNewTweets = [...newTweets];
        tempNewTweets.unshift({
            content: newValue,
            likes: 0,
            id: 12313,
        });
        setNewTweets(tempNewTweets);
        textAreaRef.current.value = "";
    };

    return (
        <div className={props.className}>
            <div className="col-12 mb-3">
                <form onSubmit={handleSubmit}>
                    <textarea
                        ref={textAreaRef}
                        required={true}
                        className="form-control"
                        name="tweet"
                    ></textarea>
                    <button type="submit" className="btn btn-primary my-3">
                        Tweet
                    </button>
                </form>
            </div>
            <TweetsList newTweets={newTweets} />
        </div>
    );
}

export function TweetsList(props) {
    const [tweetsInit, setTweetsInit] = useState([]);
    const [tweets, setTweets] = useState([]);

    useEffect(() => {
        let final = [...props.newTweets].concat(tweetsInit);
        if (final.length !== tweets.length) {
            setTweets(final);
        }
    }, [props.newTweets, tweetsInit, tweets]);

    useEffect(() => {
        const myCallback = (response, status) => {
            if (status === 200) {
                setTweetsInit(response);
            } else {
                alert("there was en error");
            }
        };
        loadTweets(myCallback);
    }, [tweetsInit]);

    return tweets.map((item, index) => {
        return (
            <Tweet
                tweet={item}
                key={`${index}-{item.id}`}
                className="my-5 py-5 bg-white text-dark"
            />
        );
    });
}

export function ActionBtn(props) {
    const { tweet, action } = props;
    const [likes, setLikes] = useState(tweet.likes ? tweet.likes : 0);
    const [userLike, setUserLike] = useState(tweet.userLike === true ? true : false);
    const className = props.className ? props.className : "btn btn-primary btn-sm";
    const actionDisplay = action.display ? action.display : "Action";
    const display = action.type === "like" ? `${likes} ${actionDisplay}` : actionDisplay;

    const handleClick = (event) => {
        event.preventDefault();
        if (action.type === "like") {
            if (userLike === true) {
                setLikes(likes - 1);
                setUserLike(false);
            } else {
                setLikes(likes + 1);
                setUserLike(true);
            }
        }
    };
    return (
        <button className={className} onClick={handleClick}>
            {display}
        </button>
    );
}

export function Tweet(props) {
    const { tweet } = props;
    const className = props.className ? props.className : "col-10 mx-auto col-md-6";
    return (
        <div className={className}>
            <p>
                {tweet.id} - {tweet.content};
            </p>

            <div>
                <ActionBtn tweet={tweet} action={{ type: "like", display: "Likes" }} />
                <ActionBtn
                    tweet={tweet}
                    action={{ type: "unlike", display: "Unlikes" }}
                />
                <ActionBtn
                    tweet={tweet}
                    action={{ type: "retweet", display: "Retweet" }}
                />
            </div>
        </div>
    );
}
