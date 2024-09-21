export default function Card(props) {
    const { bird } = props;
    console.log(bird.birdName)

    return (
        <div className="card d-inline-block m-3" style={{ width: '20rem' }}>
            <img src="https://t4.ftcdn.net/jpg/01/77/47/67/360_F_177476718_VWfYMWCzK32bfPI308wZljGHvAUYSJcn.jpg" className="card-img-top" alt={`${bird.birdName}`} />
            <div className="card-body">
                <h5 className="card-title">{bird.birdName}</h5>
                <p className="card-text">{bird.birdShortDescription}</p>
                <a href={bird.birdWikipediaPageUrl} className="btn btn-primary">More about me</a>
            </div>
        </div>
    )
}