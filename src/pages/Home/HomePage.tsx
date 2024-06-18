import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import { ListProducts } from "../../components/ListProducts";

function HomePage() {
  return (
    <div>
      <Header/>
      <ListProducts/>
      <Footer/>
    </div>
  )
}

export default HomePage;