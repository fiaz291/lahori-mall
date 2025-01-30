"use client";
import React, { useCallback, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { CheckCircleFilled, HeartFilled, StarFilled } from "@ant-design/icons";
import { COLORS } from "@/constants";
import useAuthUser from "@/app/hooks/authUser";
import axios from "axios";
import { debounce } from "lodash";
import config from "@/app/config";
import { store } from "@/app/store";
import useCartItems from "@/app/hooks/cartItems";
import IncDecCounter from "@/components/IncrementDecrementCounter";
import { Collapse, Modal, message } from "antd";
import LoginForm from "@/components/LoginForm";
import SignupForm from "@/components/SignupForm";
import useFavorites from "@/app/hooks/favorites";
import BestSellingSlider from "@/components/BestSellingSlider";
import TKSHomePageProducts from "@/components/TKSHomePageProducts";
import { API_URLS } from "@/app/apiUrls";

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 5,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 5,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 5,
  },
};

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;
const items = [
  {
    key: '1',
    label: 'Is this product in stock?',
    children: <p>Yes, this product is currently in stock and available for shipping. Limited quantities may apply—order soon!</p>,
  },
  {
    key: '2',
    label: 'What should I do if I receive a damaged product?',
    children: <p>If your product arrives damaged, please contact us within 4 days of delivery with photos of the damage. We’ll arrange a replacement or refund.</p>,
  },
  {
    key: '3',
    label: 'Can I cancel my order?',
    children: <p>You can cancel your order before it is shipped. For cancellations, please contact our support team as soon as possible.</p>,
  },
];

