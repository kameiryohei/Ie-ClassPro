import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { IoClose } from "react-icons/io5";
import Link from "next/link";
import Image from "next/image";

interface ProfileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  sessionId: string | undefined;
}

const ProfileDrawer = ({ isOpen, onClose, sessionId }: ProfileDrawerProps) => {
  return (
    <div>
      <Transition.Root show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={onClose}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-40" />
          </Transition.Child>
          <div className="fixed inset-0 overflow-hidden ">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-event-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-200"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                    <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                      <div className="px-4 sm:px-6">
                        <div className="flex items-start justify-end">
                          <div className="ml-3 flex h-7 items-center">
                            <button
                              onClick={onClose}
                              type="button"
                              className="rounded-md bg-white text-gray-400 hover:text-gray-600 focus:ring-2 focus:outline-none focus:ring-orange-500 focus:ring-offset-2"
                            >
                              <span className="sr-only">閉じる</span>
                              <IoClose size={30} />
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="relative mt-6 flex-1 px-4 sm:px-6">
                        <div className="mb-2">
                          <div className="text-2xl font-light px-10 text-center border-b-2 text-neutral-600">
                            メニュー
                          </div>
                          <nav
                            className="mt-6 flex flex-col items-center space-y-6 text-lg font-medium text-neutral-600"
                            aria-label="メインナビゲーション"
                          >
                            <ul className="flex flex-col items-center space-y-6 p-0 m-0 list-none">
                              <li>
                                <Link
                                  href="/"
                                  className="border-b-4 border-b-orange-500 p-2"
                                  onClick={onClose}
                                >
                                  ホーム
                                </Link>
                              </li>
                              <li>
                                <Link
                                  href="/allPost"
                                  className="border-b-4 border-b-orange-500 p-2"
                                  onClick={onClose}
                                >
                                  全ての投稿を見る
                                </Link>
                              </li>
                              {sessionId ? (
                                <>
                                  <li>
                                    <Link
                                      href="/profile"
                                      className="border-b-4 border-b-orange-500 p-2"
                                      onClick={onClose}
                                    >
                                      マイページ
                                    </Link>
                                  </li>
                                  <li>
                                    <Link
                                      href="/create"
                                      className="border-b-4 border-b-orange-500 p-2"
                                      onClick={onClose}
                                    >
                                      履修プランを投稿する
                                    </Link>
                                  </li>
                                </>
                              ) : (
                                <>
                                  <li>
                                    <Link
                                      href="/user/login"
                                      className="border-b-4 border-b-orange-500 p-2"
                                      onClick={onClose}
                                    >
                                      ログイン
                                    </Link>
                                  </li>
                                  <li>
                                    <Link
                                      href="/user/register"
                                      className="border-b-4 border-b-orange-500 p-2"
                                      onClick={onClose}
                                    >
                                      新規登録
                                    </Link>
                                  </li>
                                </>
                              )}
                            </ul>
                          </nav>
                        </div>
                        <div className="flex justify-center">
                          <Link href="/">
                            <Image
                              src="/images/icon.png"
                              alt="Register"
                              width={150}
                              height={300}
                              className="mt-10 rounded-full"
                              onClick={onClose}
                            />
                          </Link>
                        </div>
                        <div className="flex justify-center mt-5">
                          {sessionId ? (
                            <>
                              <button className="px-4 py-2 bg-orange-500 text-white rounded-2xl">
                                ログイン中です
                              </button>
                            </>
                          ) : (
                            <>
                              <button className="px-4 py-2 bg-red-500 text-white rounded-2xl">
                                ログインしていません
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
};

export default ProfileDrawer;
