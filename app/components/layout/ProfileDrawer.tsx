import { Fragment } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Dialog, Transition } from "@headlessui/react";
import { X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ProfileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  sessionId: string | undefined;
}

export default function ProfileDrawer(
  { isOpen, onClose, sessionId }: ProfileDrawerProps = {
    isOpen: false,
    onClose: () => {},
    sessionId: undefined,
  }
) {
  const pathname = usePathname();

  const menuItems = [
    { href: "/", label: "ホーム" },
    { href: "/allPost", label: "全ての投稿を見る" },
    ...(sessionId
      ? [
          { href: "/profile", label: "マイページ" },
          { href: "/create", label: "履修プランを投稿する" },
        ]
      : [{ href: "/login", label: "ログイン / 新規登録" }]),
  ];

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-40" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-300"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-hidden bg-background shadow-xl">
                    <div className="px-4 sm:px-6 py-6">
                      <div className="flex items-start justify-end">
                        <div className="ml-3 flex h-7 items-center">
                          <Button
                            onClick={onClose}
                            variant="ghost"
                            size="icon"
                            className="rounded-md text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                          >
                            <span className="sr-only">閉じる</span>
                            <X className="h-6 w-6" />
                          </Button>
                        </div>
                      </div>
                    </div>
                    <ScrollArea className="relative flex-1 px-4 sm:px-6">
                      <div className="mb-8">
                        <h2 className="text-2xl font-light text-center border-b-2 border-border text-foreground pb-2">
                          メニュー
                        </h2>
                        <nav
                          className="mt-6 flex flex-col items-center space-y-2"
                          aria-label="メインナビゲーション"
                        >
                          <ul className="flex flex-col items-stretch w-full space-y-2 p-0 m-0 list-none">
                            {menuItems.map((item) => (
                              <li key={item.href} className="w-full">
                                <Link
                                  href={item.href}
                                  className={`block w-full text-lg font-medium text-foreground hover:bg-primary/10 p-2 rounded-md transition-colors ${
                                    pathname === item.href
                                      ? "bg-primary/20 text-primary"
                                      : ""
                                  }`}
                                  onClick={onClose}
                                >
                                  {item.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </nav>
                      </div>
                      <div className="flex flex-col items-center space-y-6">
                        <Link href="/" onClick={onClose}>
                          <Image
                            src="/images/icon.png"
                            alt="アイコン"
                            width={150}
                            height={150}
                            className="rounded-full"
                          />
                        </Link>
                        <Button
                          variant={sessionId ? "default" : "destructive"}
                          className="w-full max-w-xs"
                        >
                          {sessionId
                            ? "ログイン中です"
                            : "ログインしていません"}
                        </Button>
                      </div>
                    </ScrollArea>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
