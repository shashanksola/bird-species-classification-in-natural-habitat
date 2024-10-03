export default function Card(props) {
    const { bird } = props;

    return (
        <div className="md:w-1/4 m-3 rounded-md border border-black">
            <img src="https://t4.ftcdn.net/jpg/01/77/47/67/360_F_177476718_VWfYMWCzK32bfPI308wZljGHvAUYSJcn.jpg" className="card-img-top" alt={`${bird.birdName}`} />
            <div className="p-4 flex flex-col justify-between items-stretch">
                <h5 className="text-2xl">{bird.birdName}</h5>
                <p className="text-sm">{bird.birdShortDescription}</p>
                <button href={bird.birdWikipediaPageUrl} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">More about me</button>
            </div>
        </div>
    )
}