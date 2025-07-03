// import { useEffect, useState } from "react";
// import { socket } from "@/socket";
import DynamicComponent from "@/components/layout/DynamicComponent";
import Header from "@/components/layout/Header";

export default function Home() {
  // const [isConnected, setIsConnected] = useState(false);
  // const [transport, setTransport] = useState("N/A");

  // useEffect(() => {
  //   if (socket.connected) {
  //     onConnect();
  //   }

  //   function onConnect() {
  //     setIsConnected(true);
  //     setTransport(socket.io.engine.transport.name);

  //     socket.io.engine.on("upgrade", (transport) => {
  //       setTransport(transport.name);
  //     });
  //   }

  //   function onDisconnect() {
  //     setIsConnected(false);
  //     setTransport("N/A");
  //   }

  //   socket.on("connect", onConnect);
  //   socket.on("disconnect", onDisconnect);

  //   return () => {
  //     socket.off("connect", onConnect);
  //     socket.off("disconnect", onDisconnect);
  //   };
  // }, []);
  
  return (
    <div>
      <Header/>
      <div className="md:px-40 px-5">
        <DynamicComponent />
      </div>
    </div>
  );
}