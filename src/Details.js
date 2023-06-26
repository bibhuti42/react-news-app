import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "./Header";

function Details() {
    const [data,setData] = useState([])
    const [filterdata,setFilterData] = useState({})
    const params = useParams();
    const navigate = useNavigate();
    const newapi_key = "c8674fc661b74e738a12d6fdc73bd325";
    useEffect(() => {
        if (!localStorage.getItem('user-info')) {
            navigate('/login');
        }

        fetch(`https://newsapi.org/v2/everything?q=Apple&from=2023-06-10&sortBy=popularity&apiKey=${newapi_key}`)
            .then((res) => res.json())
            .then((resp) => {
                setData(resp.articles);
                console.log(resp);
            });

    }, []);
    useEffect(() => {
        if(data.length > 0) {
            const newfilterdata = data.find(item => item.title == params.title);
            setFilterData(newfilterdata)
        }
    },[data])

    return (
        <>
            <Header />
            <div class="container mt-5">
                <div class="row">
                    <div class="col-lg-8">
                        <article>
                            <header class="mb-4">
                                <h1 class="fw-bolder mb-1">{filterdata.title}</h1>
                                <div class="text-muted fst-italic mb-2">Posted on January 1, 2023 by Start Bootstrap</div>
                            </header>
                            <figure class="mb-4"><img class="img-fluid rounded" src={filterdata.urlToImage} alt="..." /></figure>
                            <section class="mb-5">
                                <p class="fs-5 mb-4">{ filterdata.description }</p>
                            </section>
                        </article>
                    </div>
                    <div class="col-lg-4">
                        <div class="card mb-4">
                            <div class="card-header">Search</div>
                            <div class="card-body">
                                <div class="input-group">
                                    <input class="form-control" type="text" placeholder="Enter search term..." aria-label="Enter search term..." aria-describedby="button-search" />
                                    <button class="btn btn-primary" id="button-search" type="button">Go!</button>
                                </div>
                            </div>
                        </div>
                        <div class="card mb-4">
                            <div class="card-header">Categories</div>
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-sm-6">
                                        <ul class="list-unstyled mb-0">
                                            <li><a href="#!">Web Design</a></li>
                                            <li><a href="#!">HTML</a></li>
                                            <li><a href="#!">Freebies</a></li>
                                        </ul>
                                    </div>
                                    <div class="col-sm-6">
                                        <ul class="list-unstyled mb-0">
                                            <li><a href="#!">JavaScript</a></li>
                                            <li><a href="#!">CSS</a></li>
                                            <li><a href="#!">Tutorials</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="card mb-4">
                            <div class="card-header">Side Widget</div>
                            <div class="card-body">You can put anything you want inside of these side widgets. They are easy to use, and feature the Bootstrap 5 card component!</div>
                        </div>
                    </div>
                </div>
            </div>
            <footer class="py-5 bg-dark">
                <div class="container"><p class="m-0 text-center text-white">Copyright &copy; Your Website 2023</p></div>
            </footer>
        </>
    );
}

export default Details;