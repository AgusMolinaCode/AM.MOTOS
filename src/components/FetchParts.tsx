import axios from "axios";
import * as cheerio from "cheerio";
import { useState } from "react";

interface ScrapedData {
  title: string | null;
  price: string | null;
  imageUrl: string | null;
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

    console.log("Image URL:", imageUrl);

    return { title, price, imageUrl };
  } catch (error) {
    console.error("Error scraping data:", error);
    return { title: null, price: null, imageUrl: null };
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

  return (
    <div className="flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Pro-X Part Number Scraper
      </h1>

      <div className="relative flex flex-wrap gap-2 items-center justify-center">
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
        <div className="p-6 w-full max-w-lg">
          {scrapedData.title ? (
            <div>
              <p className="text-lg font-semibold mb-2">
                <span className="text-gray-600">Title:</span>{" "}
                {scrapedData.title}
              </p>
              <p className="text-lg font-semibold mb-2">
                <span className="text-gray-600">Price:</span>{" "}
                {scrapedData.price}
              </p>
              {scrapedData.imageUrl && (
                <img
                  src={scrapedData.imageUrl}
                  alt={scrapedData.title ?? "No Image"}
                  className="w-full h-full rounded-lg shadow"
                />
              )}
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
        <p className="text-black text-lg font-semibold mt-4">
          Buscando numero de pieza {partNumber}...
        </p>
      )}

      {!loading && !scrapedData && (
        <p className="text-gray-500 text-lg font-semibold mt-4">
          Ingresa un numero de pieza para buscar.
        </p>
      )}
    </div>
  );
}
