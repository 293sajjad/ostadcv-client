import { Button, Col, Form, Input, Row } from "antd";
import { useState } from "react";
import Panel from "../../layouts/PanelLayout";

const EditOverview = () => {
  const [form] = Form.useForm();
  const [formData, setFormData] = useState({
    image: "",
    firstName: "",
    lastName: "",
    academicRank: "",
    contacts: {},
    email: "",
    officeAddress: "",
    website: "",
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (_changedValues: any, allValues: any) => {
    setFormData(allValues);
  };

  const handleSubmit = () => {
    // Add your submit logic here
    console.log(formData);
  };

  // Function to render dynamic form fields for contacts
  const renderContactFields = () => {
    const contactFields = [];
    for (const [key, value] of Object.entries(formData.contacts)) {
      contactFields.push(
        <Form.Item key={key} name={["contacts", key]} label={key}>
          <Input value={value as string} />{" "}
          {/* Explicitly type value as string */}
        </Form.Item>
      );
    }
    return contactFields;
  };

  return (
    <Panel title="Edit Overview" description="ویرایش اطلاعات اوستاد">
      <Form
        form={form}
        onFinish={handleSubmit}
        onValuesChange={handleChange}
        layout="vertical"
      >
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Form.Item name="image" label="عکس">
              <Input type="file" />
            </Form.Item>
            <Form.Item name="firstName" label="نام">
              <Input />
            </Form.Item>
            <Form.Item name="academicRank" label="رتبه علمی">
              <Input />
            </Form.Item>
            {renderContactFields()}
            <Form.Item name="officeAddress" label="آدرس دفتر">
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="lastName" label="نام خانوادگی">
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
          <Button type="primary" htmlType="submit">
            ذخیره
          </Button>
        </Form.Item>
      </Form>
    </Panel>
  );
};

export default EditOverview;
