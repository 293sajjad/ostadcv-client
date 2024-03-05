import { FC, ReactNode } from "react";
import "../styles/Auth.css";
import { Helmet, HelmetProvider } from "react-helmet-async";

interface Props {
  children: ReactNode;
  title: string;
  description: string;
}

const Auth: FC<Props> = ({ children, title, description }) => {
  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title> ostadcv | {title}</title>
          <meta name="description" content={description} />
        </Helmet>
      </HelmetProvider>
      <div className="auth-container">{children}</div>
    </>
  );
};

export default Auth;
