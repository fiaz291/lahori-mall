'use client'
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Form, Input, InputNumber, Checkbox, DatePicker, Button, message } from 'antd';
import axios from 'axios';
import { nanoid } from 'nanoid';
import config from '@/app/config';
import { API_URLS } from '@/app/apiUrls';
import dayjs from 'dayjs';

const EditVoucherForm = ({params}) => {
  const { voucherId: id } = params; // Get voucher ID from params
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      fetchVoucher(id);
    }
  }, [id]);

  const fetchVoucher = async (voucherId) => {
    setLoading(true);
    try {
      const response = await axios.get(`${config.url}${API_URLS.VOUCHERS}?id=${voucherId}`);
      const voucher = response.data.data;
      form.setFieldsValue({
        code: voucher.code,
        amount: voucher.amount,
        isActive: voucher.isActive,
        expiresAt: voucher.expiresAt ? dayjs(voucher.expiresAt) : null,
        description: voucher.description,
      });
    } catch (error) {
      console.error('Error fetching voucher:', error);
      message.error(`Error fetching voucher: ${error.response?.data?.error || error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateCode = () => {
    const generatedCode = nanoid(10).toUpperCase();
    form.setFieldsValue({ code: generatedCode });
    message.success(`Generated code: ${generatedCode}`);
  };

  const onFinish = async (values) => {
    if (!values.code) {
      values.code = nanoid(10).toUpperCase();
    }

    try {
      if (id) {
        await axios.put(`${config.url}${API_URLS.VOUCHERS}?id=${id}`, {
          code: values.code,
          amount: values.amount,
          isActive: values.isActive,
          expiresAt: values.expiresAt ? values.expiresAt.toISOString() : null,
          description: values.description,
        });
        message.success('Voucher updated successfully!');
      } else {
        await axios.post(`${config.url}${API_URLS.VOUCHERS}`, {
          code: values.code,
          amount: values.amount,
          isActive: values.isActive,
          expiresAt: values.expiresAt ? values.expiresAt.toISOString() : null,
          description: values.description,
        });
        message.success('Voucher created successfully!');
        form.resetFields();
      }
    } catch (error) {
      console.error('Error saving voucher:', error);
      message.error(`Error saving voucher: ${error.response?.data?.error || error.message}`);
    }
  };

  return (
    <div className='flex justify-center'>
      <Form
        form={form}
        layout='vertical'
        onFinish={onFinish}
        initialValues={{ isActive: true }}
        style={{ maxWidth: 600, width: '100%' }}
      >
        <Form.Item label='Voucher Code' name='code' rules={[{ required: true, message: 'Please enter the voucher code' }]}>
          <Input placeholder='Enter voucher code manually or generate automatically' disabled />
        </Form.Item>
        {/* <Form.Item>
          <Button type='dashed' onClick={handleGenerateCode} disabled={loading}>
            Generate Code
          </Button>
        </Form.Item> */}
        <Form.Item label='Amount' name='amount' rules={[{ required: true, message: 'Please enter the voucher amount' }]}>  
          <InputNumber min={0} style={{ width: '100%' }} placeholder='Enter voucher amount' />
        </Form.Item>
        <Form.Item name='isActive' valuePropName='checked'>
          <Checkbox>Active</Checkbox>
        </Form.Item>
        <Form.Item label='Expires At' name='expiresAt' rules={[{ required: true, message: 'Please enter expiry date' }]}>  
          <DatePicker style={{ width: '100%' }} placeholder='Select expiration date' showTime />
        </Form.Item>
        <Form.Item label='Description' name='description'>
          <Input.TextArea placeholder='Enter voucher description (optional)' rows={4} />
        </Form.Item>
        <Form.Item>
          <Button type='primary' htmlType='submit' loading={loading}>
            {id ? 'Update Voucher' : 'Create Voucher'}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EditVoucherForm;
