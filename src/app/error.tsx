"use client";

import { useEffect } from "react";
import * as styles from "./page.css";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: number };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className={styles.errorMain}>
      <h2>Algo salió mal al cargar la página</h2>
      <button className={styles.errorButton} onClick={() => reset()}>
        Intentar de nuevo
      </button>
    </main>
  );
}
