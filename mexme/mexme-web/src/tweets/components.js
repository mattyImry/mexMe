import React, {useEffect, useState} from "react";

import { loadTweets } from "../components";
  export function TweetsList(props){
    const [tweets, setTweets] = useState([]);
  
    useEffect(() => {
      const myCallback = (response, status) =>{
        if(status === 200){
          setTweets(response)  
        }else{
          alert('there was en error');
        }
      }
      loadTweets(myCallback)
    }, [])
  
    return (tweets.map((item, index)=>{
       <Tweet tweet={item} key={`${index}-{item.id}`} className='my-5 py-5 bg-white text-dark'/>
    }))
  }
export function Tweet(props){
    const {tweet} = props
    const className = props.className ? props.className : 'col-10 mx-auto col-md-6'
    return <div className={className}>
            <p>
              {tweet.id} - {tweet.content}
            </p>
  
            <div> 
              <ActionBtn tweet={tweet} action={{type:'like'}} />
            </div>
    </div>
  }
  
export function ActionBtn(props){
    const {tweet, action} = props
    const className = props.className ? props.className : 'btn btn-primary btn-sm'
    return action.type === 'like' ? <button className={className}>{tweet.likes} Likes </button> : null
  
  };
  