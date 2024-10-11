import LoginForm from "./components/LoginForm";

const LoginPage = () => {
  return (
    <div className="mx-auto max-w-3xl lg:max-w-2xl px-4 sm:px-6 lg:px-8 pb-16 pt-40 text-center lg:pt-32">
      <div className="bg-slate-50 rounded-xl px-4 py-4 shadow-lg ring-1 ring-gray-400">
        <p className="text-2xl text-center text-gray-900">ログイン画面</p>
        <div className="flex justify-center pt-8">
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
