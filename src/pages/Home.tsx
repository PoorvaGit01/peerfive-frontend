import Header from "../components/Navbar";
import UsersList from "../components/UserTable";

export default function Home() {
  return (
    <>
      <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <Header /> 
        <div style={{ flex: 1 ,marginTop:"50px"}}>
          <UsersList /> 
        </div>
      </div>
    </>
  );
}
