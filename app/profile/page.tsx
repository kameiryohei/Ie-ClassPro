import ProfileContent from "./components/ProfileContent";

const ProfilePage = () => {
  return (
    <div className="mx-auto max-w-3xl lg:max-w-2xl px-4 sm:px-6 lg:px-8 pb-16 pt-20 text-center lg:pt-22">
      <h1 className="text-2xl font-bold mb-5">プロフィール画面</h1>
      <div className="bg-slate-50 rounded-xl px-4 py-4 shadow-lg ring-1 ring-gray-400">
        <ProfileContent />
      </div>
    </div>
  );
};

export default ProfilePage;
