import { useState } from "react";
import SignInForm from "./Modal/SignInForm";
import SignUpForm from "./Modal/SignUpForm";
import { ModalType } from "./Modal/ModalType";
import { IoClose } from "react-icons/io5";

interface Props {
  modalType: ModalType;
}

const ModalCore = ({ modalType }: Props) => {
  const [showModal, setShowModal] = useState(false);
  let title = "";
  let headerButton = "";
  let formElement = <p>フォームを読み込めませんでした。</p>;

  switch (modalType) {
    case ModalType.SignIn:
      title = "ログインフォーム";
      headerButton = "ログイン";
      formElement = <SignInForm showModal={setShowModal}></SignInForm>;
      break;

    case ModalType.SignUp:
      title = "ユーザ登録フォーム";
      headerButton = "サインイン";
      formElement = <SignUpForm showModal={setShowModal}></SignUpForm>;
      break;
  }
  return (
    <>
      <button
        className="text-gray-600 hover:text-orange-500 duration-300"
        type="button"
        onClick={() => setShowModal(true)}
      >
        {headerButton}
      </button>
      {showModal ? (
        <div
          className="fixed z-10 inset-0 overflow-y-auto"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 bg-gray-600 bg-opacity-50 transition-opacity"
              aria-hidden="true"
            />
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            />
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <h3 className="mt-4 text-xl font-semibold text-center text-gray-900 border-b-2 border-b-gray-200">
                {title}
              </h3>
              <div className="flex justify-end">
                <button
                  type="button"
                  className="end-2.5 mr-6 text-orange-400 bg-transparent hover:bg-orange-200 hover:text-orange-900 transition-colors rounded-lg text-sm w-8 h-8  inline-flex justify-center items-center"
                  data-modal-hide="authentication-modal"
                  onClick={() => setShowModal(false)}
                >
                  <IoClose size={30} />
                  <span className="sr-only">モーダルを閉じる</span>
                </button>
              </div>
              <div className="p-4 md:p-5">{formElement}</div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default ModalCore;
