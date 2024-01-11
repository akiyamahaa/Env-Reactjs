import { collection, doc, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

import { firebaseDB, firebaseStorage } from "../setup/firebase";
import { IMission } from "../types/mission";

const missionSample: IMission[] = [
  {
    title: "Hành động Thu gom Rác và Làm Sạch Môi Trường",
    address:
      "Khu vực công viên thành phố, P. Phước Long, Quận 5, Thành phố Hồ Chí Minh",
    content: ` Nhóm tình nguyện viên sẽ tổ chức hoạt động thu gom rác và làm sạch môi trường nhằm giảm ô nhiễm và tăng nhận thức cộng đồng về vấn đề môi trường.
    Trong hoạt động này, nhóm tình nguyện viên sẽ tập trung vào việc thu gom rác, tách loại rác tái chế, và thực hiện các hoạt động giáo dục cộng đồng để tăng cường nhận thức về tác động của rác thải đối với môi trường và khuyến khích việc giữ gìn môi trường xung quanh.`,
    mission: "Thu Gom và Xử Lý Rác Thải",
    phoneNumber: "0123 456 789",
    startDate: new Date("January 14, 2024 03:24:00"),
    endDate: new Date("January 17, 2024 03:24:00"),
    score: 50,
    participants: 10,
  },
];

export const uploadImage = async (uri: string) => {
  // It won't upload image if image is not change
  const blob: any = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(xhr.response);
    };
    xhr.onerror = function (e) {
      console.log(e);
      reject(new TypeError("Network request failed"));
    };
    xhr.responseType = "blob";
    xhr.open("GET", uri, true);
    xhr.send(null);
  });
  const avatarName = "test";
  const fileRef = ref(firebaseStorage, avatarName);
  await uploadBytes(fileRef, blob);

  // We're done with the blob, close and release it
  blob.close();

  const avatarUrl = await getDownloadURL(fileRef);
  return { avatarName, avatarUrl };
};

export const createMissions = async () => {
  const missionUpload = missionSample.map(async (mission) => {
    const missionDocRef = doc(collection(firebaseDB, "missions"));
    await setDoc(missionDocRef, {
      ...mission,
      id: missionDocRef.id,
    });
  });
  await Promise.all(missionUpload);
};
