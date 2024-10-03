interface PlanDetailsProps {
  title: string;
  content: string;
}

const PlanDetails = ({ title, content }: PlanDetailsProps) => {
  return (
    <div className="p-4 flex flex-col gap-y-4 bg-slate-50 rounded-2xl shadow-2xl ring-2 ring-gray-300">
      <div className="flex flex-col gap-2">
        <p className="text-base font-medium md:text-xl text-center">
          ・履修プラン名
        </p>
        <p className="text-base md:text-xl text-center">{title}</p>
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-base font-medium md:text-xl text-center">
          ・履修プラン内容
        </p>
        <p className="text-base md:text-xl text-center">{content}</p>
      </div>
    </div>
  );
};

export default PlanDetails;
