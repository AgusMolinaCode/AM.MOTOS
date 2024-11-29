import React, { useState } from "react";
import type { ApiResponse, Item } from "../types/ebay";

const FetchParts = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async () => {
    const url = `https://ebay-search-result.p.rapidapi.com/search/${encodeURIComponent(
      query
    )}`;
    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key":
          "4ff9ed9b55msh8f068c31b7e03c1p113ba7jsn3364b9bc98c9",
        "x-rapidapi-host": "ebay-search-result.p.rapidapi.com",
      },
    };

    setIsLoading(true);
    try {
      const response = await fetch(url, options);
      const result: ApiResponse = await response.json();

      if (result.results && Array.isArray(result.results)) {
        setResults(result.results);
      } else {
        console.error("No se encontraron 'results' en la respuesta.");
      }
    } catch (error) {
      console.error("Error al realizar la búsqueda:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setQuery("");
    setResults([]);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const calculateAverage = (items: Item[], key: keyof Item) => {
    const validItems = items
      .map(item => parseFloat(item[key]?.replace(/[^0-9.-]+/g, "") || "0"))
      .filter(value => !isNaN(value));
    const total = validItems.reduce((acc, value) => acc + value, 0);
    return validItems.length ? (total / validItems.length).toFixed(2) : "0.00";
  };

  const averagePrice = parseFloat(calculateAverage(results, "price"));
  const averageShipping = parseFloat(calculateAverage(results, "shipping"));
  const total = ((averagePrice + averageShipping + 38) * 1200).toFixed(2);

  return (
    <div className="relative flex flex-col items-center justify-center">
      <div className="flex flex-wrap gap-2 items-center justify-center mb-4 relative">
        <input
          type="text"
          placeholder="Código Repuestos Originales o Alternativos"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          className="border-2 p-2 border-black text-center font-bold text-xl md:text-2xl rounded-xl font-outfit pr-3 md:pr-8 placeholder:text-sm"
        />
        {query && (
          <button
            className="absolute top-0 right-28 h-full w-6 md:w-8 text-red-400 hover:text-red-600"
            onClick={handleReset}
          >
            <img src="/cross.png" alt="Cross" />
          </button>
        )}
        <button
          onClick={handleSearch}
          className="bg-blue-700 text-white font-bold text-xl md:text-2xl p-2 hover:bg-blue-900 rounded-xl duration-200 font-formula"
        >
          Buscar
        </button>
      </div>
      {isLoading ? (
        <p className="text-xl">Cargando...</p>
      ) : (
        <div>
          <ol className="list-decimal">
            {results.slice(0, 5).map((item, index) => (
              <li key={item.id} className="mb-2">
                {item.title}
                {item.price && <span> - {item.price}</span>}
                {item.shipping && <span> - {item.shipping}</span>}
              </li>
            ))}
          </ol>
          <div className="mt-4">
            <p><strong>Promedio de Precio:</strong> ${averagePrice.toFixed(2)}</p>
            <p><strong>Promedio de Envío:</strong> ${averageShipping.toFixed(2)}</p>
            <p><strong>Total:</strong> ${total}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default FetchParts;