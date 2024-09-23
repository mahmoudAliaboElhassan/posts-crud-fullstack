"use client";
import React from "react";

function error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div>
      <div>{error.message}</div>
      <button onClick={() => reset()}>Reset</button>
    </div>
  );
}

export default error;
