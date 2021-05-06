import HomeTitle from "../components/HomeTitle/HomeTitle";
import HomeCards from "../components/HomeCards/HomeCards";

const HomePage = () => {
    return (
        <>
            <HomeTitle/>
            <HomeCards isLimited={true}/>
        </>
    )
}

export default HomePage