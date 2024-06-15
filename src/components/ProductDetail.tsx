import { type ProductData } from "../types/api";
import ReactWhatsapp from "react-whatsapp";
import ImageDetails from "./ImageDetails";

const data = await fetch('https://criptoya.com/api/dolar').then((response) =>
  response.json()
);

const dolar = data.blue.ask;

type ProductDetailProps = {
  product: ProductData;
};


const ProductDetail = ({ product }: ProductDetailProps) => {
  let stockMessage = "";
  let stockShipping = "";
  let bg = "";
  if (product.inventory.data.total < 0) {
    stockMessage = "Sin disponibilidad";
    stockShipping = "No se encuentra en stock";
    bg = "bg-red-200";
  } else if (product.inventory.data.total === 0) {
    stockMessage = "Sin disponibilidad";
    stockShipping = "No se encuentra en stock";
    bg = "bg-red-200";
  } else if (product.inventory.data.total <= 3) {
    stockMessage = "Poca disponibilidad";
    stockShipping = "Demora 20 dias habiles";
    bg = "bg-orange-200";
  } else {
    stockMessage = "Disponible";
    stockShipping = "Demora 18 dias habiles";
    bg = "bg-blue-200";
  }

  const weightInKilos = product.weight / 2.20462;
  const finalWeight = weightInKilos * 40;
  const finalPrice = (finalWeight + Number(product.list_price)) * dolar;

  return (
    <div className="flex mx-auto justify-center gap-4 mt-6 md:mt-20 flex-wrap">
      <div className="">
        <h1 className="text-center font-outfit text-2xl sm:text-3xl font-bold max-w-lg py-3 border-b border-gray-400 text-gray-700">
          {product.name}
        </h1>
        <p className="text-center text-4xl font-bold font-outfit py-3">
          ${" "}
          {finalPrice.toLocaleString("es-AR", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}{" "}
          <span className="text-3xl">Pesos</span>
        </p>
        <div className={`${bg} p-1 rounded-lg my-4`}>
          <p className="text-center text-xl text-gray-600 font-outfit">
            {" "}
            Stock USA:{" "}
            <span className="font-bold text-2x text-black">{stockMessage}</span>
          </p>
          <p className="font-bold text-lg py-2 text-center font-outfit text-black">{stockShipping}</p>
        </div>
        <p className="text-center text-lg text-gray-600 font-outfit font-semibold">
          Codigo WPS:{" "}
          <span className="text-xl text-black font-bold">{product.sku}</span>
        </p>
        <p className="text-center text-lg text-gray-600 font-outfit font-semibold">
          Codigo de fabricante:{" "}
          <span className="text-black text-xl font-bold">
            {product.supplier_product_id}
          </span>
        </p>
        <div className="">
          <ReactWhatsapp
            number="+541150494936"
            message={`Hola! me interesa comprar este producto, id: ${product.sku}. Gracias!`}
            element="webview"
            className="my-5 p-1 rounded-xl flex justify-center mx-auto bg-green-400 hover:bg-green-500 duration-200 max-w-[14rem] cursor-pointer "
          >
            <button className=" text-black font-bold text-xl md:text-2xl p-2 rounded-xl font-formula flex items-center gap-2">
              <img
                src="/whatsapp.svg"
                alt="Whatsapp Logo"
                width={40}
                height={40}
              />
              Comprar
            </button>
          </ReactWhatsapp>
        </div>
      </div>
      <div className="">
        <ImageDetails
          images={product.images.data.map((datum) => ({
            id: datum.id.toString(),
            domain: datum.domain,
            path: datum.path,
            filename: datum.filename,
            
          }))}
        />
      </div>
    </div>
  );
};

export default ProductDetail;