export default function Product_Details({ prod }) {
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState(
    prod?.images?.[0] || "/placeholder.webp"
  );

  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  const { user } = useAuthUser();
  const { cartItems: ordersInCart } = useCartItems();
  const { favorites } = useFavorites();
  const isProductIsFavorite = useCallback(() => {
    const isAlreadyThere = favorites?.find((item) => item.productId === prod.id);
    if (isAlreadyThere) {
      return true;
    }
    return false;
  }, [favorites, favorites?.length]);
  const handleAddToCart = async () => {
    setLoading(true);
    try {
      const cartData = [...ordersInCart];
      const ifAlreadyExist = cartData.find(
        (cartProd) => cartProd.productId === prod.id
      );

      const data = {
        userId: user.id,
        productId: prod.id,
        quantity:
          ifAlreadyExist && ifAlreadyExist.quantity
            ? ifAlreadyExist.quantity + Number(quantity)
            : Number(quantity),
      };
      const res = await axios.post(config.url + API_URLS.CART, data);

      if (ifAlreadyExist) {
        cartData.splice(cartData.indexOf(ifAlreadyExist), 1, res.data);
      } else {
        cartData.push(res.data);
      }

      store.setState((state) => {
        return {
          ...state,
          cart: cartData,
        };
      });
    } catch (error) {
      console.log({ error });
    } finally {
      setLoading(false);
    }
  };

  const handleAddToFavorite = async () => {
    try {
      const favData = [...favorites];
      const ifAlreadyExist = favData.find(
        (favProd) => favProd.productId === prod.id
      );

      if (ifAlreadyExist) {
        message.info("Product Already Added to favorite");
        return;
      }

      const data = {
        userId: user.id,
        productId: prod.id,
      };
      const res = await axios.post(config.url + "/api/favorites", data);

      favData.push(res.data);

      store.setState((state) => {
        return {
          ...state,
          favorites: favData,
        };
      });
      message.info("Product Added to favorite");
    } catch (error) {
      console.log({ error });
    }
  };

  const debouncedHandleAddToCart = debounce(handleAddToCart, 300);
  const debouncedHandleAddToFavorite = debounce(handleAddToFavorite, 300);

  return (

    <div>
      <div className="flex flex-col md:flex-row w-full gap-4">

        <div className="flex flex-col gap-2 md:gap-3 w-full md:w-10/24">
          <div className="border border-slate-400">
            <img
              // src={prod?.images?.[0] || "/product.webp"}
              src={"/product.webp"}
              className="w-full h-full object-cover"
              alt="product"
            />
          </div>
          <div className="flex overflow-scroll scrollbar-none">
            {/* <Carousel responsive={responsive} showDots={true}> */}
            {[1, 2, 3, 4, 5, 6]?.map((img, index) => (
              <div
                key={index}
                className="pb-8 cursor-pointer hover:opacity-80"
                onClick={() => {
                  setMainImage("/product.webp");
                }}
              >
                <div className="border border-slate-400 mr-2 md:mr-3">
                  <img
                    src={"/product.webp"}
                    className="w-full h-full object-cover"
                    alt={`product-${index}`}
                  />
                </div>
              </div>
            ))}
            {/* </Carousel> */}
          </div>
        </div>
        <div className="flex flex-col h-auto w-full md:w-14/24 md:px-4 gap-2 ">
          {/* <div className="bg-green-100 text-[#007f3e] p-[6px] px-3 text-sm md:text-base rounded-md font-semibold flex items-center gap-2">
          <CheckCircleFilled />
          Free shipping for this item
        </div> */}
          <p className="text-base md:text-lg font-semibold">
            {prod?.name || "BEAUTY OF JOSEON Glow Serum : Propolis+Niacinamide"}
            {/* 20 Piece Dinner Set Porcelain Ivory White Dinnerware with Pink Flower
          Pattern Plates and Bowls Services for 4 */}
          </p>

          {!prod?.isDiscount && (
            <p
              className="text-[32px] md:text-[24px] font-semibold"
              style={{ color: COLORS.red }}
            >
              {prod?.price} AED 8900
            </p>
          )}
          {prod?.isDiscount && (
            <>
              <p
                className="text-[32px] md:text-[24px] font-semibold"
                style={{ color: "#CD2E3A" }}
              >
                {prod?.discountPrice} AED
              </p>
              <p
                className="text-[14px] md:text-[14px] font-semibold line-through"
                style={{ color: "#0047A0" }}
              >
                {prod?.price} AED
              </p>
            </>
          )}

          {/* <p className="text-base md:text-lg font  text-gray-700">
          Quantity: 20pcs
        </p> */}
          <div className="flex items-center gap-2 mb-3">
            <p className="text-base md:text-lg text-gray-700">Quantity</p>
            <IncDecCounter
              value={quantity}
              setValue={(e) => {
                setQuantity(e);
              }}
              max={prod?.inventory || 1}
            />
            {/* <input
            value={quantity}
            onChange={(e) => {
              setQuantity(e.target.value);
            }}
            type="number"
            min="1"
            max={prod?.inventory || 1}
            className="w-16 p-1 border border-gray-300 text-gray-700 text-center bg-gray-100"
          /> */}
          </div>
          <button
            className="bg-[#0047A0] mb-[-4px] text-white py-2 px-4 rounded-full w-full text-base md:text-lg"
            disabled={loading}
            onClick={() => {
              if (!user) {
                setOpenModal(true);
                return;
              }
              debouncedHandleAddToCart();
            }}
          >
            Add to Cart
          </button>
          <button
            className="bg-gray-100 text-black py-2 px-4 rounded-full w-full mt-2 text-base md:text-lg"
            onClick={() => {
              if (!user) {
                setOpenModal(true);
                return;
              }
              debouncedHandleAddToFavorite();
            }}
          >
            <span style={{ color: COLORS.red }}>
              <HeartFilled />
            </span>{" "}
            {isProductIsFavorite() ? "Added to Favorite" : "Add to Favorite"}
          </button>
          {prod?.isDiscount && prod?.discountPrice && (
            <p className="text-[#007f3e] text-sm md:text-base font-semibold mt-2">
              {(100 - (prod?.discountPrice / prod?.price) * 100).toFixed(2)}% off discount
            </p>
          )}
          {/* <p className="text-sm md:text-base text-[#007f3e] mt-2">
          Delivery Charges: <span className="text-gray-600">Rs. 200</span>
        </p> */}
          <p className="text-sm md:text-base text-[#007f3e]">
            Delivery Time: <span className="text-gray-600">3 business days</span>
          </p>
          <p>
            {prod?.description}
          </p>
          {/* <p className="text-sm md:text-base text-[#007f3e]">
          Fast Delivery:{" "}
          <span className="text-gray-600">2-7 business days</span>
        </p> */}
          {/* <div className="flex items-center gap-2 text-sm md:text-base text-gray-600 mt-2">
          <span>10 reviews</span>
          <span>|</span>
          <span className="flex items-center gap-1">
            <span className="text-black">4.9</span>
            <StarFilled className="text-yellow-500" />
          </span>
        </div> */}
          <div className="flex items-center gap-2 text-[#007f3e] mt-4">
            <CheckCircleFilled />
            <p className="font-semibold">TKS Commitments</p>
          </div>
          <div className="text-sm md:text-base text-gray-600 mt-2">
            <div className="flex items-start gap-2">
              <div className="text-[#007f3e]">✔</div>
              <div>
                <p className="font-semibold">Security & Privacy</p>
                <ul className="list-disc list-inside">
                  <li>Safe payments</li>
                  <li>Secure privacy</li>
                </ul>
              </div>
            </div>
            <div className="flex items-start gap-2 mt-2 mb-[20px]">
              <div className="text-[#007f3e]">✔</div>
              <div>
                <p className="font-semibold">Delivery guarantee</p>
                <ul className="list-disc list-inside">
                  <li>15-day no update refund</li>
                  <li>Return if item damaged</li>
                </ul>
              </div>
            </div>
            <Collapse accordion items={items} />
          </div>
        </div>

        <Modal
          open={openModal}
          closable={false}
          centered={true}
          title={isLogin ? "Login" : "Signup"}
          okText={isLogin ? "Login" : "Signup"}
          footer={false}
        >
          {isLogin ? (
            <LoginForm setOpenModal={setOpenModal} setIsLogin={setIsLogin} />
          ) : (
            <SignupForm setOpenModal={setOpenModal} setIsLogin={setIsLogin} />
          )}
        </Modal>

      </div>
      <BestSellingSlider />
      <div className="mt-[20px]">
        <TKSHomePageProducts title={"Products with Discount"} />
      </div>

    </div>
  );
}
