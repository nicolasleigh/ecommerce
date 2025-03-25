import Carousel from "react-multi-carousel";
import { Link } from "react-router-dom";
import "react-multi-carousel/lib/styles.css";

export default function Banner() {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 1,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  const bannerImage = [
    {
      src: "/images/banner/1.webp",
      to: "/products?category=food",
    },
    {
      src: "/images/banner/2.webp",
      to: "/products?category=puppy",
    },
    {
      src: "/images/banner/3.webp",
      to: "/products?category=kitten",
    },
    {
      src: "/images/banner/4.webp",
      to: "/products?category=food",
    },
    {
      src: "/images/banner/5.webp",
      to: "/products?category=food",
    },
    {
      src: "/images/banner/6.webp",
      to: "/products?category=hamster",
    },
  ];

  return (
    <div className='w-full md-lg:mt-6'>
      <div className='w-[85%] lg:w-[90%] mx-auto'>
        <div className='w-full flex flex-wrap md-lg:gap-8'>
          <div className='w-full'>
            <div className='my-8'>
              <Carousel
                autoPlay={true}
                infinite={true}
                arrows={true}
                showDots={true}
                responsive={responsive}
                removeArrowOnDeviceType={["tablet", "mobile"]}
              >
                {bannerImage.map((item, i) => (
                  <Link key={i} to={item.to}>
                    <img className='h-[570px] w-full ' src={item.src} alt='banner images' />
                  </Link>
                ))}
              </Carousel>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
