import Banner from "../components/Banner";
import Category from "../components/Category";
import Header from "../components/Header";

export default function Home() {
  return (
    <div className='w-full'>
      <Header />
      <Banner />
      <Category />
    </div>
  );
}
