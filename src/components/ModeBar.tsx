import { Link } from "react-router-dom";
import {
  renderModeLabel,
  renderModes,
  scenarioPath,
  type RenderMode,
} from "../lib/widget-setup";
import styles from "./ModeBar.module.css";

export function ModeBar({ slug, mode }: { slug: string; mode: RenderMode }) {
  return (
    <div className={styles.bar}>
      <span className={styles.label}>Render this scenario as</span>
      <span className={styles.modes}>
        {renderModes.map((entry) =>
          entry === mode ? (
            <span key={entry} className={styles.current} aria-current="page">
              {renderModeLabel(entry)}
            </span>
          ) : (
            <Link
              key={entry}
              to={scenarioPath(slug, entry)}
              reloadDocument
              className={styles.link}
            >
              {renderModeLabel(entry)}
            </Link>
          ),
        )}
      </span>
    </div>
  );
}
