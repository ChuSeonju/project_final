import { useState, useEffect } from "react";
// import styled from "styled-components";
import DaumPostcode from "react-daum-postcode";

const AddressMap = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [areaAddress, setAreaAddress] = useState(""); // 지역 주소 (시, 도 등)
  const [detailAddress, setDetailAddress] = useState(""); // 상세 주소 (도로명, 건물명 등)
  const [map, setMap] = useState(null); // 지도 객체 상태
  const [marker, setMarker] = useState(null); // 마커 객체 상태

  useEffect(() => {
    const container = document.getElementById("map"); // 지도를 담을 영역의 DOM 레퍼런스
    const options = {
      // 지도를 생성할 때 필요한 기본 옵션
      center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표.
      level: 3, // 지도의 레벨(확대, 축소 정도)
    };

    const map = new kakao.maps.Map(container, options); // 지도 생성 및 객체 리턴
    setMap(map); // 지도 객체를 상태에 저장
  }, []);

  const handleComplete = (data) => {
    const fullAddress = data.address; // 전체 주소
    let extraAddress = ""; // 추가 주소 정보

    // 주소 유형이 도로명 주소인 경우 추가 정보를 포함합니다.
    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
    }

    // 지역 주소와 상세 주소 분리
    const areaAddress = `${data.sido} ${data.sigungu}`.trim(); // '시, 도' + '시, 군, 구'
    const detailAddress = fullAddress.replace(areaAddress, "").trim(); // 지역 주소를 제외한 나머지 주소

    setAreaAddress(areaAddress);
    setDetailAddress(
      detailAddress + (extraAddress !== "" ? ` (${extraAddress})` : "")
    );

    // 주소를 좌표로 변환하여 지도에 마커로 표시
    const geocoder = new kakao.maps.services.Geocoder();
    geocoder.addressSearch(fullAddress, function (result, status) {
      if (status === kakao.maps.services.Status.OK) {
        const coords = new kakao.maps.LatLng(result[0].y, result[0].x);

        if (marker) {
          // 이전 마커가 있으면 제거
          marker.setMap(null);
        }

        const newMarker = new kakao.maps.Marker({
          position: coords,
          map: map,
        });

        setMarker(newMarker);
        map.setCenter(coords);
      }
    });

    setIsModalOpen(false);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <button type="button" onClick={handleOpenModal}>
        주소 찾기
      </button>

      {isModalOpen && (
        <div>
          <DaumPostcode
            onComplete={handleComplete}
            width={380}
            height={500}
            autoClose={true}
            style={{ padding: "10px" }}
          />
          <button onClick={handleCloseModal}>닫기</button>
        </div>
      )}

      <div>
        지역 주소: {areaAddress}
        상세 주소: {detailAddress}
      </div>

      <div>
        <KakaoMap id="map" style={{ width: "100%", height: "400px" }} />
      </div>
    </div>
  );
};

export default AddressMap;
