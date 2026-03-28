"use client"
import Image from "next/image";
import BannerSection from "./home-page-components/BannerSection";
import Collections from "./home-page-components/Collections";
import BestsellingProductsSection from "./home-page-components/BestsellingProductsSection";
import NewsletterSection from "./home-page-components/Newsletter";
import BenefitsOfWebsites from "./home-page-components/BenefitsOfWebsites";
import CustomerReview from "./home-page-components/CustomerReview";
import Collection from "./home-page-components/Collection";
import ThreeSections from "./home-page-components/ThreeSections";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {

  let apiBaseUrl = process.env.NEXT_PUBLIC_APIBASEURL
  let [sliderDataList, setSliderDataList] = useState([])
  let [sliderStaticPath, setSliderStaticPath] = useState("")
  let [threeSectionDataList, setThreeSectionDataList] = useState([])
  let [threeSectionStaticPath, setThreeSectionStaticPath] = useState("")
  let [bestSellingList, setBestSellingList] = useState([])
  let [bestSellingImagePath, setBestSellingImagePath] = useState("")
  let [productType, setProductType] = useState(1)

  let getSliderWebView = ()=>{
    axios.get(`${apiBaseUrl}home/slider`).then((res)=>res.data).then((finalRes)=>{
      setSliderDataList(finalRes.sliderRes)
      // console.log(finalRes.sliderRes)
      setSliderStaticPath(finalRes.staticImagePath)
    })
  }

  let getThreeSection = ()=>{
    axios.get(`${apiBaseUrl}home/threeSections`,{
      params: {
        productType 
      }
    }).then((res)=>res.data).then((finalRes)=>{
      setThreeSectionDataList(finalRes.sectionRes)
      setThreeSectionStaticPath(finalRes.staticImagePath)
    })
  }

  let getBestSellingProducts = ()=>{
    axios.get(`${apiBaseUrl}home/bestSelling`).then((res)=>res.data).then((finalRes)=>{
      // console.log(finalRes.bestSellingRes)
      setBestSellingList(finalRes.bestSellingRes)
      setBestSellingImagePath(finalRes.productImagePath)
    })
  }

  useEffect(()=>{
    getSliderWebView()
    getBestSellingProducts()
  },[])

  useEffect(()=>{
    getThreeSection()
  },[productType])

  return (
    <>
      <BannerSection sliderDataList={sliderDataList} sliderStaticPath={sliderStaticPath} />
      <Collections />
      <ThreeSections threeSectionDataList={threeSectionDataList} threeSectionStaticPath={threeSectionStaticPath} productType={productType} setProductType={setProductType}/>
      <Collection/>
      <BestsellingProductsSection bestSellingList={bestSellingList} bestSellingImagePath={bestSellingImagePath} />
      <BenefitsOfWebsites/>
      <CustomerReview/>
      <NewsletterSection/>
    </>
  );
}
