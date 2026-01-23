import { useState } from "react";

import { Minus, Plus } from "lucide-react";

const faqs = [
  {
    title: "What is Github and how does it work?",
    content:
      "GitHub is the home for all developers—a platform where you can share code, contribute to open source projects, or even automate your workflow with tools like GitHub Actions and Packages. If you’re just getting started with GitHub, you may know us best as a place for version control and collaboration.",
  },
  {
    title: "How do I see GitHub's availability?",
    content: "Check our real-time status report",
  },
  {
    title: "Why is GitHub so popular?",
    content:
      "GitHub is built by developers for developers, and we’re proud to be home to the world’s largest open source community. With 50 million developers and millions more open source projects, GitHub has become the go-to place to collaborate and build software together.",
  },
];

interface FaqItem {
  title: string;
  content: string;
}

const FaqAccordion = ({ faqs }: { faqs: FaqItem[] }) => {
  const [openItems, setOpenItems] = useState<number | null>(null);

  return (
    <ul>
      {faqs.map((faq, index) => (
        <AccordionItem
          faq={faq}
          key={index}
          openItems={openItems}
          setOpenItems={setOpenItems}
          index={index}
        />
      ))}
    </ul>
  );
};

interface AccordionItemProps {
  faq: FaqItem;
  openItems: number | null;
  setOpenItems: (index: number | null) => void;
  index: number;
}

const AccordionItem = ({
  faq,
  openItems,
  setOpenItems,
  index,
}: AccordionItemProps) => {
  const isOpen = openItems === index;
  const Icon = isOpen ? Minus : Plus;

  return (
    <li
      className="border-b"
      onClick={() => setOpenItems(isOpen ? null : index)}
    >
      <button
        className={`w-full flex justify-between items-center py-10 font-medium hover:text-rose-900 ${isOpen ? "text-rose-900" : "text-[#000]"}`}
      >
        {faq.title}
        <Icon size={20} />
      </button>
      <div
        className={`${isOpen ? "max-h-96" : "max-h-0"} overflow-hidden transition-all duration-300 ease-in-out`}
      >
        <div className=" pb-10 text-grey-600">{faq.content}</div>
      </div>
    </li>
  );
};

export default FaqAccordion;
