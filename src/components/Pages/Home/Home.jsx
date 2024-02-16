import TitleSection from "../../../Hooks/TitleSection";
import HomeBanner from "./HomeDetails/HomeBanner";

const Home = () => {
    return (
        <div>
            <TitleSection pageName={'FinTask || Home'}></TitleSection>
            <HomeBanner/>
        </div>
    );
};

export default Home;