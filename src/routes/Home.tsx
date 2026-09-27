import { Link } from "react-router-dom";
import { scenarios } from "../lib/scenarios";
import { scenarioPath } from "../lib/widget-setup";
import styles from "./home.module.css";

export function Home() {
  return (
    <main className={styles.page}>
      <h1 className={styles.title}>RuleCMS widget tests</h1>
      <p className={styles.intro}>
        The same scenario pages as the manual widget host, rendered by React
        Router. Open a scenario, then switch CSR, SSR, or SSG. CSR fetches the
        widget in the browser. SSR builds the widget HTML on every request. SSG
        reuses one server render. This process is using the development token
        and development widget keys.
      </p>
      <ul className={styles.list}>
        {scenarios.map((scenario) => (
          <li key={scenario.slug} className={styles.item}>
            <Link
              to={scenarioPath(scenario.slug, "csr")}
              reloadDocument
              className={styles.link}
            >
              {scenario.title}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
