import {Helmet} from "react-helmet";

const TitleSection = ({pageName}) => {
    return (
        <div>
            <Helmet>
                <meta charSet="utf-8" />
                <title>{pageName}</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
        </div>
    );
};

export default TitleSection;