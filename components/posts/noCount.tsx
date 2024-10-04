import React from "react";

import styles from "./no-count.module.css";

function NoCount({ children }: { children: React.ReactNode }) {
  return <div className={styles.noCountContainer}>{children}</div>;
}

export default NoCount;
