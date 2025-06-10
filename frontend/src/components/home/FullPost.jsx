import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';

function FullPost() {
    const post = {
        heading: "heading",
        author: 'Sid',
        publishedDate: '09-08-2024',
        imageUrl: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg'

    };

    return (
        <div className="container" >

            <div className="m-3">
                <h2 className="card-title">{post.heading}</h2>
                <div className="d-flex justify-content-between">
                    <p className="card-title">{post.author}</p>
                    <p className="card-title">{post.publishedDate}</p>
                </div>
                <img src={post.imageUrl} className="card-img-top m-4" alt="..." />
                <div className="card-body">
                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card’s content.</p>
                </div>
            </div>

            <div className='mx-3'>
                
                <span><FontAwesomeIcon icon={faThumbsUp} /> {0}</span>
                <span style={{ marginLeft: '1rem' }}><FontAwesomeIcon icon={faThumbsDown} /> {0}</span>
            </div>
            <div className="card m-3" >
                <div className="card-body ">
                    <form>
                        <div className="mb-3">
                            <label htmlFor="comment" className="form-label"><strong>Comment</strong></label>
                            <input type="text" className="form-control" id="comment" />
                        </div>
                        <button type="submit" className="btn btn-dark">Submit</button>
                    </form>
                </div>
            </div>

        </div>
    )
}

export default FullPost
