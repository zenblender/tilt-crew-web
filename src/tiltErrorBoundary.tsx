import { FC, ReactNode } from "react";
import { ErrorBoundary, FallbackProps } from "react-error-boundary";

interface Props {
  children: ReactNode;
}

function fallbackRender({ error }: FallbackProps) {
  return (
    <div role="alert">
      <p>❌ ERROR:</p>
      <pre style={{ color: "orange" }}>{error.message}</pre>
    </div>
  );
}

export const TiltErrorBoundary: FC<Props> = ({ children }) => {
  return (
    <ErrorBoundary fallbackRender={fallbackRender}>{children}</ErrorBoundary>
  );
};
