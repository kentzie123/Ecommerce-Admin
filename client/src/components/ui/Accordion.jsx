// rizzui
import { Accordion as RizzAccordion, cn } from "rizzui";
import { ChevronDown } from "lucide-react";

const Accordion = ({ children, title, Icon, className}) => {
  return (
    <RizzAccordion className="">
      <RizzAccordion.Header>
        {({ open }) => (
          <div className={`${className} flex w-full cursor-pointer items-center justify-between hover:bg-base-300 text-base-content/80 px-3 py-2 rounded-md text-sm`}>
            <div className="flex gap-3 items-center font-bold">
              <Icon className="size-5" />
              <div>{title}</div>
            </div>
            <ChevronDown
              className={cn(
                "size-5 -rotate-90 transform transition-transform duration-300",
                open && "-rotate-0"
              )}
            />
          </div>
        )}
      </RizzAccordion.Header>
      <RizzAccordion.Body className="pl-4 font-bold">{children}</RizzAccordion.Body>
    </RizzAccordion>
  );
};

export default Accordion;
