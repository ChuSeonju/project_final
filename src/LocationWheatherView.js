import React, { useState, useCallback } from "react";
import LocationApi from "./LocationApi";
import WeatherApi from "./WeatherApi";
import Button from "./components/Button";

export default function LocationWeatherView() {
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);
  const { weather, fetchWeather } = WeatherApi();

  const handleMapReady = useCallback((mapInstance) => {
    setMap(mapInstance);
  }, []);

  const handleMarkerUpdate = useCallback((newMarker) => {
    setMarker(newMarker);
  }, []);

  const getCurrentPosBtn = () => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const currentPos = new window.kakao.maps.LatLng(
          pos.coords.latitude,
          pos.coords.longitude
        );
        if (map && marker) {
          map.panTo(currentPos);
          marker.setPosition(currentPos);
        }
      },
      () => alert("위치 정보를 가져오는데 실패했습니다."),
      {
        enableHighAccuracy: true,
        maximumAge: 30000,
        timeout: 27000,
      }
    );
  };

  const handleWeatherCheck = () => {
    if (marker) {
      const markerPosition = marker.getPosition();
      const lat = markerPosition.getLat();
      const lng = markerPosition.getLng();
      fetchWeather(lat, lng);
    } else {
      alert("마커가 설정되지 않았습니다.");
    }
  };

  return (
    <div>
      <LocationApi
        onMapReady={handleMapReady}
        onMarkerUpdate={handleMarkerUpdate}
      />
      <Button onClick={getCurrentPosBtn}>현재 위치</Button>
      <Button onClick={handleWeatherCheck}>날씨 확인</Button>
      {weather && (
        <div>
          <h2>날씨 정보</h2>
          <p>현재 온도: {weather.TMP} °C</p>
          <p>강수 확률: {weather.POP} mm</p>
          <p>습도: {weather.REH} %</p>
          <p>풍속: {weather.WSD} kph</p>
          <p>최저 기온: {weather.TMN} °C</p>
          <p>최고 기온: {weather.TMX} °C</p>
        </div>
      )}
    </div>
  );
}
