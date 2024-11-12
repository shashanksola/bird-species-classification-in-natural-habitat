export default function Card(props) {

    const url = `https://bird-species.s3.ap-south-1.amazonaws.com/_website_images/b${props.num}.jpg`;
    return (
        <div className={`bg-[url('${url}')] bg-cover text-white rounded-xl h-[300px] w-[450px]`}>
            <div className='p-4 rounded-xl opacity-0 group-hover:opacity-100' >
                <h1>Bird</h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos vel aliquid accusamus esse modi obcaecati!</p>
            </div>
        </div>
    )
}