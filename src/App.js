// import ListItem from "./components/ListItem";
import { useState, useEffect } from "react";
// import mock from "./mock.json";
import BoardWriteForm from "./components/board/BoardWriteForm";
import Button from "./components/Button";
import BoardListItem from "./components/board/BoardListItem";
import Title from "./components/board/boardcomponent/Title";
import SignUp from "./components/user/SignUp";
import LocationApi from "./LocationApi";
import LocationWeatherView from "./LocationWheatherView";
import AddressMap from "./components/board/AdressMap";

function App() {
  //   const [userId, setUserId] = useState();

  //   useEffect(() => {
  //     const findNick = 13;
  //     const boardData = mock.find((board) => board.nickname === findNick);
  //     setUserId(boardData);
  //   }, []);

  return (
    <>
      <AddressMap />
      {/* {userId ? <BoardWriteForm board={userId} /> : <p>s</p>} */}
    </>
  );
}

export default App;
