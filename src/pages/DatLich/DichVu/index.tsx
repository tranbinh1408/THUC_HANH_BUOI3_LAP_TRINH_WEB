import React from 'react';
import { Card, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const DichVuPage = () => {
  return (
    <Card 
      title="Quản lý dịch vụ"
      extra={
        <Button type="primary" icon={<PlusOutlined />}>
          Thêm dịch vụ mới
        </Button>
      }
    >
      {/* Nội dung trang sẽ được thêm sau */}
      <div>Danh sách dịch vụ sẽ hiển thị ở đây</div>
    </Card>
  );
};

export default DichVuPage; 