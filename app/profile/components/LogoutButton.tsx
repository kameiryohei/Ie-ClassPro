import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface LogoutButtonProps {
  signOut: () => void;
}

const LogoutButton = ({ signOut }: LogoutButtonProps) => {
  const router = useRouter();

  const logOut = () => {
    signOut();
    toast.success("ログアウトしました");
    router.push("/");
    router.refresh();
  };

  return (
    <div>
      <button
        onClick={logOut}
        className="mt-5 bg-red-500 hover:bg-red-600 text-white px-5 py-3 duration-200 rounded-xl"
      >
        ログアウト
      </button>
    </div>
  );
};

export default LogoutButton;
