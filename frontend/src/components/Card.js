export default function Card(props) {
    const { bird } = props;
    console.log(bird.birdName)

    return (
        <li className="card" key={bird.birdName}>
            <img src="https://t4.ftcdn.net/jpg/01/77/47/67/360_F_177476718_VWfYMWCzK32bfPI308wZljGHvAUYSJcn.jpg" alt={bird.birdName} className="bird-img" />
            <p>{bird.birdName}</p>
        </li>
    )
}