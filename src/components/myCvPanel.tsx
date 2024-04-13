/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Form, Input, DatePicker, Switch, Button, List, Select } from "antd";
const { Option } = Select;
import { SaveOutlined } from "@ant-design/icons";

export interface Skill {
  name: string;
  level: string;
}

const ResumeForm: React.FC = () => {
  const [form] = Form.useForm();
  const [skills, setSkills] = useState<Skill[]>([]);

  const onFinish = (values: any) => {
    console.log({ ...values, skills });
  };

  const handleAddSkill = (skill: Skill) => {
    setSkills([...skills, skill]);
  };

  const handleRemoveSkill = (index: number) => {
    const updatedSkills = [...skills];
    updatedSkills.splice(index, 1);
    setSkills(updatedSkills);
  };

  return (
    <Form
      form={form}
      name="resume_form"
      onFinish={onFinish}
      initialValues={{ maritalStatus: false }} // مقدار اولیه برای وضعیت تاهل
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 12 }}
    >
      <Form.Item
        name="about"
        label="درباره من"
        rules={[{ required: true, message: "لطفاً درباره خودتان بنویسید!" }]}
      >
        <Input.TextArea autoSize={{ minRows: 3 }} />
      </Form.Item>
      <Form.Item
        name="maritalStatus"
        label="وضعیت تاهل"
        valuePropName="checked"
      >
        <Switch checkedChildren="متاهل" unCheckedChildren="مجرد" />
      </Form.Item>
      <Form.Item name="birthdate" label="تاریخ تولد">
        <DatePicker style={{ width: "100%" }} />
      </Form.Item>
      <Form.Item
        name="futureGoal"
        label="هدف در آینده"
        rules={[{ required: true, message: "لطفاً هدف خود را وارد کنید!" }]}
      >
        <Input.TextArea autoSize={{ minRows: 3 }} />
      </Form.Item>
      <Form.Item label="مهارت‌ها و توانایی‌ها">
        <AddSkillForm onAdd={handleAddSkill} />
        <SkillsList skills={skills} onRemove={handleRemoveSkill} />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 6, span: 12 }}>
        <Button
          type="primary"
          htmlType="submit"
          size="large"
          icon={<SaveOutlined />}
        >
          ثبت
        </Button>
      </Form.Item>
    </Form>
  );
};

interface SkillsListProps {
  skills: Skill[];
  onRemove: (index: number) => void;
}

const SkillsList: React.FC<SkillsListProps> = ({ skills, onRemove }) => {
  return (
    <List
      dataSource={skills}
      renderItem={(item, index) => (
        <List.Item
          actions={[
            <Button danger onClick={() => onRemove(index)}>
              حذف
            </Button>,
          ]}
        >
          {item.name} - {item.level}
        </List.Item>
      )}
    />
  );
};

interface AddSkillFormProps {
  onAdd: (skill: Skill) => void;
}

const AddSkillForm: React.FC<AddSkillFormProps> = ({ onAdd }) => {
  const [name, setName] = useState("");
  const [level, setLevel] = useState("1");

  const handleSubmit = () => {
    const newSkill: Skill = { name, level };
    onAdd(newSkill);
    setName("");
    setLevel("1");
  };

  return (
    <Form layout="inline">
      <Form.Item>
        <Input
          placeholder="عنوان مهارت"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </Form.Item>
      <Form.Item>
        <Select defaultValue="1" onChange={(value) => setLevel(value)}>
          <Option value="1">1</Option>
          <Option value="2">2</Option>
          <Option value="3">3</Option>
          <Option value="4">4</Option>
          <Option value="5">5</Option>
        </Select>
      </Form.Item>
      <Form.Item>
        <Button type="default" onClick={handleSubmit} size="middle">
          افزودن مهارت
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ResumeForm;
