interface ErrorBannerProps {
  error: string;
}

const ErrorBanner = ({ error }: ErrorBannerProps) => {
  if (!error) {
    return null;
  }

  return (
    <div
      style={{
        marginTop: "16px",
        padding: "12px",
        borderRadius: "8px",
        backgroundColor: "#7f1d1d",
        color: "#fecaca",
      }}
    >
      {error}
    </div>
  );
};

export default ErrorBanner;