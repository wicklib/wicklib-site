interface WordmarkProps {
  className?: string;
}

export function Wordmark({ className = "h-8" }: WordmarkProps) {
  return (
    <span className="inline-flex items-center">
      <img
        src="/brand/wicklib-lockup-light.svg"
        alt="Wicklib"
        className={`w-auto dark:hidden ${className}`}
      />
      <img
        src="/brand/wicklib-lockup-dark.svg"
        alt="Wicklib"
        className={`hidden w-auto dark:block ${className}`}
      />
    </span>
  );
}
