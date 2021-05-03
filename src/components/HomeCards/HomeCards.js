import Card from "./Card";

const HomeCards = () => {
    const cards = new Array(4).fill('').map((_, index) => {
        return <Card key={index}/>
    })
    return (
        <section className={'content'}>
            <div className={'container'}>
                <h1>OUR PRODUCTS</h1>
                <div className={'content-cards'}>
                    {cards}
                </div>
            </div>
        </section>
    )
}

export default HomeCards