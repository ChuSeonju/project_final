import React, { useState, useEffect } from "react";

export default function LocationApi({ onMapReady, onMarkerUpdate }) {
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);

  useEffect(() => {
    window.kakao.maps.load(() => {
      const container = document.getElementById("map");
      const options = {
        center: new window.kakao.maps.LatLng(
          37.47678518773601,
          126.87954257577638
        ),
        level: 3,
      };

      const kakaoMap = new window.kakao.maps.Map(container, options);
      setMap(kakaoMap);
      onMapReady(kakaoMap);

      const kakaoMarker = new window.kakao.maps.Marker({
        map: kakaoMap,
        position: options.center,
      });
      setMarker(kakaoMarker);
      onMarkerUpdate(kakaoMarker);

      window.kakao.maps.event.addListener(
        kakaoMap,
        "click",
        function (mouseEvent) {
          const latlng = mouseEvent.latLng;
          kakaoMarker.setPosition(latlng);
          onMarkerUpdate(kakaoMarker);
        }
      );

      window.kakao.maps.event.addListener(kakaoMarker, "dragend", () => {
        onMarkerUpdate(kakaoMarker);
      });
      kakaoMarker.setDraggable(true);
    });
  }, [onMapReady, onMarkerUpdate]);

  return <div id="map" style={{ width: "100%", height: "400px" }}></div>;
}
