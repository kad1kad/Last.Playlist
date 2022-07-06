import UserSelector from "../components/UserSelector";
import LoginDisplay from "../components/LoginDisplay";

export default function Home() {
  return (
    <div className="bg-black min-h-screen w-full text-slate-50">
      <LoginDisplay />
      <UserSelector />
    </div>
  );
}
