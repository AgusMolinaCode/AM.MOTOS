import axios from "axios";
import * as cheerio from "cheerio";
import { useState } from "react";

interface ScrapedData {
  title: string | null;
  price: string | null;
  imageUrl: string | null;
  sku: string | null;
}

async function scrapeProX(partNumber: string): Promise<ScrapedData> {
  try {
    const url = `https://www.pro-x.com/?s=${partNumber}&post_type=product`;
    const { data: html } = await axios.get(url);
    const $ = cheerio.load(html);

    // Parseando datos
    const title =
      $(".woocommerce-loop-product__title").first().text().trim() || null;
    const price = $(".woocommerce-Price-amount").first().text().trim() || null;
    const imageUrl = $("li.product img").first().attr("src") || null;
    const sku = $(".price").text().trim() || null;
    
    return { title, price, imageUrl ,sku};
  } catch (error) {
    console.error("Error scraping data:", error);
    return { title: null, price: null, imageUrl: null, sku: null };
  }
}

export default function FetchParts() {
  const [partNumber, setPartNumber] = useState("");
  const [scrapedData, setScrapedData] = useState<ScrapedData | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    const data = await scrapeProX(partNumber);
    setScrapedData(data);
    setLoading(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode === 13) {
      handleSearch();
    }
  };

  const handleReset = () => {
    setPartNumber("");
    setScrapedData(null);
  };

  const adjustPrice = (price: string | null, title: string | null): string | null => {
    if (!price) return null;
    let numericPrice = parseFloat(price.replace(/[^0-9.-]+/g, ""));
    if (title && title.toLowerCase().includes("connecting rod")) {
      numericPrice += 30;
    } else if (title && title.toLowerCase().includes("basket")) {
      numericPrice += 25;
    }
    return numericPrice.toFixed(2);
  };

  return (
    <div className="flex flex-col items-center md:p-6">
      {!loading && !scrapedData && (
        <p className="text-black text-lg md:text-xl my-1 md:mt-8 font-outfit text-center">
          Ingresa un numero de pieza del siguiente catalogo para buscarlo
        </p>
      )}
      <div className="relative flex flex-wrap gap-2 items-center justify-center my-8">
        <div className="relative">
          <input
            type="text"
            placeholder="Enter part number"
            value={partNumber}
            onKeyDown={handleKeyDown}
            onChange={(e) => setPartNumber(e.target.value)}
            className="border-2 p-2 border-black text-center font-bold text-xl md:text-2xl rounded-xl font-outfit pr-3 md:pr-8 placeholder:text-xl"
          />
          {partNumber && (
            <button
              className="absolute top-0 right-2 h-full w-6 md:w-8 text-red-400 hover:text-red-600"
              onClick={handleReset}
            >
              <img src="/cross.png" alt="Cross" />
            </button>
          )}
        </div>
        <button
          onClick={handleSearch}
          disabled={loading || !partNumber}
          className="bg-blue-700 text-white font-bold text-xl md:text-2xl p-2  hover:bg-blue-900 rounded-xl duration-200 font-formula disabled:opacity-50"
        >
          {loading ? "Buscando..." : "Buscar"}
        </button>
      </div>

      {scrapedData && (
        <div className="p-6 w-full">
          {scrapedData.title ? (
            <div className="flex gap-2 justify-center mx-auto">
              <div>
                {scrapedData.imageUrl && (
                  <img
                    src={scrapedData.imageUrl}
                    alt={scrapedData.title ?? "No Image"}
                    className="w-full h-full rounded-lg shadow-lg"
                  />
                )}
              </div>
              <div className="">
                <p className=" text-xl md:text-2xl text-center font-outfit font-bold mb-2">
                  {scrapedData.title}
                </p>
                <p className="text-2xl font-semibold font-outfit mb-2">
                {adjustPrice(scrapedData.price, scrapedData.title)}  Pesos
                </p>
                <p className="text-black text-lg font-outfit font-semibold">
                  Codigo: {partNumber.toUpperCase()}
                </p>
              </div>
            </div>
          ) : (
            <p className="text-red-700 text-center text-lg font-semibold">
              No se encontraron resultados para el numero de pieza{" "}
              <span className="font-bold">{partNumber}</span>.
            </p>
          )}
        </div>
      )}

      {loading && (
        <p className="text-black text-lg font-semibold my-4">
          Buscando numero de pieza: {partNumber}
        </p>
      )}

      <div
        style={{
          position: "relative",
          paddingTop: "max(60%, 326px)",
          height: 0,
          width: "70%",
        }}
      >
        <iframe
          loading="lazy"
          allow="clipboard-write"
          sandbox="allow-top-navigation allow-top-navigation-by-user-activation allow-downloads allow-scripts allow-same-origin allow-popups allow-modals allow-popups-to-escape-sandbox allow-forms"
          allowFullScreen
          style={{
            position: "absolute",
            border: "none",
            width: "100%",
            height: "90%",
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
          }}
          src="https://e.issuu.com/embed.html?d=prox_catalog_2024&hideIssuuLogo=true&u=racewinningbrands"
          data-rocket-lazyload="fitvidscompatible"
          data-lazy-src="https://e.issuu.com/embed.html?d=prox_catalog_2024&hideIssuuLogo=true&u=racewinningbrands"
          data-cmp-ab="2"
          data-cmp-info="7"
          data-ll-status="loaded"
          className="entered lazyloaded"
        />
        <noscript>
          <iframe
            allow="clipboard-write"
            sandbox="allow-top-navigation allow-top-navigation-by-user-activation allow-downloads allow-scripts allow-same-origin allow-popups allow-modals allow-popups-to-escape-sandbox allow-forms"
            allowFullScreen
            style={{
              position: "absolute",
              border: "none",
              width: "100%",
              height: "90%",
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
            }}
            src="https://e.issuu.com/embed.html?d=prox_catalog_2024&hideIssuuLogo=true&u=racewinningbrands"
          />
        </noscript>
      </div>
    </div>
  );
}
