import React from 'react';
import { Card, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const NhanVienPage = () => {
  return (
    <Card 
      title="Quản lý nhân viên"
      extra={
        <Button type="primary" icon={<PlusOutlined />}>
          Thêm nhân viên mới
        </Button>
      }
    >
      {/* Nội dung trang sẽ được thêm sau */}
      <div>Danh sách nhân viên sẽ hiển thị ở đây</div>
    </Card>
  );
};

export default NhanVienPage; 