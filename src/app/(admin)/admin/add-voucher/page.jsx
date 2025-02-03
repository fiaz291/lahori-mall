'use client'
import React from 'react';
import { Form, Input, InputNumber, Checkbox, DatePicker, Button, message } from 'antd';
import axios from 'axios';
import { nanoid } from 'nanoid';
import config from '@/app/config';
import { API_URLS } from '@/app/apiUrls';

const VoucherForm = () => {
  const [form] = Form.useForm();

  // Function to generate a voucher code using nanoid
  const handleGenerateCode = () => {
    const generatedCode = nanoid(10).toUpperCase(); // Customize length as needed
    form.setFieldsValue({ code: generatedCode });
    message.success(`Generated code: ${generatedCode}`);
  };

  // Submit handler with axios and try/catch
  const onFinish = async (values) => {
    // If no code provided, generate one automatically
    if (!values.code) {
      values.code = nanoid(10).toUpperCase();
    }

    try {
      // Post the voucher data to your API endpoint (adjust the URL as needed)
      const response = await axios.post(config.url+API_URLS.VOUCHERS, {
        code: values.code,
        amount: values.amount,
        isActive: values.isActive,
        expiresAt: values.expiresAt ? values.expiresAt.toISOString() : null,
        description: values.description,
        // storeId is intentionally skipped
      });
      message.success('Voucher created successfully!');
      form.resetFields();
    } catch (error) {
      console.error('Error creating voucher:', error);
      message.error(`Error creating voucher: ${error.response?.data?.error || error.message}`);
    }
  };

  return (
    <div className='flex justify-center'>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{
          isActive: true, // Default voucher is active
        }}
        style={{ maxWidth: 600, width: '100%' }}
      >
        <Form.Item label="Voucher Code" name="code" rules={[{ required: true, message: 'Please enter the voucher code' }]}>
          <Input placeholder="Enter voucher code manually or generate automatically" />
        </Form.Item>
        <Form.Item>
          <Button type="dashed" onClick={handleGenerateCode}>
            Generate Code
          </Button>
        </Form.Item>
        <Form.Item
          label="Amount"
          name="amount"
          rules={[{ required: true, message: 'Please enter the voucher amount' }]}
        >
          <InputNumber min={0} style={{ width: '100%' }} placeholder="Enter voucher amount" />
        </Form.Item>
        <Form.Item name="isActive" valuePropName="checked">
          <Checkbox>Active</Checkbox>
        </Form.Item>
        <Form.Item label="Expires At" name="expiresAt" rules={[{ required: true, message: 'Please enter expiry date' }]}>
          <DatePicker style={{ width: '100%' }} placeholder="Select expiration date" showTime />
        </Form.Item>
        <Form.Item label="Description" name="description">
          <Input.TextArea placeholder="Enter voucher description (optional)" rows={4} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Create Voucher
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default VoucherForm;
