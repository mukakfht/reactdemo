import "./App.css";
import FaqAccordion from "./components/faqAccordion";
import { faqs } from "./output/faq";

function App() {
  return (
    <>
      <div className="max-w-lg mx-auto mt-10">
        <h1 className="text-2xl font-bold mb-4">FAQ</h1>
        <FaqAccordion faqs={faqs} />
      </div>
    </>
  );
}

export default App;
