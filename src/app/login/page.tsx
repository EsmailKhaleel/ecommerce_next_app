import styles from "./login.module.css";
import { signIn } from "@/util/auth";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";

export default function SignIn() {
  return (
    <div className={styles.container}>
      <form
        className={styles.form}
        action={async () => {
          "use server";
          await signIn("google", { redirectTo: "/" });
        }}
      >
        <button type="submit" className={`deleteButton active`} style={{ width: "100%",display: "flex", alignItems: "center", justifyContent: "center", height: "100%" }}>
        <FcGoogle style={{ marginRight: "10px", fontSize: "2rem" }}/>
          Sign in with Google
        </button>
      </form>

      <form
        className={styles.form}
        action={async () => {
          "use server";
          await signIn("facebook", { redirectTo: "/" });
        }}
      >
        <button type="submit" className={`viewButton active`} style={{ width: "100%",display: "flex", alignItems: "center", justifyContent: "center", height: "100%" }}>
        <FaFacebook style={{ marginRight: "10px", fontSize: "2rem" }}/>
          Sign in with Facebook
        </button>
      </form>
    </div>
  );
}
