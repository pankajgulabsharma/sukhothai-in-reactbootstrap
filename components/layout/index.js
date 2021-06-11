import Header from "../header";
import Footer from "../footer";
// import Seo from "../seo";


function Layout({ children, pageProps }) {

    return (
        <div>
            {/* <Seo
                url={`${websiteURL}${url}`}
                websiteURL={websiteURL}
                pageTitle={mainPageData?.title || ""}
                {...mainPageData?.seo}
            /> */}
            <Header data={pageProps} />
            <div className="content-wrapper">
                {children}
            </div>
            <Footer />
        </div>
    );
}

export default Layout;
