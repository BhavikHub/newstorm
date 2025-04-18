import React from 'react'

const Newsitem = ({ title, description, imgUrl, newsUrl, author, timing, source }) => {
  return (
    <div className="card h-100">
      <img src={imgUrl} className="card-img-top" alt="news" style={{ height: "200px", objectFit: "cover" }} />
      <div className="card-body d-flex flex-column ">
        <h5 className="card-title">{title}</h5>
        <p className="card-text flex-grow-1">{description.length > 100 ? description.substring(0, 100) + "..." : description}</p>
        <span className="badge text-bg-danger" style={{width:"150px"}}>{source}</span>
        <p className="card-text"><small className="text-body-secondary">By {!author?"unknown": author} on {new Date(timing).toGMTString()}</small></p>
        <a href={newsUrl} target='blank' className="btn btn-dark btn-sm">Read More</a>
      </div>
    </div>
  )
}

export default Newsitem