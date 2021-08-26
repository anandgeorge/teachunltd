import React from 'react'


const Thread = ({ thread }) => {
  return (
    <>
        <span style={{'letterSpacing':'0px', 'wordWrap':'break-word'}} dangerouslySetInnerHTML={{__html: thread.text.replace(/\n/g, '</br>')}}></span>
        <span style={{'color':'blue', 'fontSize':'12px'}}> ({thread.text.length} characters)</span>
    </>
  )
}

export default Thread