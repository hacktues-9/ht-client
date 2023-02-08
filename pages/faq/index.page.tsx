import { FAQ } from "../../constants/faq";

const FAQPage = () => {
  return (
    <div>
      <h1>Често задавани въпроси</h1>
      <ul>
        {FAQ.map((faq) => (
          <li key={faq.Q}>
            <h2>{faq.Q}</h2>
            <p dangerouslySetInnerHTML={{ __html: faq.A }} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FAQPage;
