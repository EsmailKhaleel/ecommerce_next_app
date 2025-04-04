import Image from "next/image";

export default function Home() {
  return (
      <main>
        <Image src='/welcome.jpg' alt="welcome" width={1920} height={ 1080} style={{ objectFit: "cover", height: "100vh", width: "100%", position: "absolute", zIndex: "-1", top: "0", left: "0", right: "0", bottom: "0", overflow: "hidden" }}/>
      </main>
  );
}
