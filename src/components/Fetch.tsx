import React, { useState } from "react";
import ProductDetail from "./ProductDetail";
import { type ProductData } from "../types/api";

function Fetch() {
  const [wpsCode, setWpsCode] = useState("");
  const [product, setProduct] = useState<ProductData | null>(null);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    try {
      setLoading(true);
      setProduct(null);
      setSearched(false);

      const myHeaders = new Headers();
      myHeaders.append(
        "Authorization",
        import.meta.env.WPS_PASSWORD
      );

      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow" as RequestRedirect,
      };

      const formattedWpsCode = wpsCode.toUpperCase().replace(/\s/g, ""); // Convierte a mayúsculas y elimina espacios en blanco
      const response = await fetch(
        `https://api.wps-inc.com/items/crutch/${formattedWpsCode}?include=inventory,images`,
        requestOptions
      );

      if (!response.ok) {
        throw new Error("La solicitud no se completó correctamente");
      }

      const { data } = (await response.json()) as { data: ProductData };

      setProduct(data);
      setSearched(true);
    } catch (err) {
      setProduct(null);
      setSearched(true);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setWpsCode("");
    setProduct(null);
    setSearched(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode === 13) {
      handleSearch();
    }
  };

  return (
    <div>
      <div className="relative flex flex-wrap gap-2 items-center justify-center">
        <div className="relative">
          <input
            type="text"
            placeholder="Codigo WPS#"
            className="border-2 p-2 border-black text-center font-bold text-xl md:text-2xl rounded-xl font-outfit pr-3 md:pr-8"
            value={wpsCode}
            onChange={(e) => setWpsCode(e.target.value)}
            onKeyDown={handleKeyDown} // Agrega el controlador de eventos onKeyDown
          />
          {wpsCode && (
            <button
              className="absolute top-0 right-2 h-full w-6 md:w-8 text-red-400 hover:text-red-600"
              onClick={handleReset}
            >
              <img src="/cross.png" alt="Cross" />
            </button>
          )}
        </div>
        <button
          className="bg-blue-700 text-white font-bold text-xl md:text-2xl p-2  hover:bg-blue-900 rounded-xl duration-200 font-formula "
          onClick={handleSearch}
        >
          Buscar
        </button>
      </div>

      {!searched && !loading && (
        <p className="text-center text-2xl sm:text-3xl  mt-12 font-outfit font-bold">
          Ingrese un código WPS para buscar
        </p>
      )}

      {loading && !product && (
        <div className="flex justify-center items-center">
          <img src="/Spinner2.svg" alt="Loading" />
        </div>
      )}

      {searched && !loading && !product && (
        <p className="text-center text-2xl sm:text-3xl  mt-12 font-outfit font-bold max-w-md flex justify-center mx-auto">
          No se encontró ningún producto con ese código WPS, intente nuevamente
        </p>
      )}

      {product && <ProductDetail product={product} />}
    </div>
  );
}

export default Fetch;
