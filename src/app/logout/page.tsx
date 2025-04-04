import styles from "./logout.module.css";
import { signOut } from "@/util/auth";
import { FaSignOutAlt } from "react-icons/fa";

export default function Signout() {
  return (
    <div className={styles.container}>
      <form
        action={async () => {
          "use server";
          await signOut({ redirectTo: "/" });
        }}
      >
        <button type="submit" className='deleteButton' style={{ width: "100%",display: "flex", alignItems: "center", justifyContent: "center", height: "100%" }}>
        <FaSignOutAlt style={{ marginRight: "10px", fontSize: "2rem" }}/>
          Sign Out
        </button>
      </form>
    </div>
  );
}
