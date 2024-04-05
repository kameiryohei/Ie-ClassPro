import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface CourseListProps {
  name: string;
  content: string;
}

const CourseList: React.FC<CourseListProps> = ({ name, content }) => {
  return (
    <div className="">
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>科目名：{name}</AccordionTrigger>
          <AccordionContent>内容：{content}</AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default CourseList;
