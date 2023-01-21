import styled from "styled-components";
import Navigation from "../components/Navigation";
import BackButton from "../components/BackButton";
import Bar from "../components/Bar";
import * as storage from "../utils/storage";
import BasketItem from "../components/BasketItem";
import PriceDetailView from "../components/PriceDetailView";
import { useEffect, useState } from "react";

const Basket = () => {
  const [basketItems, setBasketItems] = useState();
  const [basketItemCount, setBasketItemCount] = useState(0);
  const [basketItemPrice, setBasketItemPrice] = useState(0);

  //  1. 장바구니 데이터 가져오기.

  useEffect(() => {
    const items = storage.getBasketItems();
    setBasketItems(items);
    setBasketItemCount(items.length);
  }, []);

  // 3. itemCount가 바뀔 때마다 실행하는 함수

  useEffect(() => {
    const items = storage.getBasketItems();
    const totalPrice = items
      .map((item) => item.price)
      .reduce((acc, val) => acc + val, 0);
    setBasketItems(items);
    setBasketItemPrice(totalPrice);
  }, [basketItemCount]);

  //  2. UI 구현

  const onClickRemoveButton = (productId) => {
    storage.removeBasketItem(productId);
    setBasketItemCount(basketItemCount - 1);
  };

  const deliveryFee = 3000;

  return (
    <MainSection>
      <BackButton />
      <Navigation header={"장바구니"} />
      <Bar height={1} />
      {basketItems &&
        basketItems.map((item) => (
          <BasketItem
            key={item.id}
            thumbnail={item.thumbnail}
            name={item.name}
            price={item.price}
            onClickRemoveButton={() => onClickRemoveButton(item.id)}
          />
        ))}
      <Bar height={1} />
      <PriceDetailView
        count={basketItemCount}
        price={basketItemPrice}
        deliveryFee={deliveryFee}
        totalPrice={basketItemPrice + deliveryFee}
      />
      <OrderBasketButton>주문하기</OrderBasketButton>
    </MainSection>
  );
};

const MainSection = styled.div`
  position: relative;
  width: 390px;
  height: 100%;
  background: #ffffff;
  margin-left: auto;
  margin-right: auto;
`;

const OrderBasketButton = styled.button`
  width: 100%;
  height: 70px;
  font-family: "Noto Sans KR";
  font-weight: bold;
  text-align: center;
  background-color: #24dbaf;
  border: none;
  cursor: pointer;
`;

export default Basket;
