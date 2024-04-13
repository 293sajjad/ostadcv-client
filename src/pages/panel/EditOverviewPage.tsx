import { Button, Col, Form, Input, Row, Upload } from "antd";
import Panel from "../../layouts/PanelLayout";
import { useAtom } from "jotai/react";
import { authInfo } from "../../utils/store";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UploadChangeParam } from "antd/lib/upload/interface";

interface FormValues {
  image: File[];
  firstName: string;
  lastName: string;
  academicRank: string;
  contacts: string;
  email: string;
  officeAddress: string;
  website: string;
  phoneNumber: string;
}

const UploadProps = {
  headers: {
    authorization: "Bearer " + import.meta.env.VITE_UPDATE_USER_TOKEN,
  },
  action: import.meta.env.VITE_API_URL + "/api/upload",
  name: "files",
};

const EditOverview = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [state, _setState] = useAtom(authInfo);
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: FormValues) => {
    setLoading(true);
    console.log(values.image);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const requestData: any = {
      name: values.firstName,
      family: values.lastName,
      science_ranking: values.academicRank,
      contacts: values.contacts,
      email: values.email,
      office: values.officeAddress,
      website: values.website,
      phone: values.phoneNumber,
    };

    try {
      await axios.put(
        import.meta.env.VITE_API_URL + `/api/users/${state.authInfo.id}`,
        requestData,
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_UPDATE_USER_TOKEN}`,
          },
        }
      );
      toast.success("اطلاعات با موفقیت بروزرسانی شد");
      setTimeout(() => {
        navigate("/panel");
      }, 1200);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error("خطای سرور");
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Function to normalize file value for Ant Design Upload component
  function normFile(e: UploadChangeParam) {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  }

  return (
    <Panel title="Edit Overview" description="ویرایش اطلاعات اوستاد">
      <Toaster position="top-center" reverseOrder={false} />
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{
          image: null,
          firstName: state.authInfo.name,
          lastName: state.authInfo.family,
          academicRank: state.authInfo.science_ranking,
          contacts: state.authInfo.contacts,
          email: state.authInfo.email,
          officeAddress: state.authInfo.office,
          website: state.authInfo.website,
          phoneNumber: state.authInfo.phone,
        }}
      >
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Form.Item
              name="image"
              label="عکس"
              valuePropName="fileList"
              getValueFromEvent={normFile}
            >
              <Upload
                accept="image/*"
                maxCount={1}
                {...UploadProps}
                onChange={(response) => {
                  if (response.file.status !== "uploading") {
                    console.log(response.file, response.fileList);
                  }
                  if (response.file.status === "done") {
                    console.log(`${response.file.name}  
                    file uploaded successfully and ${response.file}`);
                    console.log(response);
                    axios.put(
                      import.meta.env.VITE_API_URL +
                        `/api/users/${state.authInfo.id}`,
                      {
                        avatar: { id: response.file.response[0].id },
                      },
                      {
                        headers: {
                          authorization:
                            "Bearer " + import.meta.env.VITE_UPDATE_USER_TOKEN,
                        },
                      }
                    );
                  } else if (response.file.status === "error") {
                    console.log(`${response.file.name}  
                    file upload failed.`);
                  }
                }}
              >
                <Button>انتخاب فایل</Button>
              </Upload>
            </Form.Item>
            <Form.Item
              name="firstName"
              label="نام"
              rules={[
                { required: true, message: "نام نمی‌تواند خالی باشد" },
                { min: 3, message: "نام نباید کمتر از 3 حرف باشد" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="lastName"
              label="نام خانوادگی"
              rules={[
                {
                  required: true,
                  message: "نام خانوادگی نمی‌تواند خالی باشد",
                },
                {
                  min: 3,
                  message: "نام خانوادگی نباید کمتر از 3 حرف باشد",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item name="officeAddress" label="آدرس دفتر">
              <Input />
            </Form.Item>
            <Form.Item
              name="phoneNumber"
              label="تلفن"
              rules={[
                { required: true, message: "تلفن نمی‌تواند خالی باشد" },
                { min: 10, message: "تلفن نباید کمتر از 10 حرف باشد" },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="academicRank" label="رتبه علمی">
              <Input />
            </Form.Item>
            <Form.Item name="email" label="ایمیل">
              <Input />
            </Form.Item>
            <Form.Item name="website" label="آدرس وبسایت">
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            ذخیره
          </Button>
        </Form.Item>
      </Form>
    </Panel>
  );
};

export default EditOverview;
