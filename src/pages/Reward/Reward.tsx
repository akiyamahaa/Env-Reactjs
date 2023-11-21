import React, { useEffect, useState } from "react";
import "./Reward.css";
import { firebaseDB } from "../../../src/setup/firebase/index";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
const colRefPresents = collection(firebaseDB, "presents");

interface IReward {
  id: string;
  img: string;
  sl: number;
  value: string;
  name: string;
}
const Reward = () => {
  const [presents, setPresents] = useState<IReward[]>([]);
  useEffect(() => {
    const getPresents = async () => {
      const data = await getDocs(colRefPresents);
      const convertData: IReward[] = data.docs.map((doc) => ({
        id: doc.id,
        img: doc.data().img,
        sl: doc.data().sl,
        value: doc.data().value,
        name: doc.data().name,
      }));
      setPresents(convertData);
    };
    getPresents();
  }, []);
  return (
    <div className="container">
      <div className="header-reward">
        <img
          src="https://vio.edu.vn/assets/de4e7150.png"
          width="50"
          height="50"
          alt="giftCategoryIc"
          className="CkcRL"
        />
        <div className="title">Đổi phần thưởng </div>
      </div>

      <div className="exchange">
        {presents.map((present) => {
          return (
            <div className="present-container">
              <div className="present" key={present.id}>
                <div className="name">{present.name}</div>
                <img
                  className="img"
                  src={present.img}
                  alt="hinh anh qua tang"
                />
                <div>{present.sl}</div>
                <button className="button">{present.value}</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Reward;
