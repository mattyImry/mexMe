import React from "react";

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
  