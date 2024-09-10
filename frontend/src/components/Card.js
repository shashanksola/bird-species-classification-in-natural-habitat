export default function Card(props) {
    const { bird } = props;
    console.log(bird)

    return (
        <div className="card">
            <img src={bird.BirdImgUrl} alt={bird.BirdName} />
            <p>{bird.BirdName}</p>
        </div>
    )
}