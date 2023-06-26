import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Header from "./Header";
function Home() {

    const [data, setData] = useState([]);
    const navigate = useNavigate();

    const [search, setSearch] = useState('Apple');
    const [text, setText] = useState('');

    const newapi_key = "c8674fc661b74e738a12d6fdc73bd325";

    useEffect(() => {
        if (!localStorage.getItem('user-info')) {
            navigate('/login');
        }

        fetch(`https://newsapi.org/v2/everything?q=${search}&from=2023-06-10&sortBy=popularity&apiKey=${newapi_key}`)
            .then((res) => res.json())
            .then((resp) => {
                setData(resp.articles);
                console.log(resp);
            });


    }, [search]);
    function redirectHandler(data) {
        navigate({
            pathname: `/posts/${data.title}`,
            data: data.article
        })
    }


    return (
        <>
            <Header />
            <div className="container">
                <div className="row mt-4">
                    {/* <div className="col-lg-4 mb-4">
                        <label style={{ float: "left" }}>Date Range</label>
                        <div className="input-group">
                            <input className="form-control" type="date" placeholder="Enter search term..." aria-label="Enter search term..." aria-describedby="button-search" />
                        </div>
                    </div> */}
                    <div className="col-lg-12 mb-4">
                    {/* <label style={{float: "left"}}>Search Keyword</label> */}
                        <div className="input-group">
                            <input className="form-control" type="text" placeholder="Enter search term..." aria-label="Enter search term..." aria-describedby="button-search" onChange={(e) => setSearch(e.target.value)} value={search} />
                        </div>
                    </div>
                    <div className="col-lg-12">
                        <div className="row">
                            {
                                data && data.slice(0, 21).map((item) => {
                                    return <div className="col-lg-4">

                                        <div className="card mb-4">
                                            <a href="#!"><img className="card-img-top" src={item.urlToImage} alt="..." height="200px" /></a>
                                            <div className="card-body">

                                                <div className="clearfix">
                                                    <div className="small text-muted float-start">Author: {
                                                        item.author && item.author
                                                    }</div>
                                                    <div className="small text-muted float-end">{new Date(item.publishedAt).toLocaleDateString('en-US', {
                                                        month: "long",
                                                        day: "2-digit",
                                                        year: "numeric"
                                                    })}</div>
                                                </div>

                                                <div className="mt-2">
                                                    <h2 className="card-title h4">{item.title.slice(0, 25) + '...'}</h2>
                                                    <p className="card-text">{item.description.slice(0, 65) + '...'}</p>
                                                    {/* <button className="btn btn-primary" onClick={() => redirectHandler(item)}>Read More</button> */}

                                                </div>



                                            </div>
                                        </div>
                                    </div>
                                })
                            }

                        </div>
                        {/* <nav aria-label="Pagination">
                            <hr className="my-0" />
                            <ul className="pagination justify-content-center my-4">
                                <li className="page-item disabled"><a className="page-link" href="#" tabindex="-1" aria-disabled="true">Newer</a></li>
                                <li className="page-item active" aria-current="page"><a className="page-link" href="#!">1</a></li>
                                <li className="page-item"><a className="page-link" href="#!">2</a></li>
                                <li className="page-item"><a className="page-link" href="#!">3</a></li>
                                <li className="page-item disabled"><a className="page-link" href="#!">...</a></li>
                                <li className="page-item"><a className="page-link" href="#!">15</a></li>
                                <li className="page-item"><a className="page-link" href="#!">Older</a></li>
                            </ul>
                        </nav> */}
                    </div>

                </div>
            </div>

            <footer className="py-5 bg-dark">
                <div className="container"><p className="m-0 text-center text-white">Copyright &copy; Your Website 2023</p></div>
            </footer>
        </>
    );
}

export default Home;