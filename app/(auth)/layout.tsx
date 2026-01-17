const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="loginBg flex items-center justify-center h-full bg-indigo-900 bg-linear-to-br from-indigo-700 via-indigo-600 to-indigo-700">
      {children}
    </div>
  );
};

export default AuthLayout;
