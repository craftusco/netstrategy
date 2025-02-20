import React, {useState, useEffect} from "react";
import CardsStatic from "./CardsStatic";
import CardsSlider from "./CardsSlider";

export default function Cards({ data: images, labels = [],mt }) {
    if(!images)
      return (
        <></>
      )
    const [windowWidth, setWindowWidth] = useState(null);
    useEffect(() => {
      const handleResize = () => {
          setWindowWidth(window.innerWidth);
      };

      window.addEventListener('resize', handleResize);
      setWindowWidth(window.innerWidth);

      return () => {
          window.removeEventListener('resize', handleResize);
      };
    }, []);
    return(
      <>
      {windowWidth <= 820 ? 
        <CardsSlider 
          data={images} 
          labels={labels} 
          mt="4rem" 
        />
      :
        <CardsStatic 
          data={images} 
          labels={labels} 
          mt="4rem"
        />
        }
      </>
      )
}

