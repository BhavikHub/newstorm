import React, { useEffect, useState } from "react";
import Newsitem from "./Newsitem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const updateNews = async () => {
    props.setProgress(0);
    let url = `https://newsapi.org/v2/top-headlines?country=us&category=${props.category}&apiKey=bb3e5561f9be49da860f83589bebdfbd&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true);
    props.setProgress(20);
    let data = await fetch(url);
    props.setProgress(50);
    let parsedData = await data.json();
    props.setProgress(70);
    setArticles(parsedData.articles);
    setTotalResults(parsedData.totalResults);
    setLoading(false);
    props.setProgress(100);
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };  

  useEffect( () => {
    document.title =`${capitalizeFirstLetter(props.category)} - NewsStorm`
    updateNews();
    // eslint-disable-next-line
  }, []); 
  const fetchMoreData = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=us&category=${props.category}&apiKey=bb3e5561f9be49da860f83589bebdfbd&page=${page+1}&pageSize=${props.pageSize}`;
    setPage(page + 1);
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(articles.concat(parsedData.articles));
    setTotalResults(parsedData.totalResults);
  };

  return (
    <>
      <h1 className="text-center" style={{ marginTop: "80px" }}>
        {" "}
        NewsStorm - Top {capitalizeFirstLetter(props.category)} Headlines {" "}
      </h1>
      {loading && <Spinner />}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<Spinner />}
      >
        <div className="container">
          <div className="row my-3">
            {articles.map((element, index) => {
              return (
                <div
                  className="col-md-4 my-3"
                  key={element.url ? element.url + index : index}
                >
                  <Newsitem
                    title={
                      element.title
                        ? element.title.slice(0, 45)
                        : "No Title Available"
                    }
                    description={
                      element.description
                        ? element.description.slice(0, 88)
                        : "No Description Available"
                    }
                    imgUrl={
                      element.urlToImage
                        ? element.urlToImage
                        : "https://media-cldnry.s-nbcnews.com/image/upload/t_nbcnews-fp-1200-630,f_auto,q_auto:best/rockcms/2024-06/240620-paris-police-mb-0932-1893a2.jpg"
                    }
                    newsUrl={element.url}
                    timing={element.publishedAt}
                    author={element.author}
                    source={element.source.name}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </InfiniteScroll>
    </>
  );
};

News.defaultProps = {
  category: "general",
  pageSize: 12,
};
News.propTypes = {
  category: PropTypes.string,
  pageSize: PropTypes.number,
};
export default News;
