import React from "react";
import CardList from "../components/CardList";

const page = () => {
  return (
    <div className="px-10 py-4 flex flex-col justify-center">
      <p className="text-3xl font-extrabold border-b-4 border-orange-500 text-center">
        みんなの投稿リスト
      </p>
      <div className="mt-4 grid gap-5 lg:grid-cols-3">
        <CardList />
        <CardList />
        <CardList />
        <CardList />
        <CardList />
      </div>
    </div>
  );
};

export default page;
