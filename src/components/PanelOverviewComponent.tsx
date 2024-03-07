import { Avatar, Card } from "antd";
import { FC, useState } from "react";
import { UserOutlined } from "@ant-design/icons";

interface CardProps {
  id: number;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
  name: string;
  family: string;
  Contacts: {
    [key: string]: string;
  };
  googel_scolar: string | null;
  access: boolean;
  college: string | null;
  science_ranking: string | null;
  phone: string | null;
  office: string | null;
  website: string | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  avatar: any;
}

export const CardBox: FC<CardProps> = ({
  name,
  family,
  email,
  phone,
  office,
  website,
  science_ranking,
  college,
  Contacts,
  googel_scolar,
  avatar,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <Card
      title="اطلاعات استاد"
      style={{
        width: "90%",
        maxWidth: "800px",
        transition: "transform 0.3s ease",
        fontFamily: "Rubik",
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={isHovered ? "hovered" : ""}
    >
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div style={{ flex: 1, marginRight: "20px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "24px",
            }}
          >
            <Avatar
              size={64}
              icon={!avatar ? <UserOutlined /> : null}
              src={
                avatar ? import.meta.env.VITE_API_URL + avatar.url : undefined
              }
              style={{ marginRight: "16px" }}
            />

            <div style={{ marginRight: "10px" }}>
              <h3>استاد {name + " " + family}</h3>
              <p>دانشکده {college || "N/A"}</p>
            </div>
          </div>
          <p>
            <strong>نام کامل:</strong> {name + " " + family}
          </p>
          <p>
            <strong>رتبه علمی:</strong> {science_ranking || "N/A"}
          </p>
          <p>
            <strong>گوگل اسکولار:</strong> {googel_scolar || "N/A"}
          </p>
          <p>
            <strong>تماس‌ها:</strong>{" "}
            {Object.entries(Contacts).map(([key, value]) => (
              <span key={key}>
                <strong>{key}:</strong> {value}
                <br />
              </span>
            ))}
          </p>
        </div>
        <div style={{ flex: 1 }}>
          <p>
            <strong>ایمیل:</strong> {email}
          </p>
          <p>
            <strong>تلفن:</strong> {phone || "N/A"}
          </p>
          <p>
            <strong>دفتر:</strong> {office || "N/A"}
          </p>
          <p>
            <strong>وب‌سایت:</strong>{" "}
            <a href={website || "#"}>{website || "N/A"}</a>
          </p>
        </div>
      </div>
    </Card>
  );
};
