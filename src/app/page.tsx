"use client";
import Head from "next/head";
import { useState, useEffect } from "react";
import { ApiResponse, Data } from "@/types/product";
import TrailerPlayer from "@/components/TrailerPlayer";
import ProductHeader from "@/components/ProductHeader";
import TabItems from "@/components/common/TabItems";

async function fetchProductData(lang: string): Promise<Data> {
  try {
    const response = await fetch(
      `https://api.10minuteschool.com/discovery-service/api/v1/products/ielts-course?lang=${lang}`,
      {
        headers: {
          "X-TENMS-SOURCE-PLATFORM": "web",
          accept: "application/json",
        },
      }
    );
    if (!response.ok) throw new Error("API request failed");
    const apiResponse: ApiResponse = await response.json();
    return apiResponse.data;
  } catch (error) {
    console.error("Error fetching product data:", error);
    throw error;
  }
}

export default function Home() {
  const [lang, setLang] = useState<"en" | "bn">("en");
  const [productData, setProductData] = useState<Data | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        const data = await fetchProductData(lang);
        setProductData(data);
      } catch (error) {
        console.error("Error loading product data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, [lang]);

  const toggleLanguage = () => {
    setLang((prevLang) => (prevLang === "en" ? "bn" : "en"));
  };

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen justify-center items-center">
        Loading...
      </div>
    );
  }

  if (!productData) {
    return <div>Error loading product data</div>;
  }

  const seo = {
    title: productData.title,
    description:
      "IELTS Course by Munzereen Shahid - Prepare for Academic and General Training IELTS with expert guidance.",
    keywords: [
      "IELTS",
      "English",
      "Munzereen Shahid",
      "10MinuteSchool",
      "Language Course",
    ],
    og_title: productData.title,
    og_description:
      "Join the IELTS Course by Munzereen Shahid to achieve your desired band score!",
    og_image:
      productData.media.find((m) => m.resource_type === "image")
        ?.resource_value || "",
  };

  return (
    <>
      <Head>
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
        <meta name="keywords" content={seo.keywords.join(", ")} />
        <meta property="og:title" content={seo.og_title} />
        <meta property="og:description" content={seo.og_description} />
        <meta property="og:image" content={seo.og_image} />
      </Head>

      <div className="py-4">
        <div className="flex justify-end  px-3 bg-white fixed top-0 z-40 w-full py-2 border-b">
          <button
            onClick={toggleLanguage}
            className="bg-white border border-gray-200 text-black font-bold py-1  px-2 rounded"
          >
            {lang === "en" ? "বাং" : "EN"}
          </button>
        </div>

        <ProductHeader
          title={productData.title}
          description={productData.description}
        />

        <div className="flex gap-14 px-5 max-w-[1280px] mx-auto">
          <div className="w-[65%]">
            <TabItems  sections={productData.sections} />
          </div>
          <div className="w-[35%] -mt-[260px]">
            <TrailerPlayer
              media={productData.media}
              checklist={productData.checklist}
              productData={productData}
            />
          </div>
        </div>
      </div>
    </>
  );
}
