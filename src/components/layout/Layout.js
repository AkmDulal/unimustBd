import HeaderComponents from "./Header";
import FooterComponents from "./Footer";

function Layout({children}) {
    return (
      <div className="App">
          <HeaderComponents />
           <main> {children} </main>
           <FooterComponents />
      </div>
    );
  }
  
  export default Layout;
  