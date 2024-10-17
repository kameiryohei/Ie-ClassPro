import useSeverUser from "app/hooks/useSeverUser";
import CreatePlanTitle from "./components/CreatePlanTitle";

const PlanCreate = async () => {
  const { session } = useSeverUser();
  const sessionId = await session();
  return (
    <div className="mx-auto text-3xl max-w-3xl lg:max-w-2xl px-2 sm:px-4 lg:px-6 pb-16 pt-24 text-center lg:pt-32">
      <div className="bg-slate-100 rounded-xl px-4 py-5 shadow-2xl">
        <h1>始めに履修プランのタイトルと内容を書いてください。</h1>
        <CreatePlanTitle sessionId={sessionId} />
      </div>
    </div>
  );
};

export default PlanCreate;
